/** 
 * Allows a user to create a parking space
*/

import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {

  // TODO check user has not gone over allowed spaces?

  // TODO geocode address https://developers.google.com/maps/documentation/javascript/geocoding

  const data = JSON.parse(event.body);
  const params = {
    TableName: 'parking_spaces',    
    Item: {
      id: uuid.v1(),
      userid: event.requestContext.authorizer.claims.sub,      
      title: data.title,
      description: data.description,
      address1: data.address1,
      address2: data.address2 ? data.address2 : null,
      city: data.city,
      postcode: data.postcode,
      featured_image: data.featured_image ? data.featured_image : null,
      pictures: data.pictures ? data.pictures : null,
      created: new Date().getTime(),
      updated: new Date().getTime(),
      active: true
    },
  };

  try {
    const result = await dynamoDbLib.call('put', params);
    callback(null, success(params.Item));
  }
  catch(e) {
    callback(null, failure({status: false, error: e}));
  }
};