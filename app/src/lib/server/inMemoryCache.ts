const memoryCache: Record<string, any> = {};

export default async function inMemoryCache<Params, Return>(
	query: (args?: Params) => Promise<Return>,
	params?: Params
): Promise<Return> {
	const key = `${query.name}(${params ? params : ''})`;

	const handler: Promise<Return> = new Promise((resolve, reject) =>
		query(params)
			.then((result: Return) => {
				memoryCache[key] = result;
				resolve(result);
			})
			.catch((error: Error) => {
				memoryCache[key] ? resolve(memoryCache[key]) : reject(error);
			})
	);

	return handler;
}
