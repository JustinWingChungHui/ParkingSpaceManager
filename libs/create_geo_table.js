import AWS from 'aws-sdk';
import  * as ddbGeo from 'dynamodb-geo';
import uuid from 'uuid';


export function CreateTable() {

    // Set up AWS
    AWS.config.update({region:'eu-west-2'});

    // Use a local DB for the example.
    const ddb = new AWS.DynamoDB(AWS.Credentials);

    // Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
    const config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'parking_spaces_geo');

    // Instantiate the table manager
    const capitalsManager = new ddbGeo.GeoDataManager(config);

    // Use GeoTableUtil to help construct a CreateTableInput.
    const createTableInput = ddbGeo.GeoTableUtil.getCreateTableRequest(config);

    // Tweak the schema as desired
    createTableInput.ProvisionedThroughput.ReadCapacityUnits = 2;

    console.log('Creating table with schema:');
    console.dir(createTableInput, { depth: null });

    // Create the table
    ddb.createTable(createTableInput).promise()
        // Wait for it to become ready
        .then(function () { return ddb.waitFor('tableExists', { TableName: config.tableName }).promise() });
        
}