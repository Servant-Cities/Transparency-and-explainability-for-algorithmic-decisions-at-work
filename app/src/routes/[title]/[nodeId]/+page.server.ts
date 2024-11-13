import { env } from '$env/dynamic/private';
import type { PageLoad } from '../$types';
const {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
	DRUPAL_NODES_PATH,
	DRUPAL_EXAMPLES_FIELD,
	DRUPAL_SUBDEMANDS_FIELD,
	DRUPAL_EXAMPLE_IMAGE_FIELD
} = env;

export const load: PageLoad = async ({ params }) => {
	const nodeURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}${DRUPAL_NODES_PATH}/${params.nodeId}`;

	//Load sub demands
	const subDemandsResponse = await fetch(`${nodeURL}/${DRUPAL_SUBDEMANDS_FIELD}`);
	if (!subDemandsResponse.ok) {
		throw new Error(`Subdemands response status: ${subDemandsResponse.status}`);
	}

	const { data: subDemands } = await subDemandsResponse.json();

	const processedSubDemands = subDemands.map(({ attributes }) => ({
		html: attributes?.field_fieldset_text?.processed
	}));

	//Load examples
	const examplesResponse = await fetch(`${nodeURL}/${DRUPAL_EXAMPLES_FIELD}`);
	if (!examplesResponse.ok) {
		throw new Error(`Examples response status: ${examplesResponse.status}`);
	}

	const { data: examples } = await examplesResponse.json();

	//Load examples images information
	const processedExamples = await Promise.all(
		examples.map(async (example) => {
			const imageRelation = example.relationships[DRUPAL_EXAMPLE_IMAGE_FIELD];
			if (imageRelation?.data?.id) {
				const imageResponse = await fetch(imageRelation.links.related.href);
				if (!imageResponse.ok) {
					throw new Error(`Example image response status: ${imageResponse.status}`);
				}

				const { data: image } = await imageResponse.json();

				return {
					html: example.attributes.field_fieldset_text.processed,
					imageURL: `${DRUPAL_BASE_URL}${image.attributes.uri.url}`,
					imageAlt: imageRelation.data.meta.alt
				};
			}
			return {
				html: example.attributes?.field_fieldset_text?.processed
			};
		})
	);

	const processedNode = {
		nodeId: params.nodeId,
		subDemands: processedSubDemands,
		examples: processedExamples
	};

	return processedNode;
};
