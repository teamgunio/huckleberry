import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const { npm_package_version } = process.env;

describe('AppController (e2e)', () => {
  let app, server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer()
    await app.init();
  });

  it('/ (GET)', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .expect(`Huckleberry v${npm_package_version} says, "Oh, hello."`);
    server.close(done)
  });

  it('/api/version (GET)', (done) => {
    request(server)
      .get('/api/version')
      .expect(200)
      .expect(`${npm_package_version}`);
    server.close(done)
  });

  afterAll(async () => {
    await app.close();
  });
});
