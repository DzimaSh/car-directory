const ENV_MODE = 'dev';

const PORT = ENV_MODE === 'dev' ? ':8080' : '';
const HOST = `${window.location.protocol}//${window.location.hostname}${PORT}`;

export const API_V1_BASE_URL = `${HOST}/api/`;

export const ROWS_PER_PAGE_OPTIONS = [3, 7, 15];
