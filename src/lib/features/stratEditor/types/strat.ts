import type { Nade } from './nade';

export interface Strat {
	name: string;
	description: string;
	map: { id: number; name: string };
	side: string;
	position: { id: number; name: string };
	privacy: string;
	team: { id: number; name: string } | undefined;
	nades: Nade[];
}
