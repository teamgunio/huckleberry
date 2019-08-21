import { Injectable } from '@nestjs/common';

const { npm_package_version:version } = process.env;

@Injectable()
export class AppService {
  getVersion(): string {
    return `${version}`;
  }
  getHello(): string {
    return `Huckleberry v${version} says, "Oh, hello."`;
  }
}
