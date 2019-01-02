# Network API

## Prerequisites (/network)

Requests related to **Network** should be requested by specifying the root path as `/network`.
The below REST API routes may require the following to provide accurate responses: 

- A fully synchronized Hycon node

## Getting market information

Request total supply and current circulating supply of Hycon on the mainnet.

```endpoint
GET /api/v3/network/marketcap
```

#### Example request
```curl
curl -X GET http://localhost:2442/api/v3/network/marketcap \
-H 'Content-Type: application/json;charset=utf-8'
```

### Response (market cap info) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
**totalSupply** | string | The total supply of HYCON coin.
**circulatingSupply** | string | The total circulation of HYCON coin.

#### Response (Success)
```json
{
    "totalSupply": "2981678617.031239208",
    "circulatingSupply": "1754778074.74372453"
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `NOT_FOUND` | Tip information is undefined in consensus.
500 | `INTERNAL_SERVER_ERROR` | Internal Server Error occurs Error: There is no txdb to query the burn amount.


## Getting list of peers

Request information about peers connected to the local node.

There are two ways to pass parameters: through `query` parameters and through `url` parameters.


### Query method (peer list)

```endpoint
GET /api/v3/network?{count}
```

#### Example request

```curl
curl -X GET http://localhost:2442/api/v3/network?count=2 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`count` | Yes | The number of peers to return

### URL method (peer list)

```endpoint
GET /api/v3/network/:count
```

#### Example request

```curl
curl -X GET http://localhost:2442/api/v3/network/3 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`count` | Yes | The number of peers to return

### Response (peer list) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
**host** | string | The host value of the peer.
**port** | number | The port value of the peer.
**successOutCount** | number | The number of successful outbound connections.
**successInCount** | number | The number of successful inbound connections.
**lastSeen** | number | Timestamp when last connected.
**failCount** | number | The number of times the connection failed.
**lastAttempt** | number | The timestamp of the last connection attempt.
**active** | number | If the peer is active. If this value is greater than 1, it is activated; else, deactivated.

#### Response (Success) 

```json
[
    {
        "host": "47.52.114.209",
        "port": 8148,
        "successOutCount": 748,
        "successInCount": 0,
        "lastSeen": 1545878160297,
        "failCount": 0,
        "lastAttempt": 1545878160162,
        "active": 2
    },
    ...
]
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | The parameter value passed as count is invalid.


## Getting information of specific peer

Request information about specific peer connected to the local node.

There are two ways to pass parameters: through `query` parameters and through `url` parameters.


### Query method (specified peer)

```endpoint
GET /api/v3/network?{host}
```

#### Example request

```curl
curl -X GET http://localhost:2442/api/v3/network?host=54.188.174.194 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`host` | Yes | The host information of the peer to be queried.

### URL method (specified peer)

```endpoint
GET /api/v3/network/:host
```

#### Example request

```curl
curl -X GET http://localhost:2442/api/v3/network/54.188.174.194 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`host` | Yes | The host information of the peer to be queried.

### Response (specified peer) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------**host** | string | The host value of the peer.
**port** | number | The port value of the peer.
**successOutCount** | number | The number of successful outbound connections.
**successInCount** | number | The number of successful inbound connections.
**lastSeen** | number | Timestamp when last connected.
**failCount** | number | The number of times the connection failed.
**lastAttempt** | number | The timestamp of the last connection attempt.
**active** | number | If the peer is active. If this value is greater than 1, it is activated; else, deactivated.

#### Response (Success) 

```json
{
    "host": "54.188.174.194",
    "port": 8148,
    "successOutCount": 47,
    "successInCount": 0,
    "lastSeen": 1545876193615,
    "failCount": 0,
    "lastAttempt": 1545876191618,
    "active": 2
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | should provide count or host as query param or path parameter undefined
404 | `NOT_FOUND` | 54.188.174.19 Not Found
