export enum NadeType {
	SMOKE = 'SMOKE',
	FLASH = 'FLASH',
	MOLOTOV = 'MOLOTOV',
	HE = 'HE',
	DECOY = 'DECOY',
}

export interface Nade {
	id: number;
	name: string;
	notes: string;
	type: string | undefined;
	lineupX: number;
	lineupY: number;
	impactPointX: number | undefined;
	impactPointY: number | undefined;
	lineupImg: File | undefined;
	impactImg: File | undefined;
}
