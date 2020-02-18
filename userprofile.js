import { success } from './response';

export async function handler(event) {
	console.log(event);

	return success({
		message: event
	});
}
