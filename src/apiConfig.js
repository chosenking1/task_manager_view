require('dotenv').config();
// const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:8000';
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
export default apiUrl;
