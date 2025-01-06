import getManifest from "$lib/server/queries/getManifest";

export const prerender = true;

export async function GET() {
    const manifest = await getManifest();
	return new Response(JSON.stringify(manifest), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
