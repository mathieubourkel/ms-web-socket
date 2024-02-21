import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from "fs"

const httpsOptions = {
  key: fs.readFileSync(process.env.BACK_URL_KEY, 'utf-8'),
  cert: fs.readFileSync(process.env.BACK_URL_CERT, 'utf-8'),
};

async function bootstrap() {
  let app;
  if (process.env.NODE_ENV == 'production'){
    app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions});
  } else {
    app = await NestFactory.create<NestExpressApplication>(AppModule);
  }
  app.listen(process.env.MS_WEB_SOCKET_PORT, () => {
    console.log(`[MS-WEB-SOCKET] with NATS on ${process.env.MS_WEB_SOCKET_PORT}`)
  });
  
  app.enableShutdownHooks();
}
bootstrap();