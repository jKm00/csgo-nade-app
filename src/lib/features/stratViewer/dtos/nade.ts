import type { NadeType } from '$lib/features/stratEditor/types/nade';

export interface Nade {
	name: string;
	type: NadeType;
	lineupX: number;
	lineupY: number;
	impactX: number;
	impactY: number;
	lineupImg: string;
	impactImg: string;
}
