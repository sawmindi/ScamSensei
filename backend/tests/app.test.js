
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js'; 

describe('Express Server Tests', () => {
  it('should return a message from the main page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('main page of server');
  });


});
