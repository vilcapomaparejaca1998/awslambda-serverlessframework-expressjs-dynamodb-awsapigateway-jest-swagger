"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamoDbClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({ region: 'us-east-1' });
const dynamoDbClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
exports.dynamoDbClient = dynamoDbClient;
