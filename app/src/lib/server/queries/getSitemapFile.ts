import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import formatTitleURL from '$lib/utils/formatTitleURL';

const {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
	DRUPAL_MICROSITE_UUID,
	HOME_PAGE_TYPE_ID,
	DEMAND_TYPE_ID,
	ABOUT_PAGE_TYPE_ID
} = env;

const pageTypes = {
	[HOME_PAGE_TYPE_ID]: 'Homepage',
	[DEMAND_TYPE_ID]: 'Demand',
	[ABOUT_PAGE_TYPE_ID]: 'About'
};

const getSitemapFile = async (): Promise<string> => {
	// Get the nodes associated to this microsite
	const nodesURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/node/external_content?filter[field_microsite.id]=${DRUPAL_MICROSITE_UUID}`;

	const response = await fetch(nodesURL);
	if (!response.ok) {
		error(response.status, { message: `Response status: ${response.status}` });
	}
	const { data } = await response.json();

	let homepage,
		demands = [],
		aboutPage;

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
				break
			case 'About':
				aboutPage = processedNode;
				break
			case 'Demand':
				demands.push(processedNode);
				break;
			default:
				console.warn(
					`Page type ${relationships.field_microsite_page_type.data.meta.drupal_internal__target_id} is not supported, it will be considered as a Demand by default`
				);
		}
	});

	return `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
		>
			<url>
				<loc>/</loc>
				<lastmod>${homepage.lastModified}</lastmod>
				<changefreq>daily</changefreq>
				<priority>0.7</priority>
			</url>
			${demands.map(
				({ shortTitle, id, lastModified }) => `
				<url>
					<loc>/${formatTitleURL(shortTitle)}/${id}</loc>
					<lastmod>${lastModified}</lastmod>
					<changefreq>daily</changefreq>
					<priority>1</priority>
				</url>`
			).join('')}
			<url>
				<loc>/${formatTitleURL(aboutPage.title)}/${aboutPage.id}</loc>
				<lastmod>${aboutPage.lastModified}</lastmod>
				<changefreq>daily</changefreq>
				<priority>0.3</priority>
			</url>
		</urlset>`;
};

export default getSitemapFile;
