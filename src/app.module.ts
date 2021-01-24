import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // Suponhamos aqui que a nossa string de conexão seja 'mongodb://localhost/nest'
  imports: [
      MongooseModule.forRoot('mongodb://localhost/projeto-backend', {useNewUrlParser: true, useUnifiedTopology: true})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
