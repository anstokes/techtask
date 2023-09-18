import { asValue, createContainer } from 'awilix';

import TimeService from './services/TimeService';
import TimeProvider from './providers/TimeProvider';

const container = createContainer()
  .register({
    time: asValue(new TimeService({ TimeProvider: new TimeProvider() })),
  });

export default container;
