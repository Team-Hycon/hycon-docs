## API Request

To construct a REST API request, combine the following components:

Component | Description 
------------|------------
HTTP Method | `GET`. Requests data from resource. <br/>`POST`. Submits data to a resource.
URL to API | `http://{address}:{port}/api/`. 
URI to resource | The resource to query, submit data to, update, or delete information. For example, `v1/wallet`
HTTP request header | Required for operations with request body. <br/> Generally, `'Content-Type: application/json'` is used.
JSON request body | Required for most operations. 

#### This sample request creates a wallet:

```curl
$ curl -X POST http://localhost:2442/api/v1/wallet \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
	  "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
	  "language": "english"
    }'
```