import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkflowsModule } from './workflows/workflows.module';
import { ExecutionsService } from './executions/executions.service';
import { ExecutionsController } from './executions/executions.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, 
      synchronize: false
    }),
    WorkflowsModule,
  ],
  controllers: [AppController, ExecutionsController],
  providers: [AppService, ExecutionsService],
})
export class AppModule { }
