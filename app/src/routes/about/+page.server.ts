import { env } from '$env/dynamic/private';
import type { PageLoad } from './$types';
const {DRUPAL_API_BASE_URL, DRUPAL_NODES_PATH, ABOUT_PAGE_NODE_UUID} = env;

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
		title: 'About the campaign',
		content: `
		<p>
			What if your boss was an algorithm? 
		</p>
		<p>
			What would you do if your employer suddenly fired you or reduced your pay without telling you why? And without being willing to give you a reason when you ask for one? This is not science fiction or some far-fetched reality.
		</p>
		<p>
			Millions of people worldwide are working in the gig economy sector for companies like Uber, Deliveroo, Bolt, Just Eat… And this could be the future of work for people working outside the gig economy, as surveillance technologies are creeping into the workplace – and the ‘work-from-home place’ in particular.
		</p>
		<p>
			To counter the surveillance that employers are subjecting workers to, and the power imbalance that workers face, Privacy International (PI) has partnered with Worker Info Exchange and App Drivers and Couriers Union, who have been working on these issues and fighting to protect rights of gig economy workers.
		</p>
		<p>
			To understand the issues faced by gig economy workers it is important to first understand how companies collect and use data to make decisions about their workers, including how work is allocated, how much money drivers are able to earn, and more.
		</p>
		<h2>Who we are working with</h2>
		<p>
			To counter the surveillance that employers are subjecting workers to, and the power imbalance that workers face, we have partnered with <a href="https://www.workerinfoexchange.org/">Worker Info Exchange</a> and <a href="https://www.adcu.org.uk/">App Drivers and Couriers Union</a>, who have been working on these issues and fighting to protect rights of gig economy workers.
		</p>`
	};
};
