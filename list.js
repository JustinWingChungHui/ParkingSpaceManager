/** 
 * Allows a user to list all their parking spaces they own
*/

import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'parking_spaces',
    IndexName: "userid-title-index",
    KeyConditionExpression: "userid = :userid",
    ExpressionAttributeValues: {
      ":userid": event.requestContext.authorizer.claims.sub
    },
    ProjectionExpression: "id, userid, title, description, featured_image"
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    // Return the matching list of items in response body
    callback(null, success(result.Items));
  }
  catch(e) {
    callback(null, failure({status: false, error: e}));
  }
};
