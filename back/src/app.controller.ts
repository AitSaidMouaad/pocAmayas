import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import AppDataSource from './data-source';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        AppDataSource.synchronize();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
