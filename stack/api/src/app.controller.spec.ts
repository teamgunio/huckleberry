import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const { npm_package_version } = process.env;

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello from Huckleberry at the right version"', () => {
      expect(appController.getHello()).toBe(`Huckleberry v${npm_package_version} says, "Oh, hello."`);
    });
  });

  describe('version', () => {
    it('should return the proper package version', () => {
      expect(appController.getVersion()).toBe(`${npm_package_version}`);
    });
  });
});
