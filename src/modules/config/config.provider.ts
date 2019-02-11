import { ConfigService } from "./config.service";
import { CONFIG_SEVICE_PROVIDER } from "../constans";

export const providers = [
  {
    provide: CONFIG_SEVICE_PROVIDER,
    useClass: ConfigService,
  },
];
