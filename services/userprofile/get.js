import { success } from '../../response';

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  return success({
    body: event
  });
}
