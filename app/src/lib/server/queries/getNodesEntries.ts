import { error } from '@sveltejs/kit';
import {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
	DRUPAL_MICROSITE_UUID,
	HOME_PAGE_TYPE_ID,
	DEMAND_TYPE_ID,
	ABOUT_PAGE_TYPE_ID
} from '$env/static/private';

const pageTypes = {
	[HOME_PAGE_TYPE_ID]: 'Homepage',
	[DEMAND_TYPE_ID]: 'Demand',
	[ABOUT_PAGE_TYPE_ID]: 'About'
};

interface NodeSummary extends Record<string, string> {
	id: string;
	pageType: string;
	title: string;
	shortTitle: string;
	lastModified: string;
}

const getSitemapFile = async (): Promise<{
	homepage: NodeSummary;
	demands: Array<NodeSummary>;
	aboutPage: NodeSummary;
}> => {
	// Get the nodes associated to this microsite
	const nodesURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/node/external_content?filter[field_microsite.id]=${DRUPAL_MICROSITE_UUID}`;

	const response = await fetch(nodesURL);
	if (!response.ok) {
		error(response.status, { message: `Response status: ${response.status}` });
	}
	const { data } = await response.json();

	let homepage: NodeSummary,
		demands: Array<NodeSummary> = [],
		aboutPage: NodeSummary;

	data.forEach(({ id, attributes, relationships }) => {
		const processedNode = {
			id,
			pageType:
				pageTypes[relationships.field_microsite_page_type.data.meta.drupal_internal__target_id],
			title: attributes.title,
			shortTitle: attributes.field_short_title_menu,
			lastModified: attributes.changed
		};
		switch (processedNode.pageType) {
			case 'Homepage':
				homepage = processedNode;
				break;
			case 'About':
				aboutPage = processedNode;
				break;
			case 'Demand':
				demands.push(processedNode);
				break;
			default:
				console.warn(
					`Page type ${relationships.field_microsite_page_type.data.meta.drupal_internal__target_id} is not supported, it will be considered as a Demand by default`
				);
		}
	});

	return { homepage, demands, aboutPage };
};

export default getSitemapFile;
