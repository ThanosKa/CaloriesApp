import { API_PROTOCOL, API_HOST, API_PORT, API_BASE_PATH } from '@env';

// Default values for local development
const DEFAULT_CONFIG = {
  protocol: 'http',
  host: 'localhost',
  port: '5000',
  basePath: '/api'
};

export const apiConfig = {
  protocol: DEFAULT_CONFIG.protocol,
  host: DEFAULT_CONFIG.host,
  port: DEFAULT_CONFIG.port,
  basePath: DEFAULT_CONFIG.basePath,
  get baseUrl() {
    return `${this.protocol}://${this.host}:${this.port}${this.basePath}`;
  }
};
