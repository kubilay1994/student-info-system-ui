const now = new Date();
export const year = now.getFullYear();
const month = now.getMonth();
export const term = month > 8 || month < 2 ? 'Güz' : 'Bahar';
