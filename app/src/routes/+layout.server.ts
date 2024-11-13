import { env } from '$env/dynamic/private';
import type { PageLoad } from './$types';
const {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
	DRUPAL_MICROSITE_UUID,
	DRUPAL_PAGE_TYPE_FIELD,
	HOME_PAGE_TYPE_ID,
	DEMAND_TYPE_ID,
	ABOUT_PAGE_TYPE_ID,
	DRUPAL_NODES_PATH,
	DRUPAL_EXAMPLES_TITLE_FIELD
} = env;

const pageTypes = {
	[HOME_PAGE_TYPE_ID]: 'Homepage',
	[DEMAND_TYPE_ID]: 'Demand',
	[ABOUT_PAGE_TYPE_ID]: 'About'
};

export const load: PageLoad = async ({}) => {
	// Get the nodes associated to this microsite
	const nodesURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}${DRUPAL_NODES_PATH}?filter[field_microsite.id]=${DRUPAL_MICROSITE_UUID}`;

	const response = await fetch(nodesURL);
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}
	const { data } = await response.json();

	// Segregate nodes per page type
	let homepage; // Max one, the last in the list overides any other
	let demands = [];
	let about; // Max one, the last in the list overides any other

	data.forEach(({ id, attributes, relationships }) => {
		const processedNode = {
			id,
			pageType:
				pageTypes[relationships[DRUPAL_PAGE_TYPE_FIELD].data.meta.drupal_internal__target_id],
			body: attributes.body,
			title: attributes.title,
			metatag: attributes.metatag,
			examplesTitle: attributes[DRUPAL_EXAMPLES_TITLE_FIELD]
		};
		switch (processedNode.pageType) {
			case 'Homepage':
				homepage = processedNode;
				break;
			case 'Demand':
				demands.push(processedNode);
				break;
			case 'About':
				about = processedNode;
				break;
			default:
				console.warn(
					`Page type ${relationships[DRUPAL_PAGE_TYPE_FIELD].data.meta.drupal_internal__target_id} is not supported.`
				);
		}
	});

	/*
	const socialsURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/menu_link_content/menu_link_content`;

	const socialsResponse = await fetch(socialsURL);
	if (!socialsResponse.ok) {
		throw new Error(`Socials response status: ${socialsResponse.status}`);
	}
	const { data: socials } = await socialsResponse.json();
*/
	return {
		homepage,
		demands,
		about,
		//socials,
		//data
	};
};
