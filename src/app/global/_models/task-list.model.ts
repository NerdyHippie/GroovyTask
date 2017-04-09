import {TaskItem} from "./task-item.model";

export interface TaskList {
	$key?: String
	name: String
	description?: String
	archived: Boolean
	items?: Array<TaskItem>
	
}
