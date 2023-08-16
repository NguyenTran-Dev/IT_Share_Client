const REGEX_ONLY_NUMBER = /^\d+$/;
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\s]).{8,16}$/;
export { REGEX_ONLY_NUMBER, REGEX_EMAIL, REGEX_PASSWORD };
