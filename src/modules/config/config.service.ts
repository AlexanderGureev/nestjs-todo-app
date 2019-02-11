import { Injectable } from "@nestjs/common";
import { IConfig, IMongodbConfig, IConfigService } from "../../interfaces";

@Injectable()
export class ConfigService implements IConfigService {
  private readonly mongodbConfig: IMongodbConfig = {
    username: encodeURIComponent("todoAdmin"),
    password: encodeURIComponent("932jnHsjnS87123"),
    database: "todoDB",
  };
  private readonly config: IConfig = {
    PORT: process.env.PORT || "8080",
    HOST: process.env.HOST || "0.0.0.0",
    ENV: process.env.ENV || "development",
    SESSION_PREFIX: "session",
    JWT_SECRET: "test",
    API_VERSION: "1.0.0",
    MONGO_URI:
      process.env.MONGO_URI ||
      `mongodb://${this.mongodbConfig.username}:${
        this.mongodbConfig.password
      }@localhost:27017/${this.mongodbConfig.database}`,
    REDIS_URI: process.env.REDIS_URI || `redis://localhost:6379`,
  };

  public getString = key => this.config[key];
}
