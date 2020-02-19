
import * as dynamoDB from '../../libs/DynamoDB';


// eslint-disable-next-line import/prefer-default-export
export async function handler(event) {
  await Promise.all(event.Records.map(async (record) => {
    const data = JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString('ascii'));

    const params = {
      TableName: process.env.tableName,
      KeyConditionExpression: '#appId = :a and #userId = :u',
      ExpressionAttributeNames: {
        '#appId': 'appId',
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':a': data.appId,
        ':u': data.distinct_id
      }
    };

    console.log(params);

    try {
      const result = await dynamoDB.call('query', params);

      if (result.Count === 0) {
        const item = {
          appId: data.appId,
          userId: data.distinct_id
        };

        delete data.appId;
        delete data.distinct_id;

        await dynamoDB.call('put', {
          TableName: process.env.tableName,
          Item: {
            ...item,
            meta: data,
            createdAt: Date.now()
          }
        });
      } else {
        const key = {
          appId: data.appId,
          userId: data.distinct_id
        };
        delete data.distinct_id;
        delete data.appId;
        await dynamoDB.call('update', {
          TableName: process.env.tableName,
          Key: key,
          UpdateExpression: 'set meta=:d',
          ExpressionAttributeValues: {
            ':d': data
          }
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  }));
}
