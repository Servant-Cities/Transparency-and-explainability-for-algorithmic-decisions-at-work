const memoryCache: Record<string, any> = {};

const inMemoryCache = async (query: (args: any) => any, nodeId?: string) => {
	const key = `${query.name}(${nodeId ? nodeId : ''})`;

	const handler = new Promise((resolve, reject) =>
		query(nodeId)
			.then((result: any) => {
				memoryCache[key] = result;
				resolve(result);
			})
			.catch((error: Error) => {
				memoryCache[key] ? resolve(memoryCache[key]) : reject(error);
			})
	);

	return handler;
};

export default inMemoryCache;
