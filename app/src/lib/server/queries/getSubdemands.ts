import { error } from '@sveltejs/kit';
import {
	DRUPAL_BASE_URL,
	DRUPAL_JSON_API_PATH,
} from '$env/static/private';

const getSubdemands = async (nodeId: string) => {
	const nodeURL = `${DRUPAL_BASE_URL}${DRUPAL_JSON_API_PATH}/node/external_content/${nodeId}`;

	const subDemandsResponse = await fetch(`${nodeURL}/field_repeating_image_and_text`);
	if (!subDemandsResponse.ok) {
		error(subDemandsResponse.status, {message:`Subdemands response status: ${subDemandsResponse.status}`});
	}

	return subDemandsResponse.json().then(({ data: subDemands }) => subDemands.map(({ attributes }) => ({
		html: attributes?.field_fieldset_text?.processed
	})));
};

export default getSubdemands;
