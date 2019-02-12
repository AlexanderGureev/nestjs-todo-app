import { IConfigService } from "../../interfaces";
export declare class ConfigService implements IConfigService {
    private readonly mongodbConfig;
    private readonly config;
    private getMongoConnectionUri;
    get: (key: any) => any;
}
