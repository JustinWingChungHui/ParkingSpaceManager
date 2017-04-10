import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  // TODO geocode address https://developers.google.com/maps/documentation/javascript/geocoding

  const params = {
    TableName: 'parking_spaces',
    // 'Key' defines the partition key and sort key of the time to be updated
    // - 'userId': User Pool sub of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userid: event.requestContext.authorizer.claims.sub,
      id: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: `SET title = :title, 
                        description = :description,
                        address1 = :address1,
                        address2 = :address2,
                        city = :city,
                        postcode = :postcode,
                        featured_image = :featured_image,
                        pictures = :pictures,
                        updatedAt = :updatedAt,
                        active = :active
                    `,
    ExpressionAttributeValues: {
      ':title': data.title ? data.title : null,
      ':description': data.description ? data.description : null,
      ':address1': data.address1 ? data.address1 : null,
      ':address2': data.address2 ? data.address2 : null,
      ':city': data.city ? data.city : null,
      ':postcode': data.postcode ? data.postcode : null,
      ':featured_image': data.featured_image ? data.featured_image : null,
      ':pictures': data.pictures ? data.pictures : null,
      ':updatedAt': new Date().getTime(),
      ':active': data.active ? data.active : null
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDbLib.call('update', params);
    callback(null, success({status: true}));
  }
  catch(e) {
    callback(null, failure({status: false, error: e}));
  }
};