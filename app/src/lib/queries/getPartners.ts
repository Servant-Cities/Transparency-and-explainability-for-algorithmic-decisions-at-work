import { env } from '$env/dynamic/private';
const { DRUPAL_BASE_URL, DRUPAL_JSON_API_PATH, DRUPAL_NODES_PATH, DRUPAL_IMAGE_FIELD, DRUPAL_PARTNERS_FIELD } = env;

const getPartners = async (nodeId: string) => {
    const nodeURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}${DRUPAL_NODES_PATH}/${nodeId}`;

    // Load partners
	const partnersResponse = await fetch(`${nodeURL}/${DRUPAL_PARTNERS_FIELD}`);
	if (!partnersResponse.ok) {
		throw new Error(`Partners response status: ${partnersResponse.status}`);
	}

	const {data: partners} = await partnersResponse.json();

    //Load partners images information
    return Promise.all(
		partners.map(async (partner) => {
			const imageRelation = partner.relationships[DRUPAL_IMAGE_FIELD];
			if (imageRelation?.data?.id) {
				const imageResponse = await fetch(imageRelation.links.related.href);
				if (!imageResponse.ok) {
					throw new Error(`Partner image response status: ${imageResponse.status}`);
				}

				const { data: image } = await imageResponse.json();

				return {
					html: partner.attributes.field_fieldset_text.processed,
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