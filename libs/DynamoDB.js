import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

export async function call(method, params) {
	return docClient[method](params).promise();
}
