const memoryCache: Record<string, any> = {};

const inMemoryCache = async (query: (args: any) => any, args?: any) => {
	const key = `${query.name}(${args ?? JSON.stringify(args)})`;

	const handler = new Promise((resolve, reject) =>
		query(args)
			.then((result: any) => {
				memoryCache[key] = result;
				resolve(result);
			})
			.catch((error: Error) => {
				memoryCache[key] ? resolve(memoryCache[key]) : reject(error);
			})
	);

	console.log(memoryCache);
	return handler;
};

export default inMemoryCache;
