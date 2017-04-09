export interface TaskItem {
	$key?: String
	name: String
	completed: Boolean
	items?: Array<TaskItem>
}
