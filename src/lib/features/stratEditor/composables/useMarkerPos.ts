export const useMarkerPos = (
	mouseX: number,
	mouseY: number,
	containerWidth: number,
	containerHeight: number
) => {
	return {
		markerPosX: Math.round(((100 * mouseX) / containerWidth) * 100) / 100,
		markerPosY: Math.round(((100 * mouseY) / containerHeight) * 100) / 100,
	};
};
