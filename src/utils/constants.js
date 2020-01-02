const now = new Date();
const month = now.getMonth();

let y = now.getFullYear();
y = month < 2 ? y - 1 : y;
export const year = y;
export const term = month > 8 || month < 2 ? 'Güz' : 'Bahar';

