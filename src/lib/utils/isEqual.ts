export const isEqual = (obj1: any, obj2: any) => {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key in keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	return true;
};
