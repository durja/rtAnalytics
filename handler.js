/* eslint-disable no-tabs */
export default async function handler(event) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
					'Go Serverless v1.0! Your function executed successfully!',
        input: event
      },
      null,
      2
    )
  };
}
