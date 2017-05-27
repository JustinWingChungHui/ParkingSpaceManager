(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.main = undefined;

	var _regenerator = __webpack_require__(1);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(2);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var main = exports.main = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event, context, callback) {
	    var data, params, result;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            data = JSON.parse(event.body);

	            // TODO geocode address https://developers.google.com/maps/documentation/javascript/geocoding

	            params = {
	              TableName: 'parking_spaces',
	              // 'Key' defines the partition key and sort key of the time to be updated
	              // - 'userId': User Pool sub of the authenticated user
	              // - 'noteId': path parameter
	              Key: {
	                userid: event.requestContext.authorizer.claims.sub,
	                id: event.pathParameters.id
	              },
	              // 'UpdateExpression' defines the attributes to be updated
	              // 'ExpressionAttributeValues' defines the value in the update expression
	              UpdateExpression: 'SET title = :title, \n                        description = :description,\n                        address1 = :address1,\n                        address2 = :address2,\n                        city = :city,\n                        postcode = :postcode,\n                        featured_image = :featured_image,\n                        pictures = :pictures,\n                        updated = :updated,\n                        active = :active\n                    ',
	              ExpressionAttributeValues: {
	                ':title': data.title ? data.title : null,
	                ':description': data.description ? data.description : null,
	                ':address1': data.address1 ? data.address1 : null,
	                ':address2': data.address2 ? data.address2 : null,
	                ':city': data.city ? data.city : null,
	                ':postcode': data.postcode ? data.postcode : null,
	                ':featured_image': data.featured_image ? data.featured_image : null,
	                ':pictures': data.pictures ? data.pictures : null,
	                ':updated': new Date().getTime(),
	                ':active': data.active ? data.active : null
	              },
	              ReturnValues: 'ALL_NEW'
	            };
	            _context.prev = 2;
	            _context.next = 5;
	            return dynamoDbLib.call('update', params);

	          case 5:
	            result = _context.sent;

	            callback(null, (0, _responseLib.success)({ status: true }));
	            _context.next = 12;
	            break;

	          case 9:
	            _context.prev = 9;
	            _context.t0 = _context['catch'](2);

	            callback(null, (0, _responseLib.failure)({ status: false, error: _context.t0 }));

	          case 12:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[2, 9]]);
	  }));

	  return function main(_x, _x2, _x3) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var _dynamodbLib = __webpack_require__(4);

	var dynamoDbLib = _interopRequireWildcard(_dynamodbLib);

	var _responseLib = __webpack_require__(7);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.call = call;
	exports.CreateGeoRecord = CreateGeoRecord;

	var _awsSdk = __webpack_require__(5);

	var _awsSdk2 = _interopRequireDefault(_awsSdk);

	var _dynamodbGeo = __webpack_require__(6);

	var ddbGeo = _interopRequireWildcard(_dynamodbGeo);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_awsSdk2.default.config.update({ region: 'eu-west-2' });

	function call(action, params) {
	  var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

	  return dynamoDb[action](params).promise();
	}

	function CreateGeoRecord(params) {

	  var ddb = new _awsSdk2.default.DynamoDB(_awsSdk2.default.Credentials);

	  var config = new ddbGeo.GeoDataManagerConfiguration(ddb, 'parking_spaces_geo');

	  // Instantiate the table manager
	  var geoDataManager = new ddbGeo.GeoDataManager(config);

	  var putPointRequest = {
	    RangeKeyValue: { S: params.Item.id },
	    GeoPoint: params.Item.geoPoint,
	    PutItemInput: {
	      Item: {}
	    }
	  };

	  var thisBatch = [];
	  thisBatch.push(putPointRequest);

	  console.log(thisBatch);

	  var result = geoDataManager.batchWritePoints(thisBatch);

	  return result;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("aws-sdk");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("dynamodb-geo");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(8);

	var _stringify2 = _interopRequireDefault(_stringify);

	exports.success = success;
	exports.failure = failure;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function success(body) {
	  return buildResponse(200, body);
	}

	function failure(body) {
	  return buildResponse(500, body);
	}

	function buildResponse(statusCode, body) {
	  return {
	    statusCode: statusCode,
	    headers: {
	      'Access-Control-Allow-Origin': '*',
	      'Access-Control-Allow-Credentials': true
	    },
	    body: (0, _stringify2.default)(body)
	  };
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }
/******/ ])));