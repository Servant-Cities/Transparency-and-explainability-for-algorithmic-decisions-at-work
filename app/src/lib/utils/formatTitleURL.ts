const formatTitleURL = (title: string) => {
	return title.replace(/\/| |\?|,/g, '-');
};

export default formatTitleURL;
