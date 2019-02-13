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
    COOKIE_SECRET: "test",
    API_VERSION: "v1",
    MONGO_URI: process.env.MONGO_URI || this.getMongoConnectionUri(),
    REDIS_URI: process.env.REDIS_URI || `redis://localhost:6379`,
  };
  private getMongoConnectionUri() {
    const { username, password, database } = this.mongodbConfig;
    return `mongodb://${username}:${password}@localhost:27017/${database}`;
  }
  public get = (key: string): string => this.config[key];
}
