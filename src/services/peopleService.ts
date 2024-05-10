import { dynamoDbClient } from '../db/dynamoDbClient';
import { Person } from '../models/person';
import { Select } from "@aws-sdk/client-dynamodb"; 
import { GetCommand, PutCommand, DeleteCommand, QueryCommand, ScanCommandInput, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

class PeopleService {
  private tableName = process.env.PEOPLE_TABLE as string;

  async getPerson(id: string): Promise<Person | null> {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };
    const { Item } = await dynamoDbClient.send(new GetCommand(params));
    return Item as Person;
  }

  async createPerson(personData: Omit<Person, 'id' | 'creado' | 'editado'>): Promise<Person> {
    const newPerson: Person = {
      ...personData,
      id: uuidv4(), 
      creado: new Date().toISOString(), 
      editado: new Date().toISOString() 
    };

    const params = {
      TableName: this.tableName,
      Item: newPerson
    };

    await dynamoDbClient.send(new PutCommand(params));
    return newPerson;
  }

  async deletePerson(id: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };
    await dynamoDbClient.send(new DeleteCommand(params));
  }

  async listPeople(): Promise<Person[]> {
    const params: ScanCommandInput = {
      TableName: this.tableName,
      Select: "ALL_ATTRIBUTES" as Select 
    };
    try {
      const { Items } = await dynamoDbClient.send(new ScanCommand(params));
      return Items as Person[];
    } catch (error) {
      console.error("Error al acceder a AWS DynamoDB", error);
      throw new Error('Error al listar personas desde AWS DynamoDB');
    }
  }

}

export const peopleService = new PeopleService();
