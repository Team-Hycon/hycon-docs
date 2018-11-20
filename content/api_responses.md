## API Response

Hycon API calls return HTTP status codes. Some API calls also return JSON response bodies or plaintext that include information about the resource. 

### HTTP success status codes

In the responses, codes in the `2xx` are status codes for successful requests.

Status code | Description 
------------|------------
`200 OK` | The request succeeded (_Default_)
`201 Created` | A `POST` method successfully created a resource.
`202 Accepted` | The server accepted the request and will execute it later.
`204 No Content` | The server successfully executed the method but returns no response body.

### HTTP error status codes

If an API call is invalid, a JSON response body will return with the following response format. Please review the table within each section to view specific return responses. 

Status code | Description 
------------|------------
`400 Bad Request` | The request was unaccceptable, often due to missing a required parameter.
`401 Unauthorized` | Authentication was invalid.
`402 Request Failed` | The parameters were valid but the request failed.
`404 Not Found` | The requested resource doesn't exist.
`409 Conflict` | The request conflicts with another request.
`429 Too Many Requests` | Too many requests hit the API too quickly.
`500, 502, 503, 504 Server Errors` | Something went wrong (server error).

```json
{
    "status": "{See Table}",
    "timestamp": 1523517241,
    "error": "{See Table}",
    "message": "{See Table}"
}
```

**Note:** If a table is not present in the section, the API response is not returned in a standard format.