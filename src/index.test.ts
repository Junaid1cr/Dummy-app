import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './index';

describe('dummy-app', () => {
  it('GET /health returns version, status and deployedAt', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('version');
    expect(res.body).toHaveProperty('deployedAt');
    // deployedAt should be a valid ISO timestamp
    expect(Number.isNaN(Date.parse(res.body.deployedAt))).toBe(false);
  });

  it('GET / returns a message and the version', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/dummy-app/);
    expect(res.body).toHaveProperty('version');
  });
});
