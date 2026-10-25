/**
 * =========================================================================
 * ENERGY BOX C.A. - DATA CENTRALIZADA DEL BOX (GUARENAS)
 * =========================================================================
 * 
 * Permite actualizar tarifas, horarios, entrenadores y testimonios
 * de forma rápida y desacoplada sin tocar la lógica de los componentes.
 */

export const BOX_INFO = {
  name: 'Energy Box C.A.',
  location: 'Guarenas, Municipio Plaza, Estado Miranda',
  addressDetail: 'Avenida principal las clavellinas, Al lado de la cancha techada',
  rif: 'J-504118702',
  phoneDisplay: '0416-7130325',
  phoneInternational: '+584167130325',
  coordinates: {
    lat: 10.460466,
    lng: -66.618428
  }
};

export const DISCIPLINAS = [
  {
    id: 'wods',
    icon: '💪',
    title: 'WODs',
    description: 'Workout of the Day. Combinaciones diarias de alta intensidad para desafiar todos tus límites.'
  },
  {
    id: 'weightlifting',
    icon: '🏋️‍♂️',
    title: 'Weightlifting',
    description: 'Técnica y fuerza pura. Mejora tus levantamientos olímpicos (Snatch y Clean & Jerk).'
  },
  {
    id: 'gymnastics',
    icon: '🤸‍♀️',
    title: 'Gymnastics',
    description: 'Domina tu peso corporal. Desarrollo de core, equilibrio y movimientos gimnásticos.'
  },
  {
    id: 'endurance',
    icon: '🏃‍♂️',
    title: 'Endurance',
    description: 'Aumenta tu capacidad aeróbica y resistencia cardiovascular para ir siempre un paso más allá.'
  }
];

export const COACHES_PILARES = [
  {
    id: 'coaches',
    icon: '🏋️‍♂️',
    title: 'Coaches Dedicados',
    role: 'Técnica & Metodología',
    description: 'Especialistas en levantamiento olímpico y gimnasia funcional. Adaptamos las cargas y movimientos para que entrenes con 0% riesgo y 100% efectividad.',
    pill: '✓ Escalabilidad Total',
    featured: false
  },
  {
    id: 'comunidad',
    icon: '🤝',
    title: 'Comunidad Sin Egos',
    role: 'El Box de Guarenas',
    description: 'Celebramos tanto al que levanta 100 kg como al que logra su primera flexión. En Las Clavellinas todos nos apoyamos para no abandonar.',
    pill: '✓ Ambiente Inclusivo',
    featured: true
  },
  {
    id: 'salud',
    icon: '🛡️',
    title: 'Salud Articular Primero',
    role: 'Prevención de Lesiones',
    description: 'Priorizamos la biomecánica correcta antes de la intensidad. Queremos que desarrolles fuerza y salud sostenible a lo largo de los años.',
    pill: '✓ Supervisión en Cada Rep',
    featured: false
  }
];

export const TESTIMONIOS = [
  {
    id: 't1',
    stars: '⭐⭐⭐⭐⭐',
    quote: '"Tenía años sin hacer deporte y me daba miedo el CrossFit por temor a lesionarme. En Energy Box los entrenadores me enseñaron paso a paso desde el primer día. ¡Hoy es mi mejor momento del día!"',
    author: 'Mariana Gómez',
    avatar: 'MG',
    detail: 'Atleta activa • Turno Mañana'
  },
  {
    id: 't2',
    stars: '⭐⭐⭐⭐⭐',
    quote: '"El compañerismo en Las Clavellinas es increíble. Los coaches tienen una paciencia de oro y el turno de la noche me queda perfecto después de salir del trabajo. 100% recomendado."',
    author: 'Carlos Rodríguez',
    avatar: 'CR',
    detail: 'Atleta activo • Turno Noche'
  },
  {
    id: 't3',
    stars: '⭐⭐⭐⭐⭐',
    quote: '"El ambiente es súper sano, las instalaciones están impecables y las tarifas a tasa oficial BCV son completamente claras y justas. No cambio Energy Box por nada."',
    author: 'Elena Pacheco',
    avatar: 'EP',
    detail: 'Atleta activa • Principiante'
  }
];

export const PLANES_PRECIOS = [
  {
    id: 'semanal',
    name: 'Básico-Semanal',
    tag: 'Flexibilidad Total',
    priceVal: '$5',
    frequency: '/ sem',
    bcvNote: 'Facturado a Tasa BCV del día',
    features: [
      '3 clases por semana a elección',
      'Coaches atentos a tu técnica',
      'Calentamiento y WOD del día',
      'Ideal para semanas puntuales'
    ],
    ctaText: 'Elegir Plan Semanal',
    whatsappMessage: 'Hola! Me interesa inscribirme en el Plan Básico-Semanal (Ref $5) en Energy Box',
    featured: false
  },
  {
    id: 'mensual',
    name: 'Básico-Mensual',
    tag: 'Resultados & Hábito',
    ribbon: '🔥 Más Popular • Mejor Valor',
    priceVal: '$20',
    frequency: '/ mes',
    bcvNote: 'Facturado a Tasa BCV del día',
    features: [
      '3 clases semanales continuas (12 al mes)',
      'Seguimiento de tu avance de fuerza',
      'Escalabilidad 100% personalizada',
      'Acceso a eventos y comunidad activa'
    ],
    ctaText: 'Inscribirme en Plan Mensual',
    whatsappMessage: 'Hola! Me interesa inscribirme en el Plan Básico-Mensual (Ref $20) en Energy Box',
    featured: true
  }
];

export const FAQS = [
  {
    question: '¿Necesito tener experiencia previa para unirme?',
    answer: 'No, nuestras clases son adaptables a cualquier nivel. Nuestros coaches te guiarán paso a paso, desde los fundamentos básicos hasta movimientos más complejos cuando estés listo.'
  },
  {
    question: '¿Qué equipo necesito llevar?',
    answer: 'Solo necesitas ropa deportiva cómoda, zapatos deportivos (preferiblemente de suela plana), buena hidratación y una toalla. Todo el equipamiento de entrenamiento lo ponemos nosotros.'
  },
  {
    question: '¿Tengo una lesión antigua, puedo entrenar?',
    answer: 'Siempre y cuando tengas aprobación de tu médico, sí. Es fundamental que informes a nuestros coaches sobre cualquier condición o lesión antes de iniciar. Ellos adaptarán (escalarán) los ejercicios para que entrenes de forma segura.'
  }
];
