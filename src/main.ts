import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.use(cors());
  app.use(bodyParser.json());

  await app.listen(8080);
}
bootstrap();
