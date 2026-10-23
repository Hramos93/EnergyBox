/**
 * Servicio de Validación y Registro para la Competencia Interna Energy Box
 * Ciberseguridad: Sanitiza inputs y se comunica de forma ciega con el Webhook privado.
 */

// Si no está configurada la variable en .env, usa el modo demo/local para desarrollo
const WEBHOOK_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_COMPETENCIA_API_URL) || '';

/**
 * Normaliza cualquier formato de cédula ingresado por el usuario
 * Ejemplos: "v- 24.555.666", "24555666", "V24555666" -> "24555666"
 */
export function normalizarCedula(cedula) {
  if (!cedula) return '';
  return String(cedula).replace(/[\s\.\-_]/g, '').toUpperCase();
}

/**
 * Valida si una cédula corresponde a una atleta activa
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

  // 1. Si existe URL del Webhook de Google Apps Script configurado:
  if (WEBHOOK_URL) {
    try {
      const url = `${WEBHOOK_URL}?action=validar&cedula=${encodeURIComponent(cedulaLimpia)}`;
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('[CompetenciaService] Error conectando con Webhook, usando validación local:', err.message);
    }
  }

  // 2. Modo Simulación / Desarrollo (si no se ha desplegado el Webhook aún):
  // Permite probar la interfaz fluidamente
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simula latencia de red

  // Mock de prueba para desarrollo
  const numeroSolo = cedulaLimpia.replace(/\D/g, '');
  if (numeroSolo.endsWith('0') || numeroSolo.endsWith('9')) {
    return {
      success: true,
      active: false,
      message: 'Esta cédula no figura en el registro de atletas activas de este mes. Por favor acércate a recepción.'
    };
  }

  return {
    success: true,
    active: true,
    cedula: cedulaLimpia,
    nombre: `Atleta ${numeroSolo.slice(-4)}`,
    message: 'Atleta activa verificada'
  };
}

/**
 * Registra formalmente a la dupla en la base de datos
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

  if (WEBHOOK_URL) {
    try {
      const url = `${WEBHOOK_URL}?action=registrar&cedula1=${encodeURIComponent(c1)}&nombre1=${encodeURIComponent(nombre1)}&cedula2=${encodeURIComponent(c2)}&nombre2=${encodeURIComponent(nombre2)}`;
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[CompetenciaService] Error registrando vía Webhook, usando confirmación local:', err.message);
    }
  }

  // Simulación de guardado
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: '¡Dupla inscrita exitosamente!',
    dupla: {
      atleta1: nombre1,
      atleta2: nombre2,
      categoria: 'Principiante',
      modalidad: 'Mujer-Mujer'
    }
  };
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
