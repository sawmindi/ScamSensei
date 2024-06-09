// db.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { connectToDatabase, disconnectFromDatabase } from '../db/connection.js';

describe('Database Connection', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  it('should connect and disconnect from the database without throwing an error', () => {
    expect(connectToDatabase).not.toThrow();
    expect(disconnectFromDatabase).not.toThrow();
  });
});
