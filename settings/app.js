// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

const AWS = require('aws-sdk');
const endpoint = process.env.DYNAMODB_ENDPOINT;
const config = endpoint !== "" ? { endpoint } : { region: 'ap-northeast-1' };
console.log(config);
const documentClient = new AWS.DynamoDB.DocumentClient(config);
const tableName = "settings";

exports.lambdaHandler = async (event, context) => {
  try {
    switch(event.httpMethod){
      case "GET":
        console.log("recieve get request");
        const params = {
          TableName: tableName,
          KeyConditionExpression: "#ID = :ID",
          ExpressionAttributeNames: {"#ID": "uid"},
          ExpressionAttributeValues: {":ID": "1"}
        }
        console.log(params);
        const result = await documentClient.query(params).promise();

        return {
          'statusCode': 200,
          'body': JSON.stringify(result)
        }
      case POST:
      default:
    }
  } catch (err) {
      console.log(err);
      return err;
  }
};
