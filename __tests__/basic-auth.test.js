'use strict';
require('dotenv').config();
const server = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const req = supergoose(server.server);

describe('POST to /signup to create a new user', ()=>{

  let user = {
    username: 'sara',
    password: 'xyz',
  };

  it('Should create a new user upon signing up', async () => {
    const response = await req.post('/signup').send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('sara');
    expect(response.body.password).not.toBeNull();
  });


  it('should sign in with correct username and password', async () => {
    const response = await req.post('/signin').auth(user.username, user.password);
    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('sara');
    expect(response.body.user.password).not.toBeNull();
  });

  it('should not sign in with correct username and wrong password', async () => {
    const response = await req.post('/signin').auth(user.username, '123');
    expect(response.body.message).toEqual('not valid');
    expect(response.body.status).toEqual(500);

  });

  it('shouldnt sign in with correct username and wrong password', async () => {
    const response = await req.post('/signin');
    expect(response.status).toEqual(500);
  });
});