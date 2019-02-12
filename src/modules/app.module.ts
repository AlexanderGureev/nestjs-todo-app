import { Module, Inject } from "@nestjs/common";
import { TodoModule } from "./todo/todo.module";
import { IConfigService } from "src/interfaces";
import { CONFIG_SEVICE_PROVIDER } from "./constans";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [TodoModule, ConfigModule],
})
export class AppModule {
  constructor(
    @Inject(CONFIG_SEVICE_PROVIDER)
    private readonly configService: IConfigService,
  ) {}

  public getPort = () => this.configService.get("PORT");
}
