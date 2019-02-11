import { Module } from "@nestjs/common";
import { providers } from "./config.provider";

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class ConfigModule {}
