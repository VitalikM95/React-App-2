"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionLogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const actionLog_entity_1 = require("./entities/actionLog.entity");
const actionLog_controller_1 = require("./actionLog.controller");
const actionLog_service_1 = require("./actionLog.service");
let ActionLogModule = class ActionLogModule {
};
exports.ActionLogModule = ActionLogModule;
exports.ActionLogModule = ActionLogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([actionLog_entity_1.ActionLog])],
        controllers: [actionLog_controller_1.ActionLogController],
        providers: [actionLog_service_1.ActionLogService],
        exports: [actionLog_service_1.ActionLogService],
    })
], ActionLogModule);
//# sourceMappingURL=actionLog.module.js.map