import { CONNECTION_PROVIDER, CONFIG_SEVICE_PROVIDER } from "../constans";
import { IConfigService } from "../../interfaces";
import * as mongoose from "mongoose";

export const providers = [
  {
    provide: CONNECTION_PROVIDER,
    useFactory: async (configService: IConfigService) => {
      const uri = configService.getString("MONGO_URI");
      return await mongoose.connect(uri, { useNewUrlParser: true });
    },
    inject: [CONFIG_SEVICE_PROVIDER],
  },
];
