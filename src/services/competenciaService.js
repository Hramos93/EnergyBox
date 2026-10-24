/**
 * Servicio de Validación y Registro para la Competencia Interna Energy Box
 * Ciberseguridad: Sanitiza inputs y se comunica de forma ciega con el Webhook privado.
 * CERO FALSOS POSITIVOS: Si no existe en el Google Sheet, se rechaza estrictamente.
 */

// Endpoint oficial de producción en Google Apps Script (V6 Directo)
const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzRbnrong4hyJvWvdvNlsRhv2t513Q-VzVSJw40QaH_FfU7K3DVcjpPkgWWY57sb0bm/exec';
const WEBHOOK_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_COMPETENCIA_API_URL) || DEFAULT_WEBHOOK_URL;

/**
 * Normaliza cualquier formato de cédula ingresado por el usuario
 * Ejemplos: "v- 24.555.666", "24555666", "V24555666" -> "24555666"
 */
export function normalizarCedula(cedula) {
  if (!cedula) return '';
  return String(cedula).replace(/[\s\.\-_]/g, '').toUpperCase();
}

/**
 * Valida si una cédula corresponde a una atleta activa en el Google Sheet
 */
export async function validarAtleta(cedula) {
  const cedulaLimpia = normalizarCedula(cedula);

  if (!cedulaLimpia || cedulaLimpia.length < 5) {
    return {
      success: false,
      active: false,
      message: 'Ingresa un número de cédula válido (al menos 5 dígitos).'
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const url = `${WEBHOOK_URL}?action=validar&cedula=${encodeURIComponent(cedulaLimpia)}`;
    const res = await fetch(url, { method: 'GET', signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('[CompetenciaService] Error al conectar con el Webhook:', err.message);
    const msg = err.name === 'AbortError' 
      ? 'La conexión con Google Sheets tardó más de 12 segundos. Por favor intenta de nuevo.' 
      : 'No pudimos verificar la cédula con el sistema del Box. Revisa tu conexión a internet o intenta nuevamente.';
    return {
      success: false,
      active: false,
      message: msg
    };
  }
}

/**
 * Registra formalmente a la dupla en la base de datos de Google Sheets
 */
export async function registrarDupla({ cedula1, nombre1, cedula2, nombre2 }) {
  const c1 = normalizarCedula(cedula1);
  const c2 = normalizarCedula(cedula2);

  if (!c1 || !c2) {
    return { success: false, message: 'Faltan las cédulas de las atletas.' };
  }

  if (c1 === c2) {
    return { success: false, message: 'No puedes inscribirte a ti misma como tu pareja.' };
  }

  try {
    const url = `${WEBHOOK_URL}?action=registrar&cedula1=${encodeURIComponent(c1)}&nombre1=${encodeURIComponent(nombre1 || '')}&cedula2=${encodeURIComponent(c2)}&nombre2=${encodeURIComponent(nombre2 || '')}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('[CompetenciaService] Error registrando vía Webhook:', err.message);
    return {
      success: false,
      message: 'Error de conexión al guardar el registro en Google Sheets. Por favor intenta de nuevo.'
    };
  }
}

/**
 * Genera el texto estructurado del mensaje de confirmación
 */
export function generarTextoConfirmacion(nombre1, nombre2) {
  const n1 = (nombre1 || 'Atleta 1').trim();
  const n2 = (nombre2 || 'Atleta 2').trim();
  return `¡Hola Energy Box! Confirmamos nuestra inscripción a la Competencia Interna (Duplas Femeninas - Principiante): ${n1} y ${n2}.`;
}

/**
 * Genera el enlace directo a WhatsApp para el mensaje de 1-clic con los dos nombres
 */
export function generarEnlaceWhatsApp(nombre1, nombre2) {
  const telefono = '584167130325';
  const texto = generarTextoConfirmacion(nombre1, nombre2);
  return `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
}
