import { base } from '$app/paths';
import inMemoryCache from "$lib/server/inMemoryCache";
import getNodesEntries from "$lib/server/queries/getNodesEntries";
import formatTitleURL from '$lib/utils/formatTitleURL';

export const prerender = true;

export async function GET() {
    const {homepage, demands, aboutPage} = await inMemoryCache(getNodesEntries)


	const sitemap = `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
		>
			<url>
				<loc>${base}/</loc>
				<lastmod>${homepage.lastModified}</lastmod>
				<changefreq>daily</changefreq>
				<priority>0.7</priority>
			</url>
			${demands.map(
				({ shortTitle, id, lastModified }) => `
				<url>
					<loc>${base}/${formatTitleURL(shortTitle)}/${id}</loc>
					<lastmod>${lastModified}</lastmod>
					<changefreq>daily</changefreq>
					<priority>1</priority>
				</url>`
			).join('')}
			<url>
				<loc>${base}/${formatTitleURL(aboutPage.title)}/${aboutPage.id}</loc>
				<lastmod>${aboutPage.lastModified}</lastmod>
				<changefreq>daily</changefreq>
				<priority>0.3</priority>
			</url>
		</urlset>`

	return new Response(
		sitemap.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}