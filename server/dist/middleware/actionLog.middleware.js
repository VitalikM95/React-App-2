"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionLogMiddleware = void 0;
const common_1 = require("@nestjs/common");
const actionLog_service_1 = require("../actionLog/actionLog.service");
let ActionLogMiddleware = class ActionLogMiddleware {
    constructor(actionLogService) {
        this.actionLogService = actionLogService;
    }
    async use(req, res, next) {
        const { method, url, body } = req;
        const action = this.getActionFromRequest(method, url);
        if (method === 'GET') {
            return next();
        }
        try {
            const name = this.getDetailsFromParams(body, url);
            await this.actionLogService.logAction(action, name, this.getEntityTypeFromUrl(url));
        }
        catch (error) {
            console.error('Error logging action:', error);
        }
        next();
    }
    getActionFromRequest(method, url) {
        let action = '';
        if (method === 'POST') {
            if (url.includes('/tasks')) {
                action = 'Task created';
            }
            else if (url.includes('/lists')) {
                action = 'List created';
            }
        }
        else if (method === 'PATCH') {
            if (url.includes('/tasks')) {
                action = 'Task updated';
            }
            else if (url.includes('/lists')) {
                action = 'List updated';
            }
        }
        else if (method === 'DELETE') {
            if (url.includes('/tasks')) {
                action = 'Task deleted';
            }
            else if (url.includes('/lists')) {
                action = 'List deleted';
            }
        }
        return action;
    }
    getDetailsFromParams(body, url) {
        if (url.includes('/tasks')) {
            return body;
        }
        else if (url.includes('/lists')) {
            return body;
        }
        return '';
    }
    getEntityTypeFromUrl(url) {
        if (url.includes('/tasks')) {
            return 'task';
        }
        else if (url.includes('/lists')) {
            return 'list';
        }
        return '';
    }
};
exports.ActionLogMiddleware = ActionLogMiddleware;
exports.ActionLogMiddleware = ActionLogMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [actionLog_service_1.ActionLogService])
], ActionLogMiddleware);
//# sourceMappingURL=actionLog.middleware.js.map