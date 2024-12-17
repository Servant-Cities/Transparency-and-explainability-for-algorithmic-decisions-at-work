import { error } from '@sveltejs/kit';
import { DRUPAL_BASE_URL, DRUPAL_JSON_API_PATH } from '$env/static/private';

const getPartners = async (nodeId: string) => {
    const nodeURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/node/external_content/${nodeId}`;

    // Load partners
	const partnersResponse = await fetch(`${nodeURL}/field_external_content_allies`);
	if (!partnersResponse.ok) {
		error(partnersResponse.status, {message: `Partners response status: ${partnersResponse.status}`});
	}

	const {data: partners} = await partnersResponse.json();

    //Load partners images information
    return Promise.all(
		partners.map(async (partner) => {
			const imageRelation = partner.relationships.field_fieldset_image;
			if (imageRelation?.data?.id) {
				const imageResponse = await fetch(imageRelation.links.related.href);
				if (!imageResponse.ok) {
					error(imageResponse.status, {message: `Partner image response status: ${imageResponse.status}`});
				}

				const { data: image } = await imageResponse.json();

				return {
					html: partner.attributes.field_fieldset_text.processed,
					title: partner.attributes.field_link.title,
					url: partner.attributes.field_link.uri,
					imageURL: `${DRUPAL_BASE_URL}${image.attributes.uri.url}`,
					imageAlt: imageRelation.data.meta.alt
				};
			}
			return {
				html: partner.attributes?.field_fieldset_text?.processed
			};
		})
	);

};

export default getPartners;