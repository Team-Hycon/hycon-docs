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

Parameter | Required | Description 
----------|----------|------------
`address` | Yes | A Hycon wallet address to be used in the query

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

Parameter | Required | Description 
----------|----------|------------
`address` | Yes | A Hycon wallet address to be used in the query

### Response (get address) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
**balance** | string | The balance of the account queried by address.
**nonce** | number | The nonce of the account queried by address.
**address** | string | The address value used to query.
**pendings** | array | A list of pending transactions awaiting confirmation.

#### Response (Success)

```json
{
    "balance": "51624.354309521",
    "nonce": 309,
    "address": "H497fHm8gbPZxaXySKpV17a7beYBF9Ut3",
    "pendings": [
        {
            "amount": "0.000000001",
            "to": "H2hQWtyFT1dvm5o6HvuF1oHq92bbb6ZVY",
            "txhash": "7FdVjNM939RF1i86vNnJk2QrFpEHmuueVjX8py3KPaxU",
            "fee": "0.000000001",
            "from": "H497fHm8gbPZxaXySKpV17a7beYBF9Ut3",
            "nonce": 310
        }
    ]
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | Error: Address must be 20 bytes long
