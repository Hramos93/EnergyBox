import React from 'react';
import { trackWhatsAppLead } from '../services/analytics';

/**
 * Componente Botón Flotante Persistente de WhatsApp (Sticky FAB)
 * Ciberseguridad: Enlace sanitizado con rel="noopener noreferrer".
 * CRO: Canal de contacto 1-clic siempre visible para captar prospectos en móviles y desktop.
 */
export default function WhatsAppFloatingButton() {
  const handleClick = () => {
    trackWhatsAppLead('floating_fab', 'general_info');
  };

  return (
    <aside aria-label="Canal de contacto directo">
      <a
        href="https://wa.me/584167130325?text=Hola%20Energy%20Box!%20Quisiera%20informaci%C3%B3n%20para%20entrenar."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-fab"
        aria-label="Contactar a Energy Box por WhatsApp"
        onClick={handleClick}
      >
        <div className="fab-pulse" aria-hidden="true"></div>
        {/* SVG Oficial de WhatsApp para máxima nitidez en pantallas de alta densidad */}
        <svg
          className="fab-svg-icon"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 2a13.9 13.9 0 0 0-12 20.9L2 30l7.3-1.9A13.9 13.9 0 1 0 16 2zm0 25.5a11.5 11.5 0 0 1-5.9-1.6l-.4-.3-4.4 1.1 1.2-4.3-.3-.4A11.6 11.6 0 1 1 16 27.5zm6.4-8.7c-.3-.2-2-.1-2.3-1.1-.3-.2-.5-.3-.7.1s-.8 1-.9 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-2.6-1.6 9.8 9.8 0 0 1-1.8-2.3c-.2-.3 0-.5.1-.7s.3-.4.5-.6.2-.3.3-.5a.6.6 0 0 0 0-.6c-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 5c.8.3 1.4.5 1.9.7a4.6 4.6 0 0 0 2.1.1 3.4 3.4 0 0 0 2.2-1.5 2.8 2.8 0 0 0 .2-1.6c-.1-.2-.3-.3-.6-.5z" />
        </svg>
        <span className="fab-tooltip">¿Dudas? Escríbenos</span>
      </a>
    </aside>
  );
}
