import getSitemapFile from "$lib/server/queries/getSitemapFile";

export const prerender = true;

export async function GET() {
    const sitemap = await getSitemapFile();
	return new Response(
		sitemap.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}