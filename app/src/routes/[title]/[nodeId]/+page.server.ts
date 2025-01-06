import { CACHE_CONTROL_TIME } from '$env/static/private';
import type { PageServerLoad } from './$types';
import type { EntryGenerator } from './$types';

import getNodesEntries from '$lib/server/queries/getNodesEntries';
import getExamples from '$lib/server/queries/getExamples';
import getPartners from '$lib/server/queries/getPartners';
import getSubdemands from '$lib/server/queries/getSubdemands';
import formatTitleURL from '$lib/utils/formatTitleURL';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const { demands, aboutPage } = await getNodesEntries();
	
	return [
		...demands.map(({id, shortTitle}) => ({title: formatTitleURL(shortTitle), nodeId: id})),
		{title: formatTitleURL(aboutPage.title), nodeId: aboutPage.id}
	];
};

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	setHeaders({
		'cache-control': `max-age=${CACHE_CONTROL_TIME || '900'}`
	});

	return {
		subDemands: getSubdemands({nodeId: params.nodeId}),
		examples: getExamples({nodeId: params.nodeId}),
		partners: getPartners({nodeId: params.nodeId})
	};
};
