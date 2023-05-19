import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, data }) => {
    const uuid = params.uuid

    return {
        ...data,
        uuid
    }
};