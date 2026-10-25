import React, { useState } from 'react';
import CompetenciaRegistro from './components/CompetenciaRegistro';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { trackWhatsAppLead } from './services/analytics';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header Unificado Fijo */}
      <div className="site-header-fixed">
        {/* Barra de Anuncio Superior - Competencia Interna */}
        <div className="top-notice-bar">
          <span>🔥 <strong>1ª Competencia Interna:</strong> Duplas Femeninas &bull; Atletas Activas</span>
          <a href="#competencia">Inscribirse &darr;</a>
        </div>

        {/* Header / Navbar */}
        <nav className="navbar">
          <div className="container nav-container">
            <a href="#" className="logo" onClick={handleNavClick}>
              <img src="/assets/logo.png" alt="Energy Box C.A. Logo" width="160" height="50" />
            </a>

            {/* Enlaces de Navegación (Desktop + Drawer Móvil) */}
            <ul className={`nav-links ${mobileMenuOpen ? 'nav-links-mobile-open' : ''}`}>
              <li><a href="#competencia" className="nav-link-highlight" onClick={handleNavClick}>🏆 Competencia</a></li>
              <li><a href="#disciplinas" onClick={handleNavClick}>Disciplinas</a></li>
              <li><a href="#comunidad" onClick={handleNavClick}>Comunidad & Coaches</a></li>
              <li><a href="#horarios" onClick={handleNavClick}>Horarios y Tarifas</a></li>
              <li><a href="#ubicacion" onClick={handleNavClick}>Ubicación</a></li>
              <li><a href="#faq" onClick={handleNavClick}>FAQ</a></li>
              <li className="mobile-drawer-cta">
                <a
                  href="https://wa.me/584167130325?text=Hola,%20me%20gustar%C3%ADa%20reservar%20!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    handleNavClick();
                    trackWhatsAppLead('mobile_drawer');
                  }}
                >
                  💬 WhatsApp: 0416-7130325
                </a>
              </li>
            </ul>

            {/* Botón WhatsApp Desktop */}
            <a
              href="https://wa.me/584167130325?text=Hola,%20me%20gustar%C3%ADa%20reservar%20!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary nav-desktop-cta"
              onClick={() => trackWhatsAppLead('navbar_desktop')}
            >
              <span style={{ fontSize: '0.9em', marginRight: '6px' }}>💬</span> WhatsApp: 0416-7130325
            </a>

            {/* Botón Hamburguesa Interactivo y Accesible */}
            <button
              type="button"
              className={`nav-hamburger ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay oscuro para cerrar el menú móvil al hacer clic fuera */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer-backdrop" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-location-badge">📍 Guarenas &bull; Las Clavellinas</div>
          <h1>El Box de CrossFit y<br /><span className="text-highlight">Entrenamiento Funcional</span></h1>
          <p>
            Entrena con coaches certificados en <strong>Guarenas</strong>. Clases de alta intensidad 100% adaptables para principiantes y atletas de todos los niveles.
          </p>
          <div className="hero-buttons">
            <a
              href="https://wa.me/584167130325?text=Hola!%20Quiero%20agendar%20mi%20clase%20de%20prueba%20gratis%20en%20Energy%20Box"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large btn-glow"
              style={{ display: 'inline-block', marginRight: '1rem', marginBottom: '0.75rem' }}
              onClick={() => trackWhatsAppLead('hero_free_trial', 'clase_gratis')}
            >
              🔥 Agenda Tu Clase Gratis
            </a>
            <a
              href="#horarios"
              className="btn btn-secondary btn-large"
              style={{ display: 'inline-block', marginBottom: '0.75rem' }}
            >
              Ver Horarios y Tarifas
            </a>
          </div>
          <div className="hero-sublinks">
            <a href="#competencia" className="hero-competencia-pill">
              🏆 ¿Eres atleta activa del Box? <u>Inscribe tu dupla para la competencia aquí &rarr;</u>
            </a>
          </div>
          <div className="hero-trust-bar">
            <span>⭐ Clases 100% guiadas &bull; Sin experiencia previa requerida &bull; Comunidad Guarenas</span>
          </div>
        </div>
      </header>

      {/* SECCIÓN DESTACADA: Competencia Interna Duplas Femeninas */}
      <section id="competencia" className="section section-competencia">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="competencia-badge">⚡ Evento Exclusivo de la Comunidad</span>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            1ª Competencia Interna <br />
            <span className="text-highlight">Duplas Femeninas</span>
          </h2>
          <p className="competencia-subtitle">
            ¡Mide tu fuerza y resistencia junto a tu compañera de WOD! <br />
            <strong>Categoría:</strong> Principiante &bull; <strong>Modalidad:</strong> Duplas Mujer - Mujer &bull; <strong>Costo:</strong> Gratuito ($0) para atletas activas.
          </p>

          {/* Formulario Dinámico Paso a Paso */}
          <CompetenciaRegistro />
        </div>
      </section>

      {/* Disciplinas Section */}
      <section id="disciplinas" className="section">
        <div className="container">
          <h2 className="section-title">Nuestras <span className="text-highlight">Disciplinas</span></h2>
          <div className="disciplines-grid">
            <div className="discipline-card">
              <div className="card-icon">💪</div>
              <h3>WODs</h3>
              <p>Workout of the Day. Combinaciones diarias de alta intensidad para desafiar todos tus límites.</p>
            </div>
            <div className="discipline-card">
              <div className="card-icon">🏋️‍♂️</div>
              <h3>Weightlifting</h3>
              <p>Técnica y fuerza pura. Mejora tus levantamientos olímpicos (Snatch y Clean & Jerk).</p>
            </div>
            <div className="discipline-card">
              <div className="card-icon">🤸‍♀️</div>
              <h3>Gymnastics</h3>
              <p>Domina tu peso corporal. Desarrollo de core, equilibrio y movimientos gimnásticos.</p>
            </div>
            <div className="discipline-card">
              <div className="card-icon">🏃‍♂️</div>
              <h3>Endurance</h3>
              <p>Aumenta tu capacidad aeróbica y resistencia cardiovascular para ir siempre un paso más allá.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN COMUNIDAD, COACHES Y PRUEBA SOCIAL (Fase 5 CRO) */}
      <section id="comunidad" className="section section-comunidad">
        <div className="container">
          <h2 className="section-title">Comunidad y <span className="text-highlight">Coaches</span></h2>
          <p className="comunidad-intro-subtitle">
            Detrás de cada repetición hay un coach cuidando tu postura y una comunidad en <strong>Guarenas</strong> motivándote a superarte cada día.
          </p>

          {/* Tarjetas de Pilares Técnicos y Coaches */}
          <div className="coaches-grid">
            <div className="coach-card">
              <div className="coach-avatar-icon">🏋️‍♂️</div>
              <h3>Coaches Dedicados</h3>
              <span className="coach-role">Técnica & Metodología</span>
              <p>Especialistas en levantamiento olímpico y gimnasia funcional. Adaptamos las cargas y movimientos para que entrenes con 0% riesgo y 100% efectividad.</p>
              <span className="coach-pill">✓ Escalabilidad Total</span>
            </div>

            <div className="coach-card coach-card-featured">
              <div className="coach-avatar-icon">🤝</div>
              <h3>Comunidad Sin Egos</h3>
              <span className="coach-role">El Box de Guarenas</span>
              <p>Celebramos tanto al que levanta 100 kg como al que logra su primera flexión. En Las Clavellinas todos nos apoyamos para no abandonar.</p>
              <span className="coach-pill coach-pill-gold">✓ Ambiente Inclusivo</span>
            </div>

            <div className="coach-card">
              <div className="coach-avatar-icon">🛡️</div>
              <h3>Salud Articular Primero</h3>
              <span className="coach-role">Prevención de Lesiones</span>
              <p>Priorizamos la biomecánica correcta antes de la intensidad. Queremos que desarrolles fuerza y salud sostenible a lo largo de los años.</p>
              <span className="coach-pill">✓ Supervisión en Cada Rep</span>
            </div>
          </div>

          {/* Testimonios Reales de Atletas */}
          <div className="testimonials-section-wrapper">
            <h3 className="testimonials-heading">
              Lo que dice nuestra <span className="text-highlight">Comunidad</span>
            </h3>
            <p className="testimonials-subheading">Historias reales de personas que empezaron desde cero en Las Clavellinas</p>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">
                  "Tenía años sin hacer deporte y me daba miedo el CrossFit por temor a lesionarme. En Energy Box los entrenadores me enseñaron paso a paso desde el primer día. ¡Hoy es mi mejor momento del día!"
                </p>
                <div className="testimonial-author-box">
                  <div className="author-avatar">MG</div>
                  <div className="author-info">
                    <strong>Mariana Gómez</strong>
                    <span>Atleta activa &bull; Turno Mañana</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">
                  "El compañerismo en Las Clavellinas es increíble. Los coaches tienen una paciencia de oro y el turno de la noche me queda perfecto después de salir del trabajo. 100% recomendado."
                </p>
                <div className="testimonial-author-box">
                  <div className="author-avatar">CR</div>
                  <div className="author-info">
                    <strong>Carlos Rodríguez</strong>
                    <span>Atleta activo &bull; Turno Noche</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">
                  "El ambiente es súper sano, las instalaciones están impecables y las tarifas a tasa oficial BCV son completamente claras y justas. No cambio Energy Box por nada."
                </p>
                <div className="testimonial-author-box">
                  <div className="author-avatar">EP</div>
                  <div className="author-info">
                    <strong>Elena Pacheco</strong>
                    <span>Atleta activa &bull; Principiante</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horarios y Tarifas Section */}
      <section id="horarios" className="section section-dark">
        <div className="container">
          <h2 className="section-title">Horarios y <span className="text-highlight">Tarifas</span></h2>

          <div className="schedule-pricing-container">
            {/* Tabla de Horarios */}
            <div className="schedule-box">
              <h3>Horarios de Clases</h3>
              <p className="schedule-box-subtitle">Lunes a Viernes &bull; Entrenamientos en Guarenas</p>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Turno</th>
                    <th colSpan="2">Horarios Disponibles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Mañana</strong></td>
                    <td>6:30 AM - 7:30 AM</td>
                    <td>7:30 AM - 8:30 AM</td>
                  </tr>
                  <tr>
                    <td><strong>Mediodía</strong></td>
                    <td colSpan="2" className="schedule-closed">Cerrado para recuperación</td>
                  </tr>
                  <tr>
                    <td><strong>Tarde/Noche</strong></td>
                    <td>6:30 PM - 7:30 PM</td>
                    <td>7:30 PM - 8:30 PM</td>
                  </tr>
                </tbody>
              </table>
              <div className="schedule-notice">
                <span>⏱️ Todas las clases inician puntuales e incluyen calentamiento, técnica y WOD guiado.</span>
              </div>
            </div>

            {/* Tarjetas de Precios y Planes (Fase 4 CRO) */}
            <div className="pricing-box">
              <h3>Planes y Membresías</h3>
              <p className="pricing-bcv-header">
                💵 Precios en Referencia ($) con cobro en Bolívares a la <strong>Tasa BCV del día</strong>. Sin costo oculto de matrícula.
              </p>

              <div className="pricing-cards-wrapper">
                {/* Plan Semanal */}
                <div className="pricing-card">
                  <div className="pricing-card-header">
                    <h4>Básico-Semanal</h4>
                    <span className="pricing-tag">Flexibilidad Total</span>
                  </div>
                  <div className="pricing-amount">
                    <span className="price-currency">Ref</span>
                    <span className="price-val">$5</span>
                    <span className="price-frequency">/ sem</span>
                  </div>
                  <p className="pricing-bcv-note">Facturado a Tasa BCV del día</p>
                  <ul className="pricing-features">
                    <li>✓ 3 clases por semana a elección</li>
                    <li>✓ Coaches atentos a tu técnica</li>
                    <li>✓ Calentamiento y WOD del día</li>
                    <li>✓ Ideal para semanas puntuales</li>
                  </ul>
                  <a
                    href="https://wa.me/584167130325?text=Hola!%20Me%20interesa%20inscribirme%20en%20el%20Plan%20B%C3%A1sico-Semanal%20(Ref%20$5)%20en%20Energy%20Box"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-block btn-pricing-action"
                    onClick={() => trackWhatsAppLead('pricing_card_semanal', 'Basico-Semanal')}
                  >
                    Elegir Plan Semanal
                  </a>
                </div>

                {/* Plan Mensual (Destacado) */}
                <div className="pricing-card pricing-card-featured">
                  <div className="featured-ribbon">🔥 Más Popular &bull; Mejor Valor</div>
                  <div className="pricing-card-header">
                    <h4>Básico-Mensual</h4>
                    <span className="pricing-tag featured-tag">Resultados & Hábito</span>
                  </div>
                  <div className="pricing-amount">
                    <span className="price-currency">Ref</span>
                    <span className="price-val">$20</span>
                    <span className="price-frequency">/ mes</span>
                  </div>
                  <p className="pricing-bcv-note">Facturado a Tasa BCV del día</p>
                  <ul className="pricing-features">
                    <li>✓ 3 clases semanales continuas (12 al mes)</li>
                    <li>✓ Seguimiento de tu avance de fuerza</li>
                    <li>✓ Escalabilidad 100% personalizada</li>
                    <li>✓ Acceso a eventos y comunidad activa</li>
                  </ul>
                  <a
                    href="https://wa.me/584167130325?text=Hola!%20Me%20interesa%20inscribirme%20en%20el%20Plan%20B%C3%A1sico-Mensual%20(Ref%20$20)%20en%20Energy%20Box"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-block btn-pricing-action"
                    onClick={() => trackWhatsAppLead('pricing_card_mensual', 'Basico-Mensual')}
                  >
                    Inscribirme en Plan Mensual
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación Section */}
      <section id="ubicacion" className="section">
        <div className="container">
          <h2 className="section-title">Nuestra <span className="text-highlight">Ubicación</span></h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Ven a conocernos y vive la experiencia Energy Box en <strong>Guarenas</strong>.<br/>
            📍 Avenida principal las clavellinas, Al lado de la cancha techada, Guarenas, Municipio Plaza, Estado Miranda.
          </p>
          <div className="map-container">
            <iframe
              title="Ubicación oficial de Energy Box C.A. en Las Clavellinas, Guarenas"
              width="100%"
              height="450"
              style={{ border: '1px solid var(--border-color)', borderRadius: '12px' }}
              src="https://maps.google.com/maps?q=10.460466,-66.618428&hl=es&z=17&output=embed"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section section-dark">
        <div className="container faq-container">
          <h2 className="section-title">Preguntas <span className="text-highlight">Frecuentes</span></h2>
          <div className="faq-accordion">
            <details>
              <summary>¿Necesito tener experiencia previa para unirme?</summary>
              <div className="faq-content">
                <p>No, nuestras clases son adaptables a cualquier nivel. Nuestros coaches te guiarán paso a paso, desde los fundamentos básicos hasta movimientos más complejos cuando estés listo.</p>
              </div>
            </details>
            <details>
              <summary>¿Qué equipo necesito llevar?</summary>
              <div className="faq-content">
                <p>Solo necesitas ropa deportiva cómoda, zapatos deportivos (preferiblemente de suela plana), buena hidratación y una toalla. Todo el equipamiento de entrenamiento lo ponemos nosotros.</p>
              </div>
            </details>
            <details>
              <summary>¿Tengo una lesión antigua, puedo entrenar?</summary>
              <div className="faq-content">
                <p>Siempre y cuando tengas aprobación de tu médico, sí. Es fundamental que informes a nuestros coaches sobre cualquier condición o lesión antes de iniciar. Ellos adaptarán (escalarán) los ejercicios para que entrenes de forma segura.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contacto" className="footer">
        <div className="container footer-grid">
          <div className="footer-info">
            <img src="/assets/logo.png" alt="Energy Box Logo Footer" className="footer-logo" width="160" height="60" />
            <p>Supera tus límites con la mejor comunidad de fitness.</p>
            <div className="company-details">
              <p><strong>Energy Box C.A. - Guarenas</strong></p>
              <p><strong>RIF:</strong> J-504118702</p>
              <p><strong>Teléfono:</strong> 0416-7130325</p>
            </div>
          </div>

          <div className="footer-form-container" style={{ textAlign: 'center' }}>
            <h3>Contactanos</h3>
            <p style={{ marginBottom: '2rem' }}>
              Contáctanos directamente por WhatsApp para agendar tu primera clase con nuestros coaches.
            </p>
            <a
              href="https://wa.me/584167130325?text=Hola,%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20por%20favor!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
              style={{ display: 'inline-block' }}
              onClick={() => trackWhatsAppLead('footer_contact')}
            >
              <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>💬</span> WhatsApp: 0416-7130325
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Energy Box C.A. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Botón Flotante Persistente de WhatsApp (Fase 2 CRO) */}
      <WhatsAppFloatingButton />
    </>
  );
}

export default App;
