import { Base } from '../../utils/base';
import { Task } from '../../task/entities/task.entity';
export declare class List extends Base {
    name: string;
    tasks: Task[];
}
