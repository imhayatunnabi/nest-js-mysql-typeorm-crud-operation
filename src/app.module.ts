import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { UserModule } from './user/user.module';
import { IsUniqueConstraint } from './shared/validation/is-unique-constraint';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'P@$$Wor8',
      database: 'nestjsmysqlcrud',
      synchronize: true,
      entities:[User, Product]
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
