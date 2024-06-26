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
exports.List = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../../utils/base");
const task_entity_1 = require("../../task/entities/task.entity");
const board_entity_1 = require("../../board/entities/board.entity");
let List = class List extends base_1.Base {
};
exports.List = List;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], List.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_entity_1.Board, (board) => board.lists, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'board_id' }),
    __metadata("design:type", board_entity_1.Board)
], List.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.list, { cascade: true }),
    __metadata("design:type", Array)
], List.prototype, "tasks", void 0);
exports.List = List = __decorate([
    (0, typeorm_1.Entity)()
], List);
//# sourceMappingURL=list.entity.js.map