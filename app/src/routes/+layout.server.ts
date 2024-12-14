import type { PageLoad } from './$types';

import getMicrositeNodesMap from '$lib/server/queries/getMicrositeNodesMap';
import getSocials from '$lib/server/queries/getSocials';
import inMemoryCache from '$lib/server/inMemoryCache';

export const load: PageLoad = async ({}) => {
	return {
		...(await inMemoryCache(getMicrositeNodesMap)),
		socials: await inMemoryCache(getSocials)
	};
};
