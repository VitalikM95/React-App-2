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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const list_entity_1 = require("./entities/list.entity");
const task_entity_1 = require("../task/entities/task.entity");
const board_entity_1 = require("../board/entities/board.entity");
let ListService = class ListService {
    constructor(taskRepo, listRepo, boardRepo) {
        this.taskRepo = taskRepo;
        this.listRepo = listRepo;
        this.boardRepo = boardRepo;
    }
    async getListsByBoard(boardId) {
        if (boardId === 0) {
            return [];
        }
        const board = await this.boardRepo.findOne({
            where: { id: boardId },
        });
        if (!board) {
            throw new common_1.NotFoundException('Board not found');
        }
        const lists = await this.listRepo.find({
            where: { board: { id: boardId } },
            relations: ['tasks'],
        });
        return lists;
    }
    async create(payload) {
        if (!payload.name) {
            throw new common_1.BadRequestException('Name field cannot be empty');
        }
        const { boardId, name } = payload;
        const board = await this.boardRepo.findOne({
            where: { id: boardId },
        });
        if (!board) {
            throw new common_1.NotFoundException('Board not found');
        }
        const isExist = await this.listRepo.findOne({
            where: { name, board: { id: boardId } },
        });
        if (isExist) {
            throw new common_1.ConflictException('A List with this name already exists');
        }
        const newList = this.listRepo.create({ name, board });
        return this.listRepo.save(newList);
    }
    async update(listId, changes) {
        if (!changes.name) {
            throw new common_1.BadRequestException('Name field cannot be empty');
        }
        const { boardId, ...otherChanges } = changes;
        const isExist = await this.listRepo.findOne({
            where: { name: otherChanges.name, board: { id: boardId } },
        });
        if (isExist) {
            throw new common_1.ConflictException('A List with this name already exists');
        }
        const list = await this.listRepo.findOne({
            where: { id: listId },
            relations: ['tasks'],
        });
        if (!list) {
            throw new common_1.BadRequestException('List not found');
        }
        await this.listRepo.update(listId, { name: otherChanges.name });
        for (const task of list.tasks) {
            task.status = otherChanges.name;
            await this.taskRepo.save(task);
        }
        return this.listRepo.findOne({ where: { id: listId } });
    }
    async remove(listId) {
        const foundList = await this.listRepo.findOne({ where: { id: listId } });
        if (!foundList) {
            throw new common_1.NotFoundException(`List not found`);
        }
        await this.listRepo.delete(listId);
        return foundList;
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(list_entity_1.List)),
    __param(2, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ListService);
//# sourceMappingURL=list.service.js.map