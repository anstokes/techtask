import { scopePerRequest } from 'awilix-express';
import dotenv from 'dotenv';
import express, {
  Request, Response, Express, NextFunction,
} from 'express';

import container from './container';
import router from './routes/router';

// Create Express app
const app: Express = express();

// CORS
const cors = require('cors');
app.use(cors());

// Add the middleware, passing it your Awilix container.
// This will attach a scoped container on the context.
app.use(scopePerRequest(container));

// Add some authorization middleware
dotenv.config();
export const credentials = process.env.CREDENTIALS;
app.use((req: Request, res: Response, next: NextFunction) => {
  const Authorization = req?.headers?.authorization;
  if (Authorization !== credentials) {
    return res.status(403).json({ error: 'Invalid credentials provided' });
  }
  return next();
});

// Prometheus middleware for '/metrics' endpoint
const prometheusMiddleware = require('express-prometheus-middleware');

app.use(prometheusMiddleware({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  // authenticate: req => req.headers.authorization === 'Basic dXNlcjpwYXNzd29yZA==',
}));

// Use router for root; /
app.use('/', router);

export default app;
