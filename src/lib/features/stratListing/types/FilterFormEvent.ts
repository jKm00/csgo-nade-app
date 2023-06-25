export interface FilterFormEvent {
	stratName: string | null;
	teamName: string | null;
	position: { name: string; id: number } | null;
	teamSide: string | null;
}
