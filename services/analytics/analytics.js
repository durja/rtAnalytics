// eslint-disable-next-line import/no-extraneous-dependencies
import aws from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk';
import { success, failure } from '../../libs/response';

const AWS = AWSXRay.captureAWS(aws);

const kinesis = new AWS.Kinesis({ apiVersion: '2013-12-02' });

// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  let data;

  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return failure({
      message: 'failed',
      detail: 'malformed json'
    });
  }

  if (!data.events) {
    return failure({
      message: 'failed',
      detail: 'no events'
    });
  }

  const records = [];

  for (const item of data.events) {
    const record = {};
    item.sourceIp = event.requestContext.identity.sourceIp;
    item.timestamp = new Date().toISOString();
    item.userAgent = event.requestContext.identity.userAgent;
    record.Data = `${JSON.stringify(item)}\n`;
    record.PartitionKey = item.distinct_id;
    records.push(record);
  }

  const params = {
    Records: records,
    StreamName: process.env.analyticsStream
  };

  try {
    await kinesis.putRecords(params).promise();
    return success({
      result: 1
    });
  } catch (e) {
    return failure({
      result: 0,
      message: e.message
    });
  }
}
