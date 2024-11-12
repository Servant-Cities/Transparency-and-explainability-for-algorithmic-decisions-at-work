import { env } from '$env/dynamic/private';
import type { PageLoad } from './$types';
const { DRUPAL_API_BASE_URL, DRUPAL_NODES_PATH, DRUPAL_EXAMPLES_FIELD, DRUPAL_SUBDEMANDS_FIELD } = env;

export const load: PageLoad = async ({ params }) => {
	const nodeURL = `${DRUPAL_API_BASE_URL}${DRUPAL_NODES_PATH}/${params.page}`;

	//Load sub demands
	const subDemandsResponse = await fetch(`${nodeURL}/${DRUPAL_SUBDEMANDS_FIELD}`);
	if (!subDemandsResponse.ok) {
		throw new Error(`Response status: ${subDemandsResponse.status}`);
	}

	const { data: subDemands } = await subDemandsResponse.json();

	//Load examples
	const examplesResponse = await fetch(`${nodeURL}/${DRUPAL_EXAMPLES_FIELD}`);
	if (!examplesResponse.ok) {
		throw new Error(`Response status: ${examplesResponse.status}`);
	}

	const { data: examples } = await examplesResponse.json();

	const processedNode = {
		nodeId: params.page,
		subDemands,
		examples
	};

	return processedNode;
};
