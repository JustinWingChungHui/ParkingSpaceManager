/** 
 * Allows a user to list all their parking spaces they own
*/

import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'parking_spaces',
    // 'Key' defines the partition key and sort key of the time to be retrieved
    // - 'userid': federated identity ID of the authenticated user
    // - 'noteid': path parameter
    Key: {
      id: event.pathParameters.id,
      userid: event.requestContext.authorizer.claims.sub
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    }
    else {
      callback(null, failure({status: false, error: 'Item not found.'}));
    }
  }
  catch(e) {
    callback(null, failure({status: false, error:e}));
  }
};