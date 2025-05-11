import axios from 'axios';
import { APIConfiguration } from '@/Config/api.config';

export const customAxios = axios.create({
  baseURL: APIConfiguration.baseURL,
  headers: {
    'api-key': APIConfiguration.APIKey,
    'Content-Type': 'application/json',
  },
});
