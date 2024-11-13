import type { PageServerLoad } from '../$types';

import getExamples from '$lib/queries/getExamples';
import getPartners from '$lib/queries/getPartners';
import getSubdemands from '$lib/queries/getSubdemands';

export const load: PageServerLoad = async ({ params }) => {
	return {
		nodeId: params.nodeId,
		subDemands: getSubdemands(params.nodeId),
		examples: getExamples(params.nodeId),
		partners: await getPartners(params.nodeId),
	};
};
