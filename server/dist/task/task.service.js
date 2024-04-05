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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const list_entity_1 = require("../list/entities/list.entity");
let TaskService = class TaskService {
    constructor(taskRepo, listRepo) {
        this.taskRepo = taskRepo;
        this.listRepo = listRepo;
    }
    findAll() {
        return this.taskRepo.find({
            relations: ['list'],
        });
    }
    async findOne(id) {
        if (id === 0) {
            return null;
        }
        const options = {
            where: { id },
            relations: ['list'],
        };
        const foundTask = await this.taskRepo.findOne(options);
        if (!foundTask) {
            throw new common_1.NotFoundException(`Task not found`);
        }
        return foundTask;
    }
    async create(payload) {
        if (!payload.name) {
            throw new common_1.BadRequestException('Name field cannot be empty');
        }
        const list = await this.listRepo.findOne({
            where: { name: payload.status },
        });
        if (!list) {
            const newList = this.listRepo.create({ name: payload.status });
            await this.listRepo.save(newList);
            const newData = { ...payload, list: newList };
            const newTask = this.taskRepo.create(newData);
            return this.taskRepo.save(newTask);
        }
        else {
            const newTask = this.taskRepo.create({ ...payload, list });
            return this.taskRepo.save(newTask);
        }
    }
    async update(id, changes) {
        const list = await this.listRepo.findOne({
            where: { name: changes.status },
        });
        if (!list) {
            const newList = this.listRepo.create({ name: changes.status });
            await this.listRepo.save(newList);
            const newData = { ...changes, list: newList };
            await this.taskRepo.update(id, newData);
        }
        else {
            const newData = { ...changes, list: list };
            await this.taskRepo.update(id, newData);
        }
        const options = {
            where: { id },
            relations: ['list'],
        };
        return this.taskRepo.findOne(options);
    }
    async remove(id) {
        const foundTask = await this.taskRepo.findOne({ where: { id } });
        if (!foundTask) {
            throw new common_1.NotFoundException(`Task not found`);
        }
        await this.taskRepo.delete(id);
        return foundTask;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_2.InjectRepository)(list_entity_1.List)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map