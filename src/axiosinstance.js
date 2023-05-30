import axios from 'axios';
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:8000';
