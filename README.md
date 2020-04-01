## build

$ sam build

## launch docker
$ docker-compose up -d

## create local dynamodb
$ aws dynamodb create-table --cli-input-json file://db-schema/db-settings.json --endpoint-url http://127.0.0.1:9000 --billing-mode PAY_PER_REQUEST

## local test

* adjust settings/env.json to your environment

#### put sample data 

$ sam local invoke  -e events/event_post.json --env-vars settings/env.json

#### get sample data 

$ sam local invoke  -e events/event_get.json --env-vars settings/env.json



## run API
$ sam local start-api --env-vars settings/env.json

## deploy
$ aws s3 mb s3://sam-exuicore-backet

$ sam package --template-file template.yaml --s3-bucket sam-exuicore-backet --output-template-file packaged.yaml

$ sam deploy --template-file packaged.yaml --stack-name exui-core --capabilities CAPABILITY_IAM
