import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { providers } from "./auth.provider";
import { AuthController } from "./auth.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [...providers],
  exports: [...providers],
})
export class AuthModule {}
