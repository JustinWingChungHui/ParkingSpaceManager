/** 
 * Allows a user to create a parking space
*/

import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';
import NodeGeocoder from 'node-geocoder';
import AWS from 'aws-sdk';

export async function main(event, context, callback) {

  var data = JSON.parse(event.body);

  // TODO check user has not gone over allowed spaces?

  var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyAT0mkf7f0P6czWESTWqPtDGxYBZoWD0LU', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

var geocoder = NodeGeocoder(options);

  var fullAddress;
  if (data.address2) {
    fullAddress = [data.address1, data.address2, data.city, data.postcode].join(" ")
  } else {
    fullAddress = [data.address1, data.city, data.postcode].join(" ")
  }
 
  // Geocode an address.
  geocoder.geocode(fullAddress, async function(err, res) {

    if (!err) {

      var id = uuid.v1();
      var geoPoint = {
        latitude: res[0].latitude, 
        longitude: res[0].longitude
      };

      var params = {
        TableName: 'parking_spaces',
        Item: {
          id: id,
          userid: event.requestContext.authorizer.claims.sub,
          title: data.title,
          description: data.description,
          address1: data.address1,
          address2: data.address2 ? data.address2 : null,
          city: data.city,
          postcode: data.postcode,
          geoPoint: geoPoint,
          featured_image: data.featured_image ? data.featured_image : null,
          pictures: data.pictures ? data.pictures : null,
          created: new Date().getTime(),
          updated: new Date().getTime(),
          active: true
        },
      };

      try {
        //var result = await dynamoDbLib.call('put', params);
        var result = dynamoDbLib.CreateGeoRecord(params)

        callback(null, success(result));
        // callback(null, success(params.Item));
      }
      catch(e) {
        callback(null, failure({status: false, error: e}));
      }
    }
    else {
      callback(null, failure({status: false, error: err}));
    }
  });
  
};
