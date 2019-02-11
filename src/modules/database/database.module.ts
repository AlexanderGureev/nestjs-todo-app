import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { providers } from "./database.provider";

@Module({
  imports: [ConfigModule],
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
