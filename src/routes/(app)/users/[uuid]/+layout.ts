import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, parent }) => {
    const uuid = params.uuid

    return {
        uuid
    }
};