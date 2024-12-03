import { env } from '$env/dynamic/private';
const {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
} = env;

const getExamples = async (nodeId: string) => {
    const nodeURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/node/external_content/${nodeId}`;
    
    //Load examples
	const examplesResponse = await fetch(`${nodeURL}/field_external_content_example_p`);
	if (!examplesResponse.ok) {
		throw new Error(`Examples response status: ${examplesResponse.status}`);
	}

	const { data: examples } = await examplesResponse.json();

	//Load examples images information
	return Promise.all(
		examples.map(async (example) => {
			const imageRelation = example.relationships.field_fieldset_image;
			if (imageRelation?.data?.id) {
				const imageResponse = await fetch(imageRelation.links.related.href);
				if (!imageResponse.ok) {
					throw new Error(`Example image response status: ${imageResponse.status}`);
				}

				const { data: image } = await imageResponse.json();

				return {
					html: example.attributes.field_fieldset_text?.processed,
					imageURL: `${DRUPAL_BASE_URL}${image?.attributes.uri?.url}`,
					imageAlt: imageRelation.data.meta.alt
				};
			}
			return {
				html: example.attributes?.field_fieldset_text?.processed
			};
		})
	);
}

export default getExamples;