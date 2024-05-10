"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.peopleService = void 0;
const dynamoDbClient_1 = require("../db/dynamoDbClient");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const uuid_1 = require("uuid");
class PeopleService {
    constructor() {
        this.tableName = process.env.PEOPLE_TABLE;
    }
    async getPerson(id) {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };
        const { Item } = await dynamoDbClient_1.dynamoDbClient.send(new lib_dynamodb_1.GetCommand(params));
        return Item;
    }
    async createPerson(personData) {
        const newPerson = {
            ...personData,
            id: (0, uuid_1.v4)(),
            creado: new Date().toISOString(),
            editado: new Date().toISOString()
        };
        const params = {
            TableName: this.tableName,
            Item: newPerson
        };
        await dynamoDbClient_1.dynamoDbClient.send(new lib_dynamodb_1.PutCommand(params));
        return newPerson;
    }
    async deletePerson(id) {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };
        await dynamoDbClient_1.dynamoDbClient.send(new lib_dynamodb_1.DeleteCommand(params));
    }
    async listPeople() {
        const params = {
            TableName: this.tableName,
            Select: "ALL_ATTRIBUTES"
        };
        try {
            const { Items } = await dynamoDbClient_1.dynamoDbClient.send(new lib_dynamodb_1.ScanCommand(params));
            return Items;
        }
        catch (error) {
            console.error("Error al acceder a AWS DynamoDB", error);
            throw new Error('Error al listar personas desde AWS DynamoDB');
        }
    }
}
exports.peopleService = new PeopleService();
