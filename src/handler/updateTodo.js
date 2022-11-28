const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateTodo = (event, context, callback) => {
    const datetime = new Date()
    const data = JSON.parse(event.body);
    const params = {
        TableName: 'todos',
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeValues: {
            ':t': data.task
        },
        UpdateExpression: 'set task = :t'
    };
    dynamoDb.update(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };

        callback(null, response);
        return;
    });
}