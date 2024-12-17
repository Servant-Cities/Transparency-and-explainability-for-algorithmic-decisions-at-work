import type { LayoutServerLoad } from './$types';

import getMicrositeNodesMap from '$lib/server/queries/getMicrositeNodesMap';
import getSocials from '$lib/server/queries/getSocials';
import inMemoryCache from '$lib/server/inMemoryCache';

export const prerender = true;

export const load: LayoutServerLoad = async ({}) => {
	return {
		...(await inMemoryCache(getMicrositeNodesMap)),
		socials: await inMemoryCache(getSocials)
	};
};
