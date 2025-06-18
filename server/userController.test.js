import { expect, test } from 'vitest';
const userController = require('./userController');

test('adds a user to the db', async () => {
  const user = { username: 'conner', password: 'passw0rd' };
  await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    body: JSON.stringify({ username: 'conner', password: 'passw0rd' }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      if (!response.ok) {
        expect();
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.username)
      expect(data.username).toBe(user.username);
    });
});
