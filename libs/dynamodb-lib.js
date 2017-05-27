import AWS from 'aws-sdk';
import  * as ddbGeo from 'dynamodb-geo';

AWS.config.update({region:'eu-west-2'});

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

export function CreateGeoRecord(params) {
 
  var ddb = new AWS.DynamoDB(AWS.Credentials);
  
  var config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'parking_spaces_geo')

  // Instantiate the table manager
  var geoDataManager = new ddbGeo.GeoDataManager(config);

  var putPointRequest = {
    RangeKeyValue: { S: params.Item.id },
    GeoPoint: params.Item.geoPoint,
    PutItemInput: { 
      Item: {
      } 
    } 
  };

  var thisBatch = [];
  thisBatch.push(putPointRequest);

  console.log(thisBatch);

  var result = geoDataManager.batchWritePoints(thisBatch);

  return result;
}