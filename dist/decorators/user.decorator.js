"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.User = common_1.createParamDecorator((data, req) => {
    console.log(req.user);
    console.log(data);
    return req.user;
});
//# sourceMappingURL=user.decorator.js.map