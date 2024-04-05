"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const task_module_1 = require("./task/task.module");
const list_module_1 = require("./list/list.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const actionLog_module_1 = require("./actionLog/actionLog.module");
const actionLog_middleware_1 = require("./middleware/actionLog.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(actionLog_middleware_1.ActionLogMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (ConfigService) => ({
                    type: 'postgres',
                    host: ConfigService.get('DB_HOST'),
                    port: ConfigService.get('DB_PORT'),
                    username: ConfigService.get('DB_USER'),
                    password: ConfigService.get('DB_PASSWORD'),
                    database: ConfigService.get('DB_NAME'),
                    synchronize: true,
                    entities: [__dirname + '/**/*.entity{.js, .ts}'],
                }),
                inject: [config_1.ConfigService],
            }),
            task_module_1.TaskModule,
            list_module_1.ListModule,
            actionLog_module_1.ActionLogModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map