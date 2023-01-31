import type { Nade } from "@/types/Nade";

export type Lineup = {
	id: number;
	name: string;
	desc: string;
	nade: Nade;
	throwCoordinateX: number;
	throwCoordinateY: number;
	landCoordinateX: number;
	landCoordinateY: number;
	videoPath: string;
};
