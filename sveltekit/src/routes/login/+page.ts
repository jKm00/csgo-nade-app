import type { PageLoad } from "./$types"

export type OutputProps = { path: string | null }

export const load: PageLoad<OutputProps> = ({ url, params, data }): OutputProps => {
  let path = url.searchParams.get('path');

  return {
    path: path
  };
}