import { NadeType } from '$lib/features/stratEditor/types/nade';

export const useMarkerColor = (type: NadeType | undefined) => {
	let color: string;

	switch (type) {
		case NadeType.SMOKE:
			color = 'rgb(248 113 113)';
			break;
		case NadeType.FLASH:
			color = 'rgb(96 165 250)';
			break;
		case NadeType.MOLOTOV:
			color = 'rgb(251 146 60)';
			break;
		case NadeType.HE:
			color = 'rgb(74 222 128)';
			break;
		case NadeType.DECOY:
			color = 'rgb(45 212 191)';
			break;
		default:
			color = 'rgb(248 113 113)';
			break;
	}

	return color;
};
