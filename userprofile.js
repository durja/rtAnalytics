import { success } from './response';

export default async function handler(event) {
  console.log(event);

  return success({
    message: event
  });
}
