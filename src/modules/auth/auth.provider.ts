import {
  CONNECTION_PROVIDER,
  USER_MODEL_PROVIDER,
  AUTH_SERVICE_PROVIDER,
} from "../constans";
import { IConnection } from "../../interfaces";
import { UserSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

export const providers = [
  {
    provide: USER_MODEL_PROVIDER,
    useFactory: (connection: IConnection) => {
      return connection.model("users", UserSchema);
    },
    inject: [CONNECTION_PROVIDER],
  },
  {
    provide: AUTH_SERVICE_PROVIDER,
    useClass: AuthService,
  },
];
