import { env } from '$env/dynamic/private';
const {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
	DRUPAL_JSON_API_USERNAME,
	DRUPAL_JSON_API_PASSWORD
} = env;

const getSocials = async () => {
	const socialsURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/menu_link_content/menu_link_content`;
	const headers = new Headers();
	if (DRUPAL_JSON_API_USERNAME && DRUPAL_JSON_API_PASSWORD) {
		headers.set(
			'Authorization',
			'Basic ' +
				Buffer.from(DRUPAL_JSON_API_USERNAME + ':' + DRUPAL_JSON_API_PASSWORD).toString('base64')
		);
	} else {
		console.warn(
			'DRUPAL_JSON_API_USERNAME and DRUPAL_JSON_API_PASSWORD are not configured in .env file, the app might not be able to access socials menu'
		);
	}

	const socialsResponse = await fetch(socialsURL);
	if (!socialsResponse.ok) {
		console.warn(`Socials response status: ${socialsResponse.status}`);
		return [];
	}

	const socialsData = await  socialsResponse.json();

	const socialsLinksResponse = await fetch(socialsData?.links?.self?.href, { headers });
	
	const data = await socialsLinksResponse.json();

	return data;
};

export default getSocials;
