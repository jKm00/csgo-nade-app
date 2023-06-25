export interface User {
	id: number;
	uuid: string;
	name: string;
	username: string;
	profile_picture: {
		filename: string;
	};
}
