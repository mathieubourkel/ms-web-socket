import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NotifModule } from './notif/notif.module';

@Module({
  imports: [
    NotifModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'dist', 'client'),
    }),
  ],
})
export class AppModule {}