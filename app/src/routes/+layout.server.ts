import type { LayoutServerLoad } from './$types';

import getMicrositeNodesMap from '$lib/server/queries/getMicrositeNodesMap';
import getSocials from '$lib/server/queries/getSocials';

export const prerender = true;

export const load: LayoutServerLoad = async ({}) => {
	return {
		...(await getMicrositeNodesMap()),
		socials: await getSocials()
	};
};
