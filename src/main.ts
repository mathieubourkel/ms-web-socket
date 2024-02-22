import {  NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from "fs"



async function bootstrap() {
  let app;
  if (process.env.NODE_ENV == 'production'){
    const httpsOptions = {
      key: fs.readFileSync(process.env.BACK_URL_KEY, 'utf-8'),
      cert: fs.readFileSync(process.env.BACK_URL_CERT, 'utf-8'),
    };
    app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions});
  } else {
    app = await NestFactory.create<NestExpressApplication>(AppModule);
  }

  app.enableShutdownHooks();

  await app.listen(process.env.MS_WEB_SOCKET_PORT, () => {
    console.log(`[MS-WEB-SOCKET]  port:${process.env.MS_WEB_SOCKET_PORT}`)
  });
  
  
}
bootstrap();