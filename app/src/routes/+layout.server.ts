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
	DRUPAL_EXAMPLES_TITLE_FIELD,
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

	// Match titles with nodes indexes to give pages a comprehensive URL
	const indexesMap = {};
	let homepageIndex;
	let aboutPageIndex;
	const processedNodes = await Promise.all(data.map(async ({ id, attributes, relationships }, index) => {
		const imageRelation = relationships.field_media;
		let imageURL
		let imageAlt
		if (imageRelation?.data?.id) {
			const relationResponse = await fetch(imageRelation.links.related.href);
			if (!relationResponse.ok) {
				throw new Error(`Demand image response status: ${relationResponse.status}`);
			}

			const { data: relation } = await relationResponse.json();

			const imageResponse = await fetch(relation.relationships.field_media_image.links.related.href);
			if (!imageResponse.ok) {
				throw new Error(`Demand image response status: ${imageResponse.status}`);
			}

			const { data: image } = await imageResponse.json();

			imageURL = `${DRUPAL_BASE_URL}${image?.attributes.uri?.url}`,
			imageAlt = relation.relationships.field_media_image.data.meta.alt
		}

		const processedNode = {
			id,
			pageType:
				pageTypes[relationships[DRUPAL_PAGE_TYPE_FIELD].data.meta.drupal_internal__target_id],
			body: attributes.body,
			title: attributes.title,
			metatag: attributes.metatag,
			examplesTitle: attributes[DRUPAL_EXAMPLES_TITLE_FIELD],
			imageURL,
			imageAlt
		};
		indexesMap[id] = index;
		switch (processedNode.pageType) {
			case 'Homepage':
				homepageIndex = index;
			case 'About':
				aboutPageIndex = index;
			case 'Demand':
				break;
			default:
				console.warn(
					`Page type ${relationships[DRUPAL_PAGE_TYPE_FIELD].data.meta.drupal_internal__target_id} is not supported, it will be considered as a Demand by default`
				);
		}
		return processedNode;
	}));

	/*
	const socialsURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/menu_link_content/menu_link_content`;

	const socialsResponse = await fetch(socialsURL);
	if (!socialsResponse.ok) {
		throw new Error(`Socials response status: ${socialsResponse.status}`);
	}
	const { data: socials } = await socialsResponse.json();
*/

	return {
		processedNodes,
		indexesMap,
		homepageIndex,
		aboutPageIndex,
		//socials,
	};
};
