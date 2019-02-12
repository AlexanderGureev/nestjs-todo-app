import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { CONFIG_SEVICE_PROVIDER } from "./modules/constans";
import * as express from "express";

async function bootstrap() {
  const instanseExpress = express();
  const app = await NestFactory.create(AppModule, instanseExpress);

  const configService = app.get(CONFIG_SEVICE_PROVIDER);
  app.setGlobalPrefix(configService.get("API_VERSION"));
  await app.listen(configService.get("PORT"));
}
bootstrap();
