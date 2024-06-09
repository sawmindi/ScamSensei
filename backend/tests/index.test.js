// server.test.js
import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '../app.js';

describe('Server', () => {
 

  it('should respond with a message on the main page', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('main page of server');
  });
});
