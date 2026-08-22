export type Question = {
  id: number;
  question: string;
  options: [string, string, string, string];
  correct: number;
};

export const questions: Question[] = [
  {
    id: 1,
    question: '¿Cuál es el planeta más cercano al Sol?',
    options: ['Venus', 'Mercurio', 'Marte', 'Tierra'],
    correct: 1,
  },
  {
    id: 2,
    question: '¿Cuál es la capital de Australia?',
    options: ['Sídney', 'Melbourne', 'Canberra', 'Perth'],
    correct: 2,
  },
  {
    id: 3,
    question: '¿En qué año cayó el Muro de Berlín?',
    options: ['1987', '1989', '1991', '1993'],
    correct: 1,
  },
  {
    id: 4,
    question: '¿Quién pintó el techo de la Capilla Sixtina?',
    options: ['Leonardo da Vinci', 'Rafael', 'Donatello', 'Miguel Ángel'],
    correct: 3,
  },
  {
    id: 5,
    question: '¿Cuál es el símbolo químico del oro?',
    options: ['Au', 'Ag', 'Go', 'Or'],
    correct: 0,
  },
  {
    id: 6,
    question: '¿Cuál es el río más largo del mundo?',
    options: ['Amazonas', 'Yangtsé', 'Nilo', 'Misisipi'],
    correct: 2,
  },
  {
    id: 7,
    question: '¿Quién fue el primer ser humano en pisar la Luna?',
    options: ['Yuri Gagarin', 'Buzz Aldrin', 'Neil Armstrong', 'John Glenn'],
    correct: 2,
  },
  {
    id: 8,
    question: '¿En qué museo se exhibe la Mona Lisa?',
    options: ['Museo del Prado', 'Louvre', 'Uffizi', 'MoMA'],
    correct: 1,
  },
  {
    id: 9,
    question: '¿Aproximadamente a qué velocidad viaja la luz en el vacío?',
    options: ['300.000 km/s', '150.000 km/s', '30.000 km/s', '3.000 km/s'],
    correct: 0,
  },
  {
    id: 10,
    question: '¿Cuál es el país más pequeño del mundo?',
    options: ['Mónaco', 'San Marino', 'Liechtenstein', 'Ciudad del Vaticano'],
    correct: 3,
  },
];
