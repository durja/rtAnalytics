// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient();

// eslint-disable-next-line import/prefer-default-export
export async function call(method, params) {
  return docClient[method](params).promise();
}


export async function isItemAvailable(params) {
  docClient.query(params).promise();
}
