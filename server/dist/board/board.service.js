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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = require("./entities/board.entity");
let BoardService = class BoardService {
    constructor(boardRepo) {
        this.boardRepo = boardRepo;
    }
    findAll() {
        return this.boardRepo.find();
    }
    async findOne(boardId) {
        if (boardId === 0) {
            return null;
        }
        const board = await this.boardRepo.findOne({
            where: { id: boardId },
            relations: ['lists', 'lists.tasks'],
        });
        if (!board) {
            throw new common_1.NotFoundException('Board not found');
        }
        return board;
    }
    async create(payload) {
        if (!payload.name) {
            throw new common_1.BadRequestException('Name field cannot be empty');
        }
        const isExist = await this.boardRepo.findOne({
            where: { name: payload.name },
        });
        if (isExist) {
            throw new common_1.ConflictException('A Board with this name already exists');
        }
        const newBoard = this.boardRepo.create(payload);
        return this.boardRepo.save(newBoard);
    }
    async update(boardId, changes) {
        if (!changes.name) {
            throw new common_1.BadRequestException('Name field cannot be empty');
        }
        const isExist = await this.boardRepo.findOne({
            where: { name: changes.name },
        });
        if (isExist) {
            throw new common_1.ConflictException('A Board with this name already exists');
        }
        await this.boardRepo.update(boardId, changes);
        return this.findOne(boardId);
    }
    async remove(boardId) {
        const foundBoard = await this.boardRepo.findOne({ where: { id: boardId } });
        if (!foundBoard) {
            throw new common_1.NotFoundException('Board not found');
        }
        await this.boardRepo.delete(boardId);
        return foundBoard;
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BoardService);
//# sourceMappingURL=board.service.js.map