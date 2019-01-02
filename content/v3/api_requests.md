## API Request

To construct a REST API request, combine the following components:

Component | Description 
------------|------------
HTTP Method | `GET`. Requests data from resource. <br/>`POST`. Submits data to a resource.
URL to API | `http://{address}:{port}/api/`. 
URI to resource | The resource to query, submit data to, update, or delete information. For example, `v3/address`
HTTP request header | Required for operations with request body. <br/> Generally, `'Content-Type: application/json'` is used.
JSON request body | Required for most operations. 

#### This sample queries a specific address:

```curl
$ curl -X GET http://localhost:2442/api/v3/address\?address\=H497fHm8gbPZxaXySKpV17a7beYBF9Ut3 \
-H 'Content-Type: application/json;charset=utf-8'
```