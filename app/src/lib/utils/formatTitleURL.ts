const formatTitleURL = (title: string) => {
	console.log(title);
	return title.replace(/\/| |\?|,/g, '-');
};

export default formatTitleURL;
