import type { Strat } from '@/types/Start';

export type CsgoMap = {
	name: string;
	thumbnail: string;
	radar: string;
	available: boolean;
	strats: Strat[];
};
