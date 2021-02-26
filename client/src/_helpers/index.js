import { authHeader } from './auth-header';
import { slugify } from './slugify';

const apiUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'

export default {
  authHeader,
  apiUrl,
  slugify
}
