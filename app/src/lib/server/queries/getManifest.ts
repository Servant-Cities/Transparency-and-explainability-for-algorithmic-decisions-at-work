import { error } from '@sveltejs/kit';
import { DRUPAL_BASE_URL, DRUPAL_JSON_API_PATH, DRUPAL_MICROSITE_UUID, HOME_PAGE_TYPE_ID } from '$env/static/private';

const getManifest = async () => {
	const homepageURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/node/external_content?filter[field_microsite.id]=${DRUPAL_MICROSITE_UUID}&filter[field_microsite_page_type.meta.drupal_internal__target_id]=${HOME_PAGE_TYPE_ID}`;

	const response = await fetch(homepageURL);
	if (!response.ok) {
		error(response.status, {message: `Homepage request status: ${response.status}`});
	}
	const { data } = await response.json();
	const homepage = data?.[0]
	if (!homepage) error(404, {message: `Response status: ${response.status}`})

	return {
		name: homepage.attributes.title,
		short_name: homepage.attributes.field_short_title_menu,
		icons: [
			{ src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
			{ src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
		],
		theme_color: '#ffffff',
		background_color: '#ffffff',
		display: 'standalone'
	};
};

export default getManifest;
