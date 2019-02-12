"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app.module");
const constans_1 = require("./modules/constans");
const swagger_1 = require("@nestjs/swagger");
const express = require("express");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const instanseExpress = express();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, instanseExpress);
        const configService = app.get(constans_1.CONFIG_SEVICE_PROVIDER);
        app.setGlobalPrefix(configService.get("API_VERSION"));
        const options = new swagger_1.DocumentBuilder()
            .setTitle("Todos api example")
            .setDescription("The todos API description")
            .setVersion("1.0")
            .addTag("todos")
            .setBasePath("v1")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup("api", app, document);
        yield app.listen(configService.get("PORT"));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map