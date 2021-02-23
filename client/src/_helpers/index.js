import { authHeader } from './auth-header';

const apiUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'

console.log(process.env) // eslint-disable-line no-console
console.log(apiUrl) // eslint-disable-line no-console

export default {
  authHeader,
  apiUrl
}
