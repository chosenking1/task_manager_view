const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://task-manager-api-production-e771.up.railway.app'
  : 'http://localhost:8000';

export default apiUrl;

