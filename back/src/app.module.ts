import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './services/product/product.service';
import { BuyerService } from './services/buyer/buyer.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BuyerResolver } from './resolvers/buyer/buyer.resolver';
import { ProductModel } from './db/models/product/product.model';
import { BuyerModel } from './db/models/buyer/buyer.model';
import GraphQLJSON from 'graphql-type-json';
import { ProductResolver } from './resolvers/product/product.resolver';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: "sqlite",
    database: "data/dev.db",
    autoLoadEntities: true,
    entities: [BuyerModel,ProductModel], 
    synchronize: true, 
    logging: true,
    migrations: [
      "src/db/migrations/*.ts"
    ],
    migrationsTableName: "poc_amayas_migrations",
  }),
  TypeOrmModule.forFeature([ProductModel, BuyerModel]),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

    definitions: /** environment.production  */false ? null : { path: join('../front/src/app/graphql/graphql.ts'), outputAs: 'interface' },



    resolvers: { JSON: GraphQLJSON },
  }),
  ],
  controllers: [AppController],
  providers: [AppService, BuyerService, ProductService, BuyerResolver, ProductResolver],
})
export class AppModule { }
