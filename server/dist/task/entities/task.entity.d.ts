import { List } from '../../list/entities/list.entity';
import { Base } from '../../utils/base';
export declare class Task extends Base {
    name: string;
    description: string;
    dueDate: Date;
    priority: string;
    status: string;
    list: List;
}
