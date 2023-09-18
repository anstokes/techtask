// Chai is a BDD/TDSD assertion library
// @see https://www.chaijs.com/
import chai from 'chai';

// HTTP assertions made easy via superagent
// @see https://github.com/ladjs/supertest#readme
import supertest from 'supertest';

// Load app
import app, { credentials } from '../src/app';

// Credentials
export { credentials };

// Chai
export const { expect } = chai;

// Configure the server
export const server = supertest.agent(app);
