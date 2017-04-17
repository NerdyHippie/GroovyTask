import {TaskItem} from "./task-item.model";

export interface TaskList {
	$key?: string
	name: string
	description?: string
	archived: Boolean
	items?: Array<TaskItem>
	
}
