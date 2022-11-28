'use strict'

const {v4} = require('uuid');
const AWS = require('aws-sdk');
const { response } = require('express');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'todos'
module.exports.createTodo = async (event) => {
    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);
    const params = {
        TableName: 'todos',
        Item: {
            id: v4(),
            task: data.task,
            done: false,
            createdAt: datetime,
            updatedAt: datetime
        }
    };
    dynamoDb.put(params, (error, data) => {
        if(error) {
            console.error(error);
            throw error;
        }else{
            const response = {
                statusCode: 201,
                body: JSON.stringify(params)
            };
            console.log('response is ', response)
            return response;
        } 
    });
   
    
}