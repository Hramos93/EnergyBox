import React, { useState } from 'react';
import {
  validarAtleta,
  registrarDupla,
  generarEnlaceWhatsApp,
  generarTextoConfirmacion,
  normalizarCedula
} from '../services/competenciaService';
import { trackCompetenciaStep } from '../services/analytics';

export default function CompetenciaRegistro() {
  const [step, setStep] = useState(1);
  const [cedula1, setCedula1] = useState('');
  const [atleta1, setAtleta1] = useState(null);
  
  const [cedula2, setCedula2] = useState('');
  const [atleta2, setAtleta2] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Copiar al portapapeles
  const handleCopyMensaje = () => {
    if (!successData) return;
    const texto = generarTextoConfirmacion(successData.atleta1, successData.atleta2);
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(texto).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    } else {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Sanitizador de entrada: solo caracteres válidos para cédula
  const handleCedulaChange = (setter) => (e) => {
    const clean = e.target.value.replace(/[^0-9vVeE\.\-\s]/g, '').slice(0, 14);
    setter(clean);
  };

  // ------------------------------------------------------------------
  // Paso 1: Validar Capitana (Atleta 1)
  // ------------------------------------------------------------------
  const handleValidarAtleta1 = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!cedula1.trim()) {
      setErrorMsg('Por favor ingresa tu número de cédula.');
      return;
    }

    setLoading(true);
    try {
      const res = await validarAtleta(cedula1);
      if (res.active) {
        setAtleta1(res);
        setStep(2);
        setErrorMsg('');
        trackCompetenciaStep(1, 'validar_capitana_exitosa');
      } else {
        setErrorMsg(res.message || 'La cédula no figura en el registro de atletas activas.');
      }
    } catch (err) {
      setErrorMsg('Error al conectar con el servidor. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------------
  // Paso 2: Validar Compañera (Atleta 2) y Registrar Dupla
  // ------------------------------------------------------------------
  const handleValidarAtleta2 = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!cedula2.trim()) {
      setErrorMsg('Por favor ingresa la cédula de tu compañera de equipo.');
      return;
    }

    if (normalizarCedula(cedula1) === normalizarCedula(cedula2)) {
      setErrorMsg('No puedes inscribirte a ti misma como tu pareja. Ingresa la cédula de tu compañera.');
      return;
    }

    setLoading(true);
    try {
      const res = await validarAtleta(cedula2);
      if (!res.active) {
        setErrorMsg(`La Atleta 2 no figura como activa: ${res.message}`);
        setLoading(false);
        return;
      }

      setAtleta2(res);

      // Registrar formalmente la dupla
      const regRes = await registrarDupla({
        cedula1: atleta1.cedula || cedula1,
        nombre1: atleta1.nombre,
        cedula2: res.cedula || cedula2,
        nombre2: res.nombre
      });

      if (regRes.success) {
        setSuccessData({
          atleta1: atleta1.nombre,
          atleta2: res.nombre
        });
        setStep(3);
        trackCompetenciaStep(2, 'registro_dupla_exitosa');
      } else {
        setErrorMsg(regRes.message || 'No se pudo completar el registro.');
      }
    } catch (err) {
      setErrorMsg('Error al procesar la inscripción de la dupla.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setCedula1('');
    setCedula2('');
    setAtleta1(null);
    setAtleta2(null);
    setErrorMsg('');
    setSuccessData(null);
  };

  // Cálculo de progreso porcentual
  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="competencia-card-container">
      {/* Barra de Progreso Dinámica con Porcentaje */}
      <div className="progress-bar-wrapper">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div className="competencia-steps-bar">
        <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>
          <span className="step-num">1</span>
          <span className="step-label">Tu Cédula</span>
        </div>
        <div className="step-divider"></div>
        <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>
          <span className="step-num">2</span>
          <span className="step-label">Tu Pareja</span>
        </div>
        <div className="step-divider"></div>
        <div className={`step-indicator ${step === 3 ? 'active' : ''}`}>
          <span className="step-num">3</span>
          <span className="step-label">¡Listas!</span>
        </div>
      </div>

      {/* Contenido del Formulario Dinámico */}
      <div className="competencia-step-content">
        {/* PASO 1: Capitana */}
        {step === 1 && (
          <form onSubmit={handleValidarAtleta1} className="step-form-animated">
            <div className="step-header">
              <span className="step-badge">Paso 1 de 2</span>
              <h3>Ingresa tu Cédula de Identidad</h3>
              <p>Comprobaremos de forma segura tu estatus activo en el Box.</p>
            </div>

            <div className="input-group">
              <label htmlFor="cedula1">Cédula (Capitana):</label>
              <input
                id="cedula1"
                type="text"
                placeholder="Ej: 24.555.666 o V24555666"
                value={cedula1}
                onChange={handleCedulaChange(setCedula1)}
                disabled={loading}
                autoFocus
                className="input-field"
                onKeyDown={(e) => { if (e.key === 'Enter') handleValidarAtleta1(e); }}
              />
            </div>

            {errorMsg && (
              <div className="error-alert">
                <p>⚠️ {errorMsg}</p>
                <a
                  href={`https://wa.me/584167130325?text=${encodeURIComponent('Hola recepción, tengo una consulta sobre mi membresía activa en el Box para la competencia interna. Mi cédula es: ' + cedula1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="error-help-link"
                >
                  💬 Consultar mi estatus con administración por WhatsApp &rarr;
                </a>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary btn-block btn-step">
              {loading ? 'Verificando con el Box...' : 'Continuar al Paso 2 ➡️'}
            </button>
          </form>
        )}

        {/* PASO 2: Pareja */}
        {step === 2 && (
          <form onSubmit={handleValidarAtleta2} className="step-form-animated">
            <div className="step-header">
              <span className="step-badge">Paso 2 de 2</span>
              <div className="atleta-validada-box">
                <span className="check-icon">✅</span>
                <span>Atleta 1: <strong>{atleta1?.nombre}</strong> (Verificada)</span>
              </div>
              <h3>Ingresa la Cédula de tu Pareja</h3>
              <p>Tu compañera también debe ser atleta activa de Energy Box.</p>
            </div>

            <div className="input-group">
              <label htmlFor="cedula2">Cédula (Compañera):</label>
              <input
                id="cedula2"
                type="text"
                placeholder="Ej: 18.222.333 o V18222333"
                value={cedula2}
                onChange={handleCedulaChange(setCedula2)}
                disabled={loading}
                autoFocus
                className="input-field"
                onKeyDown={(e) => { if (e.key === 'Enter') handleValidarAtleta2(e); }}
              />
            </div>

            {errorMsg && (
              <div className="error-alert">
                <p>⚠️ {errorMsg}</p>
                <a
                  href={`https://wa.me/584167130325?text=${encodeURIComponent('Hola recepción, consulto sobre el estatus activo de mi compañera de dupla para la competencia. Cédula: ' + cedula2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="error-help-link"
                >
                  💬 Consultar con recepción por WhatsApp &rarr;
                </a>
              </div>
            )}

            <div className="step-buttons-group">
              <button
                type="button"
                onClick={() => { setStep(1); setErrorMsg(''); }}
                disabled={loading}
                className="btn btn-secondary"
              >
                ⬅️ Volver
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-step"
              >
                {loading ? 'Inscribiendo Dupla...' : 'Confirmar e Inscribir 🚀'}
              </button>
            </div>
          </form>
        )}

        {/* PASO 3: Éxito y WhatsApp 1-Clic */}
        {step === 3 && successData && (
          <div className="step-success-animated">
            {/* Animación de confetti CSS */}
            <div className="confetti-container">
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
            </div>

            <div className="success-icon">🏆</div>
            <span className="step-badge success-badge">¡Inscripción Exitosa!</span>
            <h3>¡Dupla Oficialmente Inscrita!</h3>
            <p>Ya están en el registro de la 1ª Competencia Interna de Energy Box.</p>

            <div className="dupla-summary-card">
              <div className="summary-row">
                <span className="summary-label">Atleta 1 (Capitana):</span>
                <span className="summary-value">👩 {successData.atleta1}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Atleta 2 (Compañera):</span>
                <span className="summary-value">👩 {successData.atleta2}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Categoría:</span>
                <span className="summary-value">⚡ Principiante (Femenino)</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Modalidad:</span>
                <span className="summary-value">👯‍♀️ Dupla Mujer - Mujer</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Costo de Inscripción:</span>
                <span className="summary-value" style={{ color: '#10B981', fontWeight: 800 }}>GRATIS ($0)</span>
              </div>
            </div>

            <div className="whatsapp-action-box">
              <p>Envía la confirmación formal por WhatsApp al box en un solo clic:</p>
              <a
                href={generarEnlaceWhatsApp(successData.atleta1, successData.atleta2)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-large btn-block btn-whatsapp-finish"
                onClick={() => trackCompetenciaStep(3, 'whatsapp_confirmacion_enviada')}
              >
                💬 Enviar Confirmación por WhatsApp (1 Clic)
              </a>

              <button
                type="button"
                onClick={handleCopyMensaje}
                className="btn btn-copy-mensaje"
              >
                {copied ? '✅ ¡Mensaje copiado al portapapeles!' : '📋 Copiar texto del mensaje'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="btn btn-link"
              style={{ marginTop: '1.5rem', background: 'transparent', color: '#9CA3AF', cursor: 'pointer', border: 'none', textDecoration: 'underline' }}
            >
              Inscribir a otra dupla
            </button>
          </div>
        )}
      </div>

      {/* Mini FAQ Deportiva de la Competencia */}
      <div className="competencia-mini-faq">
        <h4>📋 Preguntas Rápidas del Evento</h4>
        <details>
          <summary>¿Qué movimientos se exigirán en la categoría Principiante?</summary>
          <p>Movimientos fundamentales adaptados a cargas ligeras y peso corporal (ej: Sentadillas, Burpees, Remo, Saltos con cuerda, Deadlifts ligeros). Cero movimientos gimnásticos lesivos.</p>
        </details>
        <details>
          <summary>¿Qué pasa si mi compañera o yo tenemos poco tiempo entrenando?</summary>
          <p>¡Este evento está pensado exactamente para ustedes! Es una competencia interna formativa y de integración de la comunidad femenina de Energy Box.</p>
        </details>
      </div>
    </div>
  );
}
