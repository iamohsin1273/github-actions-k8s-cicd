const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../server');

let server;
let baseUrl;

before(async () => {
  // Port 0 asks the OS for any free port.
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

test('GET / returns the pipeline banner', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.equal(res.status, 200);
  assert.equal(await res.text(), 'DevOps CI/CD Pipeline Running');
});

test('GET /health returns 200 OK', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.status, 200);
  assert.equal(await res.text(), 'OK');
});

test('unknown routes return 404', async () => {
  const res = await fetch(`${baseUrl}/does-not-exist`);
  assert.equal(res.status, 404);
});
