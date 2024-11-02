import { env } from '$env/dynamic/private';
import type { PageLoad } from './$types';
const {DRUPAL_API_BASE_URL, DRUPAL_NODES_PATH} = env;

export const load: PageLoad = async ({params}) => {
	const nodeURL = `${DRUPAL_API_BASE_URL}${DRUPAL_NODES_PATH}/${params.page}`;

	const response = await fetch(nodeURL);

	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	const { data } = await response.json();
	
	const {attributes: {body, title, metatag}, relationships} = data;

	return {
		title,
		body,
		metatag,
		relationships
	};
};
