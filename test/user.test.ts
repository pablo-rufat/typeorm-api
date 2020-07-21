import * as request from "supertest";
import { app } from "../src";
import { UserType } from "../src/modules/User/user.entity";
import { clearDB } from "../src/utils/db";

const agent = request.agent(app);

beforeAll(done => {
    app.on("appStarted", () => {
        clearDB();
        done();
    });
});

describe('user', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        firstName:"pablo",
        lastName:"rufat",
        email: "test@test.com",
        password: "123456",
        type: UserType.worker,
    });

    expect(response.status).toEqual(200);
    expect(response.body.password).toBeTruthy();
  });
});
