import inMemoryCache from "$lib/server/inMemoryCache";
import getManifest from "$lib/server/queries/getManifest";

export async function GET() {
    const manifest = await inMemoryCache(getManifest);
	return new Response(JSON.stringify(manifest), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
