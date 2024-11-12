import { env } from '$env/dynamic/private';
import type { PageLoad } from './$types';
const { DRUPAL_API_BASE_URL, DRUPAL_NODES_PATH } = env;

export const load: PageLoad = async ({ params }) => {
	const nodeURL = `${DRUPAL_API_BASE_URL}${DRUPAL_NODES_PATH}/${params.page}`;

	//Load examples
	const examplesResponse = await fetch(`${nodeURL}/field_external_content_example_p`);
	if (!examplesResponse.ok) {
		throw new Error(`Response status: ${examplesResponse.status}`);
	}

	const { data: examples } = await examplesResponse.json();

	//Load sub demands
	const subDemandsResponse = await fetch(`${nodeURL}/field_repeating_image_and_text`);
	if (!subDemandsResponse.ok) {
		throw new Error(`Response status: ${subDemandsResponse.status}`);
	}

	const { data: subDemands } = await subDemandsResponse.json();

	const processedNode = {
		nodeId: params.page,
		subDemands,
		examples
	};

	return processedNode;
};
