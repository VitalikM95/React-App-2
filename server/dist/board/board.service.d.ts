import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
export declare class BoardService {
    private boardRepo;
    constructor(boardRepo: Repository<Board>);
    findAll(): Promise<Board[]>;
    findOne(boardId: number): Promise<Board>;
    create(payload: CreateBoardDto): Promise<Board>;
    update(boardId: number, changes: UpdateBoardDto): Promise<Board>;
    remove(boardId: number): Promise<Board>;
}
