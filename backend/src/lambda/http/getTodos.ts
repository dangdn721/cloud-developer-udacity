import 'source-map-support/register'
import { getUserTodos } from '../../businessLogic/todos';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { createLogger } from '../../utils/logger'
import { sendMessageToAllClient } from '../utils';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  createLogger('Processing event: '+ event)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const result = await getUserTodos(jwtToken)

  sendMessageToAllClient(`Get a todo successfully!!!`)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({items :result})
    }
  

}
