export interface User {
	email: string
	uid?: string
	$key?: string
	firstName?: string
	lastName?: string
	displayName?: string
	photoURL?: string
	provider?: string
	dateCreated?: string
	admin?: Boolean
	providers?: any
}
