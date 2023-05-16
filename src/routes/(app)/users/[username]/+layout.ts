import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params }) => {
    const username = params.username

    return {
        username
    }
};