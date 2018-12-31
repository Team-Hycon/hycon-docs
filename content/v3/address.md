# Address API

## Prerequisites (/address)

Requests related to **Address** should be requested by specifying the root path as `/address`.
The below REST API routes may require the following to provide accurate responses: 

- A fully synchronized Hycon node

## Getting address information

### Query method (get address)

```endpoint
GET /api/v3/address?{address}
```

#### Example request

```curl
curl -X GET http://localhost:2442/api/v3/address\?address\=H497fHm8gbPZxaXySKpV17a7beYBF9Ut3 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`address` | string | Yes | A Hycon wallet address to be used in the query

### URL method (get address)

```endpoint
GET /api/v3/address/:address
```

#### Example request

```curl
curl -X GET http://localhost:2442/api/v3/address/H497fHm8gbPZxaXySKpV17a7beYBF9Ut3 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`address` | string | Yes | A Hycon wallet address to be used in the query

### Response (specified block) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
**balance** | string | The balance of the account queried by address.
**nonce** | number | The nonce of the account queried by address.
**address** | string | The address value used to query.

#### Response (Success)

```json
{
    "balance": "51624.354309521",
    "nonce": 309,
    "address": "H497fHm8gbPZxaXySKpV17a7beYBF9Ut3"
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `NOT_FBAD_REQUESTOUND` | Error: Address must be 20 bytes long
