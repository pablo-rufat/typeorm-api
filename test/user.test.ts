import * as request from "supertest";
import { app } from "../src";
import { UserType } from "../src/modules/User/user.entity";
import { clearDB } from "../src/utils/db";

const agent = request.agent(app);
let ID_USER;
let TOKEN;

beforeAll(done => {
    app.on("appStarted", () => {
        clearDB().then(() => {
          done();
        });
    });
});

describe('user', () => {
  it('should create a new user', async () => {
    const response = await agent
      .post('/users')
      .send({
        firstName:"pablo",
        lastName:"rufat",
        email: "test@test.com",
        password: "123456",
        type: UserType.worker,
    });

    expect(response.status).toEqual(201);
    expect(response.body.email).toBeTruthy();
  });

  it('error. user already registered', async () => {
    const response = await agent
      .post('/users')
      .send({
        firstName:"pablo",
        lastName:"rufat",
        email: "test@test.com",
        password: "123456",
        type: UserType.worker,
    });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("User already registered.");
  });

  it('error. no email field', async () => {
    const response = await agent
      .post('/users')
      .send({
        firstName:"pablo",
        lastName:"rufat",
        password: "123456",
        type: UserType.worker,
    });

    expect(response.status).toEqual(500);
  });

  it('showld return users', async () => {
    const response = await agent
      .get('/users');

    ID_USER = response.body[0].id;

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
  });

  it('showld return one user', async () => {
    const response = await agent
      .get(`/users/${ID_USER}`);

    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual("test@test.com");
  });

  it('error: User not found', async () => {
    const response = await agent
      .get('/users/309f1646-0743-4fb5-8931-0919e15a9183');

    expect(response.status).toEqual(404);
  });

  it('login ok', async () => {
    const response = await agent
    .post(`/login`)
    .send({
      email: "test@test.com",
      password: "123456"
    });

    TOKEN = response.body.accessToken;

    expect(response.status).toEqual(200);
  });

  it('error. User not found', async () => {
    const response = await agent
      .post(`/login`)
      .send({
        email: "pop@pop.com",
        password: "123456"
      });

    expect(response.status).toEqual(404);
  });

  it('error. invalid password', async () => {
    const response = await agent
    .post(`/login`)
    .send({
      email: "test@test.com",
      password: "pop"
    });

    expect(response.status).toEqual(400);
  });

  it('logout error. no token', async () => {
    const response = await agent
    .post(`/logout`);

    expect(response.status).toEqual(401);
  });

  it('logout error. invalid token', async () => {
    const response = await agent
    .post(`/logout`)
    .set('access-token', 'blablabla');

    expect(response.status).toEqual(500);
  });

  it('showld logout', async () => {
    const response = await agent
    .post(`/logout`)
    .set('access-token', TOKEN);

    expect(response.status).toEqual(200);
  });

  it('delete error. no token', async () => {
    const response = await agent
    .delete(`/users/${ID_USER}`);

    expect(response.status).toEqual(401);
  });

  it('delete error. invalid token', async () => {
    const response = await agent
    .delete(`/users/${ID_USER}`)
    .set('access-token', 'blablabla');

    expect(response.status).toEqual(500);
  });

  it('showld delete user', async () => {
    const response = await agent
    .delete(`/users/${ID_USER}`)
    .set('access-token', TOKEN);

    expect(response.status).toEqual(200);
  });
});
