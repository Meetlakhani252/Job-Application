// Excludes look-alike characters: 0, O, I, l to avoid user confusion
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const generateApplicationId = () => {
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return `APP-${id}`;
};

module.exports = generateApplicationId;
