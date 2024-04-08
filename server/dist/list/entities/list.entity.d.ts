import { Base } from '../../utils/base';
import { Task } from '../../task/entities/task.entity';
import { Board } from '../../board/entities/board.entity';
export declare class List extends Base {
    name: string;
    board: Board;
    tasks: Task[];
}
