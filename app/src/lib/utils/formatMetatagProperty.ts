import { PUBLIC_CAMPAIGN_ORGANIZER_URL } from '$env/static/public';

const formatMetatagProperty = ([key, value]: [string, string]) => {
	const pathArray = value.split('/');
	if (pathArray.includes('fav')) {
		return `${key}="${PUBLIC_CAMPAIGN_ORGANIZER_URL}/${pathArray[pathArray.length]}"`;
	}
	if (value.startsWith('/sites')) {
		return `${key}="${PUBLIC_CAMPAIGN_ORGANIZER_URL}${value}"`;
	}
	return `${key}="${value}"`;
};

export default formatMetatagProperty;
