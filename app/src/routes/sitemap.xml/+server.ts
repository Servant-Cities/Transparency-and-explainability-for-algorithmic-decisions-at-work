import inMemoryCache from "$lib/server/inMemoryCache";
import getSitemapFile from "$lib/server/queries/getSitemapFile";

export async function GET() {
    const sitemap = await inMemoryCache(getSitemapFile);
	return new Response(
		sitemap.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}