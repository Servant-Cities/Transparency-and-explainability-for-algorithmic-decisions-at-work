import type { PageLoad } from './$types';

import getMicrositeNodesMap from '$lib/server/queries/getMicrositeNodesMap';
import getSocials from '$lib/server/queries/getSocials';

export const load: PageLoad = async ({}) => {
	return {
		...(await getMicrositeNodesMap()),
		socials: await getSocials()
	};
};
