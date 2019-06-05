# Transaction API

## Prerequisites (/tx)

Requests related to **Transaction** should be requested by specifying the root path as `/tx`.
The below REST API routes may require the following to provide accurate responses: 

- A fully synchronized Hycon node

## Getting specific transaction information

Request specific transaction information by sending hash value as a parameter. 

There are two ways to pass parameters: through `query` parameters and through `url` parameters.


### Query method (specified tx)

```endpoint
GET /api/v3/tx?{hash}
```

#### Example request

```curl
curl -X GET http://localhost:2442/api/v3/tx\?hash\=Fjbnhvo1Qy4KisAgpTbrbYn2u24nfskDuyUwAAEjkAcH \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`hash` | Yes | The hash value of the transaction

### URL method (specified tx)

```endpoint
GET /api/v3/tx/:hash
```

#### Example request

```curl
curl -X GET http://localhost:2442/api/v3/tx/Fjbnhvo1Qy4KisAgpTbrbYn2u24nfskDuyUwAAEjkAcH \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`hash` | Yes | The hash value of the transaction

### Response (specified tx) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
**amount** | string | Amount of Hycon to send to the recipient.
**blockhash** | string | Hash value representing the block that contains the transaction.
**blocktime** | number | Timestamp in which the block containing the transaction was created.
**confirmation** | number | The height difference between the current block tip and the block containing the transaction.
**fee** | string | Transaction fee that the sender pays for the transaction transfer.
**from** | string | Sender Hycon address.
**nonce** | number | The transaction number sent by the from address.
**to** | string | Recipient Hycon address.
**txhash** | string | Hash value representing the transaction.

#### Response (Success)

```json
{
    "amount": "2.594615332",
    "blockhash": "6LkWJb1M2WhZm98RERFLXQqzcaoG2LjZP6YRrdg6892J",
    "blocktime": 1543656016427,
    "confirmation": 178,
    "fee": "0.000001",
    "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
    "nonce": 2740855,
    "to": "H4BFn3xRMAEEvCvbjhr3VopejyH8yHTCA",
    "txhash": "Fjbnhvo1Qy4KisAgpTbrbYn2u24nfskDuyUwAAEjkAcH"
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | The hash or address value is not defined. Please check the parameters
404 | `NOT_FOUND` | The transaction(Fjbnhvo1Qy4KisAgpTbrbYn2u24nfskDuyUwAAEjkAcw) does not exist in the txDB


## Getting transactions by address

Request mined block information with an address parameter.

There are two ways to pass parameters: through `query` parameters and through `url` parameters.


### Query method (tx by address)

```endpoint
GET /api/v3/tx?{address}&{count}
```

#### Example request without `count`

```curl
curl -X GET http://localhost:2442/api/v3/tx\?address\=H497fHm8gbPZxaXySKpV17a7beYBF9Ut3 \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `count`

```curl
curl -X GET http://localhost:2442/api/v3/tx\?address\=H497fHm8gbPZxaXySKpV17a7beYBF9Ut3\&count\=1 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`address` | Yes | An address value to query transaction information
`count` | No | Number of most recent transactions to return, if applicable (_Default: 10_)

_If the address has fewer transactions than `count`, the returned list of transactions will be of length less than `count`._ 

### URL method (tx by address)

```endpoint
GET /api/v3/tx/:address?{count}
```

#### Example request without `count`

```curl
curl -X GET http://localhost:2442/api/v3/tx/H497fHm8gbPZxaXySKpV17a7beYBF9Ut3 \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `count`

```curl
curl -X GET http://localhost:2442/api/v3/tx/H497fHm8gbPZxaXySKpV17a7beYBF9Ut3\?count\=5 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`address` | Yes | An address value to query transaction information
`count` | No | Number of most recent transactions to return, if applicable (_Default: 10_)

_If the address has fewer transactions than `count`, the returned list of transactions will be of length less than `count`._ 

### Response (tx by address) `200 OK, application/json`

A transaction list with the following parameters is returned:

Parameter | Type | Description
----------|------|------------
**amount** | string | Amount of Hycon to send to the recipient.
**blockhash** | string | Hash value representing the block that contains the transaction.
**blocktime** | number | Timestamp in which the block containing the transaction was created.
**fee** | string | Transaction fee that the sender pays for the transaction transfer.
**from** | string | Sender Hycon address.
**nonce** | number | The transaction number sent by the from address.
**to** | string | Recipient Hycon address.
**txhash** | string | Hash value representing the transaction.


#### Response (Success)

```json
[
    {
        "amount": "10",
        "blockhash": "8qMYN7vpeeUgwBFB61Pvv3e7wcGXjmxyZ2RMo8BaMVtD",
        "blocktime": 1545206983588,
        "fee": "0.000000001",
        "from": "H497fHm8gbPZxaXySKpV17a7beYBF9Ut3",
        "nonce": 309,
        "to": "H5gAeuo27LvUPTQRYL8A3YmAMmu8FbTV",
        "txhash": "CA9AsizAtynYfCpJqXkYFcdX9xXNnp5Q4Vyph9joAw9M"
    },
    ...
]
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | The hash or address value is not defined. Please check the parameters.


## Getting pending transactions

Request pending transactions information. 

The parameter can have an address and count value. When passing an address value as parameter, it returns only a list of pending transactions associated with that address. If the `address` parameter is not set, it returns all transactions in the transaction pool. If the `address` parameter is set, but not the `count` parameter, it returns all transactions associated with the address. The route supports both `query` and `url` parameter methods.

### Query method (pending txs)

```endpoint
GET /api/v3/tx/pending?{address}&{count}
```

#### Example request without `address`

```curl
curl -X GET http://localhost:2442/api/v3/tx/pending \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request without `address` with `count`

```curl
curl -X GET http://localhost:2442/api/v3/tx/pending\?count\=2 \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `address`

```curl
curl -X GET http://localhost:2442/api/v3/tx/pending\?address\=H2hQWtyFT1dvm5o6HvuF1oHq92bbb6ZVY \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `address` and `count`

```curl
curl -X GET http://localhost:2442/api/v3/tx/pending\?address\=H2hQWtyFT1dvm5o6HvuF1oHq92bbb6ZVY\&count\=3 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`address` | No | An address value to query pending transaction information
`count` | No | Number of most recent transactions to return

### URL method (pending txs)

```endpoint
GET /api/v3/tx/pending/:address?{count}
```

#### Example request without `address`

```curl
curl -X GET http://localhost:2442/api/v3/tx/pending \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request without `address` with `count`

```curl
curl -X GET http://localhost:2442/api/v3/tx/pending\?count\=2 \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `address`

```curl
curl -X GET http://localhost:2442/api/v3/tx/pending/H2hQWtyFT1dvm5o6HvuF1oHq92bbb6ZVY \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `address` and `count`

```curl
curl -X GET http://localhost:2442/api/v3/tx/pending/H2hQWtyFT1dvm5o6HvuF1oHq92bbb6ZVY\?count\=3 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`address` | No | An address value to query pending transaction information
`count` | No | Number of most recent transactions to return

_If the address has fewer transactions than `count`, the returned list of transactions will be of length less than `count`._ 

### Response (pending txs) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
**address** | string | The address value used to query.
**count** | number | The total number of pending transactions sent in response.
**totalPending** | string | The sum of the transfer amounts and fee of pending transactions sent from address.
**pendingTxs** | array | List of transactions queried.


#### Response (Success)

```json
{
    "address": "H2hQWtyFT1dvm5o6HvuF1oHq92bbb6ZVY",
    "count": 1,
    "totalPending": "0",
    "pendingTxs": [
        {
            "amount": "0.000000001",
            "to": "H2hQWtyFT1dvm5o6HvuF1oHq92bbb6ZVY",
            "txhash": "7FdVjNM939RF1i86vNnJk8QrFpEHmuueVjX7py2KPixU",
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
400 | `BAD_REQUEST` | Error: The parameter must be the hash of the transaction or address.


## Creating an outgoing transaction

Create a transaction on the Hycon network.

```endpoint
POST /api/v3/tx/
```

**Body (Content-Type: application/json):**

Parameter | Type | Required | Description
----------|------|----------|------------
**from** | string | Required | A Hycon wallet address of the sender.
**to** | string | Required | A Hycon wallet address of the receiver.
**amount** | string | Required | Amount of Hycon to send to the recipient.
**fee** | string | Required | Transaction fee that the sender pays for the transaction transfer.
**signature** | string | Required | A value signed to the transaction by the private key of the sender.
**recovery** | number | Required | Transaction recovery value.
**nonce** | number | Required | The transaction number sent by the from address.

#### Example request

```curl
curl -X POST http://localhost:2442/api/v3/tx \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
            "from": "H497fHm8gbPZxaXySKpV17a7beYBF9Ut3",
            "to":"H2EBExNn9xLpoZYZSfarHCvhufP1y63mw",
            "amount":"1",
            "fee":"0.0001",
            "signature":"af036fc39ee75301c4ed5c051fb80b37481cd045e713e034b4420e9eb652ac721f8e30d3c08391311deecb883e02301c4b8e78372427e4f787f838b32",
            "recovery":0,
            "nonce":310
        }'
```

### Response (created tx) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
**txhash** | string | Hash value representing the transaction.

#### Response (Success)

```curl
{
    "txhash": "EL8csTXoNDEiRnZ4LSDS1hEBWJmFaDtsAp2DnJcjX1UQ"
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | transaction(4sDzRvEf4HRw4WmtDGwdVfw8LwA3ptSxHV6bJdnokMgu) information or signature is incorrect