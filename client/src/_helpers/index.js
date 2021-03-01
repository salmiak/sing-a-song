import { authHeader } from './auth-header';
import { slugify } from './slugify';

const apiUrl = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:4000/api'

export default {
  authHeader,
  apiUrl,
  slugify
}
