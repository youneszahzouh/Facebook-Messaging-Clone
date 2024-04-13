import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './modules/user/user.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MessageModule } from './modules/message/message.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    AuthModule,
    ConversationModule,
    MessageModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    ServeStaticModule.forRoot({ rootPath: 'uploads', serveRoot: '/uploads' }),

    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload'
      })
    }),

    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
