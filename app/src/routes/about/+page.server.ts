import type { PageLoad } from './$types';

//todo: get data from the proper node
export const load: PageLoad = async () => {
	
	const mockPartners = [
		{
			logoURL: '/logo.png',
			url: '/',
			description: `<p><a href="https://www.workerinfoexchange.org/">Worker Info Exchange (WIE)</a> is a London-based non-profit organisation founded by James Farrar, an activist for worker rights in the gig economy, who took Uber to the UK Supreme Court and won. The win forced Uber to recognise drivers as workers instead of self-employed contractors. Farrar understands that data is power, especially as Uber reportedly keeps workers in the dark about how the company makes decisions about work allocation, identity verification, and firing.</p>`
		},
		{
			logoURL: '/logo.png',
			url: '/',
			description: `<p><a href="https://www.adcu.org.uk/">App Drivers and Couriers Union (ADCU)</a> was set up in 2013 and is the UK's largest trade union for licensed private hire drivers and couriers. The Union is concerned that drivers are mistreated by their employers and aims to protect their rights, demand change, and ensure that their collective voice is heard.</p>`
		}
	]

	return {
		partners: mockPartners,
	};
};
