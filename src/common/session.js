import { api_url } from 'config';
import axios from 'axios';

export const session = axios.create({
  baseURL: api_url,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: () => true
});
