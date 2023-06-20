export const POST = async ({ request }) => {
	const form = await request.formData();

	const numberOfNades = form.get('numberOfNades') as unknown as number;
	let nades: File[] = [];
	for (let i = 0; i < numberOfNades; i++) {
		// Extract all nade info
		const lineupImg = form.get(`nadeLineupImg${i}`) as unknown as File;
		const impactImg = form.get(`nadeImpactImg${i}`);

		nades = [...nades, lineupImg];
	}

	// Create strat

	// Create nades

	// Upload images

	return new Response('OK', { status: 200 });
};
