import { Module} from '@nestjs/common';
import { NotifModule } from './notif/notif.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    NotifModule,
  ],
})
export class AppModule {}