import { env } from '$env/dynamic/private';

const {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
	DRUPAL_NODES_PATH,
	DRUPAL_SUBDEMANDS_FIELD,
} = env;

const getSubdemands = async (nodeId: string) => {
	const nodeURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}${DRUPAL_NODES_PATH}/${nodeId}`;

	const subDemandsResponse = await fetch(`${nodeURL}/${DRUPAL_SUBDEMANDS_FIELD}`);
	if (!subDemandsResponse.ok) {
		throw new Error(`Subdemands response status: ${subDemandsResponse.status}`);
	}

	return subDemandsResponse.json().then(({ data: subDemands }) => subDemands.map(({ attributes }) => ({
		html: attributes?.field_fieldset_text?.processed
	})));
};

export default getSubdemands;
