import { env } from '$env/dynamic/private';
const {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
	DRUPAL_JSON_API_USERNAME,
	DRUPAL_JSON_API_PASSWORD,
	DRUPAL_SOCIALS_MENU_NAME
} = env;

const getSocials = async () => {
	const socialsURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/menu_link_content/menu_link_content?filter[menu_name]=${DRUPAL_SOCIALS_MENU_NAME}`;
	if (!DRUPAL_JSON_API_USERNAME || !DRUPAL_JSON_API_PASSWORD) {
		console.warn(
			'DRUPAL_JSON_API_USERNAME and DRUPAL_JSON_API_PASSWORD are not configured in .env file, the app might not be able to access socials menu'
		);
	}

	const headers = {
		Authorization: `Basic ${btoa(`${DRUPAL_JSON_API_USERNAME}:${DRUPAL_JSON_API_PASSWORD}`)}`
	};

	const socialsResponse = await fetch(socialsURL, { method: 'GET', redirect: 'follow', headers });
	if (!socialsResponse.ok) {
		console.warn(`Socials response status: ${socialsResponse.status}`);
		return [];
	}

	return socialsResponse.json().then(({ data }) =>
		data.map(
			({
				attributes: {
					title,
					link: { uri }
				}
			}) => ({ title, url: uri })
		)
	);
};

export default getSocials;
