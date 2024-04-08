import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    findAll(): Promise<import("src/board/entities/board.entity").Board[]>;
    findOne(boardId: number): Promise<import("src/board/entities/board.entity").Board>;
    create(payload: CreateBoardDto): Promise<import("src/board/entities/board.entity").Board>;
    update(boardId: number, payload: UpdateBoardDto): Promise<import("src/board/entities/board.entity").Board>;
    remove(boardId: number): Promise<import("src/board/entities/board.entity").Board>;
}
