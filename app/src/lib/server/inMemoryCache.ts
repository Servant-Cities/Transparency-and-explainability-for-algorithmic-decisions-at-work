import fs from 'node:fs';
import { env } from '$env/dynamic/private';
const { PERSIST_CACHE_TIME = '21600000' } = env;
const CACHE_FILE_PATH = './cache.json';

const getPersistedCache = () => {
	const json = fs.readFileSync(CACHE_FILE_PATH, 'utf8');
	return JSON.parse(json);
};

const memoryCache: Record<string, any> = getPersistedCache();

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

// Persists cache every (PERSIST_CACHE_TIME) milliseconds
setInterval(
	() => {
		fs.writeFile(CACHE_FILE_PATH, JSON.stringify(memoryCache), (err) => {
			if (err) {
				console.warn('The following errors happened while trying to write the cache: ', err);
			} else {
				console.info('Cache has been successfully persisted in the cache.json file');
			}
		});
	},
	parseInt(PERSIST_CACHE_TIME, 10)
);
