import { ApiKey } from '../models/app.types';
import routes from './routes';

const apiBaseUrl = 'http://localhost:3001';

const APIEntries = Object.entries(routes)
  .map((route) => [
    route[0] as ApiKey,
    apiBaseUrl + route[1],
  ]);

const apis: Record<ApiKey, string> = Object.fromEntries(APIEntries);

export default apis;
