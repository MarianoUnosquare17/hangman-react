export type WordProvider = () => string;

const words = [
  'React',
  'Typescript',
  'Web',
  'Javascript',
  'Vue',
  'Unosquare',
  'Array',
  'String',
  'Java',
  'Localhost',
  'Developer',
];

export function makeWordProvider() {
  if (import.meta.env.NODE_ENV === 'test') {
    return () => 'string test';
  } else {
    return () => {
      const newRandomIndex = Math.floor(Math.random() * words.length);
      return words[newRandomIndex].toLowerCase();
    };
  }
}
