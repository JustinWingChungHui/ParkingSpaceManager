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

	/** 
	 * Allows a user to list all their parking spaces they own
	*/

	var main = exports.main = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(event, context, callback) {
	    var params, result;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            params = {
	              TableName: 'parking_spaces',
	              // 'Key' defines the partition key and sort key of the time to be retrieved
	              // - 'userid': federated identity ID of the authenticated user
	              // - 'noteid': path parameter
	              Key: {
	                id: event.pathParameters.id,
	                userid: event.requestContext.authorizer.claims.sub
	              }
	            };
	            _context.prev = 1;
	            _context.next = 4;
	            return dynamoDbLib.call('get', params);

	          case 4:
	            result = _context.sent;

	            if (result.Item) {
	              // Return the retrieved item
	              callback(null, (0, _responseLib.success)(result.Item));
	            } else {
	              callback(null, (0, _responseLib.failure)({ status: false, error: 'Item not found.' }));
	            }
	            _context.next = 11;
	            break;

	          case 8:
	            _context.prev = 8;
	            _context.t0 = _context['catch'](1);

	            callback(null, (0, _responseLib.failure)({ status: false, error: _context.t0 }));

	          case 11:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[1, 8]]);
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