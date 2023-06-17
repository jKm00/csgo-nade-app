export enum NadeType {
	SMOKE = 'SMOKE',
	FLASH = 'FLASH',
	MOLOTOV = 'MOLOTOV',
	HE = 'HE',
	DECOY = 'DECOY',
}

export interface Nade {
	name: string;
	type: string;
	lineupX: number;
	lineupY: number;
	impactPointX: number;
	impactPointY: number;
}
