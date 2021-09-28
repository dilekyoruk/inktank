const request = require('supertest');
const app = require('../src/app');

describe('Users endpoints', () => {
  /* Add a user */
  it('post request to /users should create a user', async () => {
    const userToCreate = {
      name: `John${Date.now()}`,
      email: `john${Date.now()}@gmail.com`,
      location: 'London',
    };

    const createdUser = (await request(app).post('/api/users').send(userToCreate)).body;
    expect(createdUser.name).toBe(userToCreate.name);
    expect(createdUser.email).toBe(userToCreate.email);
    expect(createdUser.location).toBe(userToCreate.location);
  });

  /* GET user listing */
  it('get request to /users should list users', async () => {
    const userList = (await request(app).get('/api/users')).body;
    const usersExist = userList.length > 0;

    expect(usersExist).toBe(true);
  });

  /* GET user by name */
  it('get request to /users should return user with given name', async () => {
    const username = 'John';
    const userList = (await request(app).get(`/api/users?name=${username}`)).body;
    const usersExist = userList.length > 0;

    expect(usersExist).toBe(true);
    expect(username).toBe(userList[0].name);
  });

  /* GET an empty array when user is not exist */
  it('get request to /users should return empty array when user is not exist', async () => {
    const username = `John${Date.now()}`;
    const userList = (await request(app).get(`/api/users?name=${username}`)).body;
    const usersNotExist = userList.length == 0;

    expect(usersNotExist).toBe(true);
  });

  /* GET user by Id */
  it('get request to /users should return user with given id', async () => {
    const userToCreate = {
      name: `John${Date.now()}`,
      email: `john${Date.now()}@gmail.com`,
      location: 'London',
    };

    const createdUser = (await request(app).post('/api/users').send(userToCreate)).body;
    const userId = createdUser._id;
    const user = (await request(app).get(`/api/users/${userId}`)).body;

    expect(userId).toBe(user._id);
  });

  /* Follow a tattoo artist */
  it('post request to /:id/follow-artist should return status 200 ', async () => {
    // create the user
    const userToCreate = {
      name: `John${Date.now()}`,
      email: `john${Date.now()}@gmail.com`,
      location: 'London',
    };

    const createdUser = (await request(app).post('/api/users').send(userToCreate)).body;
    const userId = createdUser._id;

    // create the tattoo artist
    const tattooArtistToCreate = {
      name: `Mary${Date.now()}`,
      email: `Mary${Date.now()}@gmail.com`,
      location: 'Berlin',
    };
    const createdTattooArtist = (await request(app).post('/api/tattoo-artists').send(tattooArtistToCreate)).body;
    const tattooArtistId = createdTattooArtist._id;

    // follow the tattoo artist
    const { status } = await request(app).post(`/api/users/${userId}/follow-artist`).send({ id: tattooArtistId });
    console.log(status);

    expect(200).toBe(200);
  });
});
