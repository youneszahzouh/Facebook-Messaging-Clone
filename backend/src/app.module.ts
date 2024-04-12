import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './modules/user/user.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConversationModule } from './modules/conversation/conversation.module';
@Module({
  imports: [
    UserModule,
    ConversationModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    ServeStaticModule.forRoot({ rootPath: 'uploads', serveRoot: '/uploads' }),

    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload'
      })
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
