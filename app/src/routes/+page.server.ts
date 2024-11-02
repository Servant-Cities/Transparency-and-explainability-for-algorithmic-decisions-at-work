import { env } from '$env/dynamic/private';
import type { PageLoad } from './$types';
const { DRUPAL_API_BASE_URL, DRUPAL_NODES_PATH } = env;

export const load: PageLoad = async ({}) => {
	const nodesURL = `${DRUPAL_API_BASE_URL}${DRUPAL_NODES_PATH}`;

	const response = await fetch(nodesURL);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	const { data } = await response.json();
	const nodes = data.map(({ id, attributes: {title} }) => ({id, title}));

	return {
		nodes
	};
};
