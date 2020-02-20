// eslint-disable-next-line import/no-extraneous-dependencies
import aws from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk';
import { success, failure } from '../../libs/response';

const AWS = AWSXRay.captureAWS(aws);

const kinesis = new AWS.Kinesis();


// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  console.log(event);
  const body = JSON.parse(event.body);

  const userDetails = {
    ...body,
    sourceIp: event.requestContext.identity.sourceIp,
    timestamp: new Date().toISOString(),
    userAgent: event.requestContext.identity.userAgent,
    appId: event.requestContext.identity.cognitoIdentityId
  };

  console.log(userDetails);

  const params = {
    Data: `${JSON.stringify(userDetails)}\n`,
    PartitionKey: body.distinct_id,
    StreamName: process.env.userprofileStream
  };


  try {
    await kinesis.putRecord(params).promise();
    return success({
      message: 1
    });
  } catch (e) {
    return failure({
      message: 0,
      error: e.message
    });
  }
}
