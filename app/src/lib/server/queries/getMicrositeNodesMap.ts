import { error } from '@sveltejs/kit';
import {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
	DRUPAL_MICROSITE_UUID,
	HOME_PAGE_TYPE_ID,
	DEMAND_TYPE_ID,
	ABOUT_PAGE_TYPE_ID,
} from '$env/static/private';

const pageTypes = {
	[HOME_PAGE_TYPE_ID]: 'Homepage',
	[DEMAND_TYPE_ID]: 'Demand',
	[ABOUT_PAGE_TYPE_ID]: 'About'
};

const getMicrositeNodesMap = async () => {
	// Get the nodes associated to this microsite
	const nodesURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/node/external_content?filter[field_microsite.id]=${DRUPAL_MICROSITE_UUID}`;

	const response = await fetch(nodesURL);
	if (!response.ok) {
		error(response.status, {message: `Response status: ${response.status}`});
	}
	const { data } = await response.json();

	const indexesMap: Record<string, number> = {};
	let homepageIndex: number = 0
	let aboutPageIndex: number = 0;
	const processedNodes = await Promise.all(data.map(async ({ id, attributes, relationships }, index) => {
		const imageRelation = relationships.field_media;
		let imageURL
		let imageAlt
		if (imageRelation?.data?.id) {
			const relationResponse = await fetch(imageRelation.links.related.href);
			if (!relationResponse.ok) {
				error(relationResponse.status,{message: `Demand  relation response status: ${relationResponse.status}`});
			}

			const { data: relation } = await relationResponse.json();

			const imageResponse = await fetch(relation.relationships.field_media_image.links.related.href);
			if (!imageResponse.ok) {
				error(imageResponse.status,{message: `Demand image response status: ${imageResponse.status}`});
			}

			const { data: image } = await imageResponse.json();

			imageURL = `${DRUPAL_BASE_URL}${image?.attributes.uri?.url}`,
			imageAlt = relation.relationships.field_media_image.data.meta.alt
		}

		const processedNode = {
			id,
			pageType:
				pageTypes[relationships.field_microsite_page_type.data.meta.drupal_internal__target_id],
			shortTitle: attributes.field_short_title_menu,
			body: attributes.body,
			title: attributes.title,
			metatag: attributes.metatag,
			examplesTitle: attributes.field_example_paragraphs_title,
			imageURL,
			imageAlt
		};
		indexesMap[id] = index;
		switch (processedNode.pageType) {
			case 'Homepage':
				homepageIndex = index;
				break
			case 'About':
				aboutPageIndex = index;
				break
			case 'Demand':
				break;
			default:
				console.warn(
					`Page type ${relationships.field_microsite_page_type.data.meta.drupal_internal__target_id} is not supported, it will be considered as a Demand by default`
				);
		}
		return processedNode;
	}));

	return {
		processedNodes,
		indexesMap,
		homepageIndex,
		aboutPageIndex,
	};
};

export default getMicrositeNodesMap;