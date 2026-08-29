import React from 'react';

function App() {
  return (
    <>
      {/* Header / Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#" className="logo">
            <img src="/assets/logo.png" alt="Energy Box C.A. Logo" />
          </a>
          <ul className="nav-links">
            <li><a href="#disciplinas">Disciplinas</a></li>
            <li><a href="#horarios">Horarios y Tarifas</a></li>
            <li><a href="#ubicacion">Ubicación</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <a
            href="https://wa.me/584167130325?text=Hola,%20me%20gustar%C3%ADa%20reservar%20!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-large"
            style={{ display: 'inline-block' }}
          >
            <span style={{ fontSize: '0.8em', marginRight: '6px' }}>💬</span> WhatsApp: 0416-7130325
          </a>

        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Desata Tu<br /><span className="text-highlight">Verdadero Potencial</span></h1>
          <p>
            Entrenamiento funcional de alta intensidad diseñado para transformar tu cuerpo y mente. Únete a la comunidad de Energy Box C.A.
          </p>
          <div className="hero-buttons">
            <a
              href="https://wa.me/584167130325?text=Hola,%20me%20gustar%C3%ADa%20reservar%20!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
              style={{ display: 'inline-block' }}
            >
              <span style={{ fontSize: '0.8em', marginRight: '6px' }}>💬</span> WhatsApp: 0416-7130325
            </a>
          </div>
        </div>
      </header>

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

      {/* Horarios y Tarifas Section */}
      <section id="horarios" className="section section-dark">
        <div className="container">
          <h2 className="section-title">Horarios y <span className="text-highlight">Tarifas</span></h2>

          <div className="schedule-pricing-container">
            <div className="schedule-box">
              <h3>Horarios de Clases</h3>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Turno</th>
                    <th>Lunes - Viernes</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mañana</td>
                    <td>6:30 AM - 7:30 AM</td>
                    <td>7:30 AM - 8:30 AM</td>
                  </tr>
                  <tr>
                    <td>Mediodía</td>
                    <td colSpan="2">Cerrado</td>
                  </tr>
                  <tr>
                    <td>Tarde/Noche</td>
                    <td>6:30 PM - 7:30 PM</td>
                    <td>7:30 PM - 8:30 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pricing-box">
              <h3>Planes Mensuales</h3>
              <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Ref en $ con costo del plan al Tasa BCV del día
              </p>
              <ul className="pricing-list">
                <li>
                  <span className="plan-name">Básico-Semanal (3 días/sem)</span>
                  <span className="plan-price">Ref $5</span>
                </li>
                <li>
                  <span className="plan-name">Básico-Mensual (3 días/sem)</span>
                  <span className="plan-price">Ref $20</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación Section */}
      <section id="ubicacion" className="section">
        <div className="container">
          <h2 className="section-title">Nuestra <span className="text-highlight">Ubicación</span></h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Ven a conocernos y vive la experiencia Energy Box.
          </p>
          <div className="map-container">
            <iframe
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
            <img src="/assets/logo.png" alt="Energy Box Logo Footer" className="footer-logo" />
            <p>Supera tus límites con la mejor comunidad de fitness.</p>
            <div className="company-details">
              <p><strong>Energy Box C.A.</strong></p>
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
            >
              <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>💬</span> WhatsApp: 0416-7130325
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Energy Box C.A. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
