export const load = async () => {
	const mockLazyResponse = async () => {
		return new Promise((res) => {
			setTimeout(() => {
				res('Hello there');
			}, 3000);
		});
	};

	return {
		lazy: {
			greeting: mockLazyResponse(),
		},
	};
};
