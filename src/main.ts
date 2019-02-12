import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { CONFIG_SEVICE_PROVIDER } from "./modules/constans";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as express from "express";

async function bootstrap() {
  const instanseExpress = express();
  const app = await NestFactory.create(AppModule, instanseExpress);

  const configService = app.get(CONFIG_SEVICE_PROVIDER);
  app.setGlobalPrefix(configService.get("API_VERSION"));

  const options = new DocumentBuilder()
    .setTitle("Todos api example")
    .setDescription("The todos API description")
    .setVersion("1.0")
    .addTag("todos")
    .setBasePath("v1")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(configService.get("PORT"));
}
bootstrap();
