import type { Strat } from '@/types/Strat';

export type CsgoMap = {
	id: number;
	name: string;
	thumbnail: string;
	radar: string;
	available: boolean;
	strats: Strat[];
};
