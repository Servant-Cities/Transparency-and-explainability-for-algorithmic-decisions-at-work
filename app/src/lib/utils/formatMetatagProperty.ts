import { PUBLIC_CAMPAIGN_ORGANIZER_URL } from '$env/static/public';

const formatMetatagProperty = ([key, value]: [string, string]) => {
    if (value.startsWith('/sites')) {
        return `${key}="${PUBLIC_CAMPAIGN_ORGANIZER_URL}${value}"`
    }
	return `${key}="${value}"`;
};

export default formatMetatagProperty;
