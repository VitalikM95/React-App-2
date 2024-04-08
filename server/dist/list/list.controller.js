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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const list_service_1 = require("./list.service");
const create_list_dto_1 = require("./dto/create-list.dto");
const update_list_dto_1 = require("./dto/update-list.dto");
let ListController = class ListController {
    constructor(listService) {
        this.listService = listService;
    }
    getListsByBoard(boardId) {
        return this.listService.getListsByBoard(+boardId);
    }
    create(payload) {
        return this.listService.create(payload);
    }
    update(listId, payload) {
        return this.listService.update(+listId, payload);
    }
    remove(listId) {
        return this.listService.remove(+listId);
    }
};
exports.ListController = ListController;
__decorate([
    (0, common_1.Get)(':boardId'),
    __param(0, (0, common_1.Param)('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "getListsByBoard", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_list_dto_1.CreateListDto]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':listId'),
    __param(0, (0, common_1.Param)('listId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_list_dto_1.UpdateListDto]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':listId'),
    __param(0, (0, common_1.Param)('listId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "remove", null);
exports.ListController = ListController = __decorate([
    (0, common_1.Controller)('lists'),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListController);
//# sourceMappingURL=list.controller.js.map