import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserController} from "./Controllers/Users/user.controller";
import {UserService} from "./Services/Users/user.service";
import {UserRepository} from "./Mongo/Repository/users.repository";
import {UserSchema} from "./Mongo/Schemas/user.schema";

@Module({
  // Suponhamos aqui que a nossa string de conexão seja 'mongodb://localhost/nest'
  imports: [
      MongooseModule.forRoot('mongodb://localhost/projeto-backend', {useNewUrlParser: true, useUnifiedTopology: true}),
      MongooseModule.forFeature([
          {name : 'user', schema : UserSchema}
      ])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
