// eslint-disable-next-line import/no-extraneous-dependencies
import aws from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk';

const AWS = AWSXRay.captureAWS(aws);

const docClient = new AWS.DynamoDB.DocumentClient();

// eslint-disable-next-line import/prefer-default-export
export async function call(method, params) {
  return docClient[method](params).promise();
}
