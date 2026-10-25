/**
 * =========================================================================
 * ENERGY BOX C.A. - SERVICIO CENTRALIZADO DE ANALÍTICA (GA4 / GTAG)
 * =========================================================================
 * 
 * POLÍTICA DE CIBERSEGURIDAD:
 * - CERO FILTRACIÓN DE PII: Se bloquean y eliminan cédulas, teléfonos y correos
 *   antes de transmitir cualquier evento a Google Analytics.
 */

/**
 * Registra un evento genérico en Google Analytics 4 de forma segura
 * @param {string} eventName - Nombre del evento (ej: 'generate_lead', 'click_cta')
 * @param {Object} params - Metadatos adicionales (sin PII)
 */
export function trackEvent(eventName, params = {}) {
  try {
    // Escudo de Ciberseguridad: eliminar cualquier campo que pueda contener datos sensibles
    const sanitized = { ...params };
    const piiFields = ['cedula', 'cedula1', 'cedula2', 'telefono', 'phone', 'email', 'id'];
    piiFields.forEach((field) => {
      delete sanitized[field];
    });

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, sanitized);
    }
    return true;
  } catch (err) {
    // Evitar que un error en analítica interrumpa la interacción del usuario
    return false;
  }
}

/**
 * Evento estándar de captura de Lead vía WhatsApp
 * @param {string} source - Ubicación del botón (ej: 'hero_free_trial', 'pricing_mensual', 'floating_fab')
 * @param {string} [plan] - Nombre del plan seleccionado (opcional)
 */
export function trackWhatsAppLead(source, plan = 'general') {
  return trackEvent('generate_lead', {
    event_category: 'Lead Acquisition',
    event_label: source,
    channel: 'whatsapp',
    plan_interest: plan
  });
}

/**
 * Eventos del embudo de la Competencia Interna
 * @param {number} step - Número del paso completado (1, 2, 3)
 * @param {string} action - Descripción de la acción ('validar_capitana', 'validar_companera', 'registro_exitoso')
 */
export function trackCompetenciaStep(step, action) {
  return trackEvent('competencia_step_completed', {
    event_category: 'Competencia Interna',
    step_number: step,
    step_action: action
  });
}
