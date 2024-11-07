import { env } from '$env/dynamic/private';
import type { PageLoad } from './$types';
const {DRUPAL_API_BASE_URL, DRUPAL_NODES_PATH} = env;

export const load: PageLoad = async ({params}) => {
	//Load demand page
	const nodeURL = `${DRUPAL_API_BASE_URL}${DRUPAL_NODES_PATH}/${params.page}`;

	const response = await fetch(nodeURL);

	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	const { data } = await response.json();
	
	const {attributes: {body, title, metatag}} = data;

	//Load examples
	const examplesResponse = await fetch(`${nodeURL}/field_external_content_example_p`)
	if (!examplesResponse.ok) {
		throw new Error(`Response status: ${examplesResponse.status}`);
	}

	const { data: examples } = await examplesResponse.json();


	//Load sub demands
	const subDemandsResponse = await fetch(`${nodeURL}/field_repeating_image_and_text`)
	if (!subDemandsResponse.ok) {
		throw new Error(`Response status: ${subDemandsResponse.status}`);
	}

	const { data: subDemands } = await subDemandsResponse.json();

	return {
		title,
		body,
		metatag,
		examples,
		subDemands
	};
};
