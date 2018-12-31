# Block API

## Prerequisites (/block)

Requests related to **Blocks** should be requested by specifying the root path as `/block`.
The below REST API routes may require the following to provide accurate responses: 

- A fully synchronized Hycon node

## Getting the latest block information

If a request is received without any parameters, it will return the latest block information.

```endpoint
GET /api/v3/block?{range}
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`range` | number | No | Include blocks within the specified range. The block tip is used as a reference. (_Default: 1_)

_If you want to look up previous blocks based on block tip, set the `range` parameter as a negative value._

### Response (latest block)`200 OK, application/json`

If `range` is not set or set to 1, the following object is returned. Else, a block list with the following objects as elements is returned:

Parameter | Type | Description
----------|------|------------
**height** | number | Height of the block.
**hash** | string | Hash value representing the block.
**difficulty** | number | Difficulty of the mined block.
**merkleRoot** | string | Merkle hash of all transactions in the block.
**stateRoot** | string | Hash of the world state at that block.
**timestamp** | number | Timestamp when the block was added.
**txs** | array | List of transactions in the block.
**nonce** | string | Nonce of the block.
**miner** | string | A Hycon wallet address of the miner.
**uncleHash** | array | List of hash values of uncle block.
**previousHash** | string | The hash value of the previous block.

#### Example request without specified range

```curl
$ curl -X GET http://localhost:2442/api/v3/block \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success) without specified range

```json
{
    "height": 412510,
    "hash": "6ZDkzCeih26nQ6ry84FhvJackNpRgKGKmFCrhvQsdfMf",
    "difficulty": "2.2465660159450127e-9",
    "merkleRoot": "8FKVTsPMMfgjp7tWZLgmrodcFPy8PcVMMc9r3fPdvu5p",
    "stateRoot": "DVuavQUzM2GTD7D43n83vDm1TDnb5r6dVc2UDNZbdJon",
    "timestamp": 1543462655832,
    "txs": [
        {
            "amount": "28.312759446",
            "to": "H3mt6xb2evbvJ5m58181t2hjQxrhE6gFz",
            "txhash": "4qpzsvd9YtZAtU7UWnByN8JTfbkYHrGd2PjZ9pQNepTj",
            "fee": "0.000001",
            "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
            "nonce": 2667656
        },
        ...
    ],
    "nonce": "16769771563250614862",
    "miner": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
    "uncleHash": [
        "7ZY6RZGxLeBnzenpYL6m8x1F1sq3umsyW5ZEry3d1D8o"
    ],
    "previousHash": "3ZPBmRgzt3sN1QqvbArfvDG465b47FUR7bPvRwtnxWbS"
}
```

#### Example request with specified range

```curl
$ curl -X GET http://localhost:2442/api/v3/block\?range=-2 \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success) with specified range

```json
[
    {
        "height": 412509,
        "hash": "3ZPBmRgzt3sN1QqvbArfvDG465b47FUR7bPvRwtnxWbS",
        "difficulty": "2.267803372508838e-9",
        "merkleRoot": "xyw95Bsby3s4mt6f4FmFDnFVpQBAeJxBFNGzu2cX4dM",
        "stateRoot": "EryxtWHTHorKRmqozQe63XmYLezjdaNxcAZESyWdaCPd",
        "timestamp": 1543462624068,
        "txs": [],
        "nonce": "16909528905709264102",
        "miner": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
        "uncleHash": [],
        "previousHash": "BtGd36He84SMQYv61Tr1wowtnoE1Ey1HiMTW2QwajQea"
    },
    ...
]
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | The parameter value passed as count is invalid
404 | `NOT_FOUND` | Tip information is undefined in consensus


## Getting specific block information

Request specific block information by sending block height or hash value as a parameter. 

There are two ways to pass parameters: through `query` parameters and through `url` parameters.


### Query method (specified block)

```endpoint
GET /api/v3/block?{height}&{range}
```

```endpoint
GET /api/v3/block?{hash}&{range}
```

#### Example request with `height` specified

```curl
curl -X GET http://localhost:2442/api/v3/block\?height\=412510 \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `hash` specified

```curl
curl -X GET http://localhost:2442/api/v3/block\?height\=412510 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`hash` | string | No | The hash value of the block
`height` | string | No | The height value of the block
`range` | string | No | Include blocks within the specified range. (_Default: 1_)

_If the value of `range` is positive and greater than 1, a list of blocks starting from the specified `hash` or `height` is returned. If the `range` is negative, the list of blocks ending from the specified `hash` or `height` is returned._

_Only one of either the `hash` or `height` parameter should be used. If both are passed as query parameters, the `hash` parameter is used._

### URL method (specified block)

```endpoint
GET /api/v3/block/:hash?{range}
```

```endpoint
GET /api/v3/block/:height?{range}
```

#### Example request with `height` specified

```curl
curl -X GET http://localhost:2442/api/v3/block/406080?range=-2 \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `hash` specified

```curl
curl -X GET http://localhost:2442/api/v3/block/6ZDkzCeih26nQ6ry84FhvJackNpRgKGKmFCrhvQsdfMf?range=2 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`hash` | string | Yes* | The hash value of the block
`height` | string | Yes* | The height value of the block
`range` | string | No | Include blocks within the specified range. (_Default: 1_)

_If the value of `range` is positive and greater than 1, a list of blocks starting from the specified `hash` or `height` is returned. If the `range` is negative, the list of blocks ending from the specified `hash` or `height` is returned._

_*Only one of either the `hash` or `height` parameter should be used. If both are passed as query parameters, the `hash` parameter is used._

### Response (specified block) `200 OK, application/json`

If `range` is not set or set to 1, the following object is returned. Else, a block list with the following objects as elements is returned:

Parameter | Type | Description
----------|------|------------
**height** | number | Height of the block.
**hash** | string | Hash value representing the block.
**difficulty** | number | Difficulty of the mined block.
**merkleRoot** | string | Merkle hash of all transactions in the block.
**stateRoot** | string | Hash of the world state at that block.
**timestamp** | number | Timestamp when the block was added.
**txs** | array | List of transactions in the block.
**nonce** | string | Nonce of the block.
**miner** | string | A Hycon wallet address of the miner.
**uncleHash** | array | List of hash values of uncle block.
**previousHash** | string | The hash value of the previous block.

#### Response (Success) without specified range

```json
{
    "height": 412510,
    "hash": "6ZDkzCeih26nQ6ry84FhvJackNpRgKGKmFCrhvQsdfMf",
    "difficulty": "2.2465660159450127e-9",
    "merkleRoot": "8FKVTsPMMfgjp7tWZLgmrodcFPy8PcVMMc9r3fPdvu5p",
    "stateRoot": "DVuavQUzM2GTD7D43n83vDm1TDnb5r6dVc2UDNZbdJon",
    "timestamp": 1543462655832,
    "txs": [
        {
            "amount": "28.312759446",
            "to": "H3mt6xb2evbvJ5m58181t2hjQxrhE6gFz",
            "txhash": "4qpzsvd9YtZAtU7UWnByN8JTfbkYHrGd2PjZ9pQNepTj",
            "fee": "0.000001",
            "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
            "nonce": 2667656
        },
        ...
    ],
    "nonce": "16769771563250614862",
    "miner": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
    "uncleHash": [
        "7ZY6RZGxLeBnzenpYL6m8x1F1sq3umsyW5ZEry3d1D8o"
    ],
    "previousHash": "3ZPBmRgzt3sN1QqvbArfvDG465b47FUR7bPvRwtnxWbS"
}
```

#### Response (Success) with specified range

```json
[
    {
        "height": 406079,
        "hash": "FW9tKvn9qGqCoBXo7gsrSZJXPYHMqV4iGwqu8M5peZqp",
        "difficulty": "2.209114884696341e-9",
        "merkleRoot": "xyw95Bsby3s4mt6f4FmFDnFVpQBAeJxBFNGzu2cX4dM",
        "stateRoot": "GtQepoj5ug8aTTsHqnZV6si4ej3pLhE81XTRRgA2gbiv",
        "timestamp": 1543323156188,
        "txs": [ ],
        "nonce": "9223385724915548540",
        "miner": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
        "uncleHash": [ ],
        "previousHash": "4jBSmugyJcsPwF635kxwYmApSxvzk27xtaLPjiefpU7H"
    },
    ...
]
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | the absolute value of range cannot exceed 100
404 | `NOT_FOUND` | Error: hash 5PrvewZUb3BizCEqibi1URv9WBssAdFqsa95weL4rTpj is not found



## Getting mined block information

Request mined block information with an address parameter.

There are two ways to pass parameters: through `query` parameters and through `url` parameters.


### Query method (mined blocks)

```endpoint
GET /api/v3/block/mined?{address}&{count}
```

#### Example request without `count`

```curl
curl -X GET http://localhost:2442/api/v3/block/mined\?address\=H497fHm8gbPZxaXySKpV17a7beYBF9Ut3 \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `count`

```curl
curl -X GET http://localhost:2442/api/v3/block/mined\?address\=H497fHm8gbPZxaXySKpV17a7beYBF9Ut3&count=2 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`address` | string | Yes | An address value to query mined block information
`count` | number | No | Number of mined blocks to return, if applicable (_Default: 1_)

### URL method (mined blocks)

```endpoint
GET /api/v3/block/mined/:address?{count}
```

#### Example request without `count`

```curl
curl -X GET http://localhost:2442/api/v3/block/mined/H497fHm8gbPZxaXySKpV17a7beYBF9Ut3 \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `count`

```curl
curl -X GET http://localhost:2442/api/v3/block/mined/H497fHm8gbPZxaXySKpV17a7beYBF9Ut3?count=2 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`address` | string | Yes | An address value to query mined block information
`count` | number | No | Number of mined blocks to return, if applicable (_Default: 1_)

### Response (mined blocks) `200 OK, application/json`

If `count` is not set or set to 1, the following object is returned. Else, a block list with the following objects as elements is returned:

Parameter | Type | Description
----------|------|------------
**hash** | string | The hash value of the block that a address mined.
**reward** | string | Reward received by mining the block. This is the sum of the mining reward of block and the fee of the transaction.
**timestamp** | number | Timestamp when the block was added.
**miner** | string | The Hycon address value which mined the block.


#### Response (Success) without specified count

```json
{
    "hash": "9Xm95pPZ4QazmUVJWhPKXKvgzMHDQ31VQgVhxbFa4y2R",
    "reward": "12",
    "timestamp": 1545425179740,
    "miner": "H497fHm8gbPZxaXySKpV17a7beYBF9Ut3"
}
```

#### Response (Success) with specified count

```json
[
    {
        "hash": "9Xm95pPZ4QazmUVJWhPKXKvgzMHDQ31VQgVhxbFa4y2R",
        "reward": "12",
        "timestamp": 1545425179740,
        "miner": "H497fHm8gbPZxaXySKpV17a7beYBF9Ut3"
    },
    ...
]
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | The parameter value passed as count is invalid.


## Getting tip information

Request information about tips.

There are two types of tips managed by the local node: block tip and header tip.

```endpoint
GET /api/v3/block/tip
```

#### Example request
```curl
curl -X GET http://localhost:2442/api/v3/block/tip \
-H 'Content-Type: application/json;charset=utf-8'
```

### Response (tip info) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
**blockTip** | object | An object that contains information about the block tip.
**headerTip** | object | An object that contains information about the header tip.

The information contained in the object is specified below.

Parameter | Type | Description
----------|------|------------
**height** | number | Height of the block.
**hash** | string | Hash value representing the block.
**difficulty** | number | Difficulty of the mined block.
**merkleRoot** | string | Merkle hash of all transactions in the block.
**stateRoot** | string | Hash of the world state at that block.
**timestamp** | number | Timestamp when the block was added.
**nonce** | string | Nonce of the block.
**miner** | string | A Hycon wallet address of the miner.
**uncleHash** | array | List of hash values of uncle block.
**previousHash** | string | The hash value of the previous block.

#### Response (Success)
```json
{
    "blockTip": {
        "height": 412809,
        "hash": "8P26d9oA8tMjNFuJvhi9jX4QwrPSZ6UdamWrJRDAYhXv",
        "difficulty": "2.3139578302907827e-9",
        "merkleRoot": "xyw95Bsby3s4mt6f4FmFDnFVpQBAeJxBFNGzu2cX4dM",
        "stateRoot": "C18Mqz7XH9KLa6PHmuC1HsZFt67feFdPL6nkJTXzQ9de",
        "timestamp": 1543469194119,
        "nonce": "6148915604632898997",
        "miner": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
        "uncleHash": [
            "3DJaFmo5pcgDYzGgx793wJ7iJkwGfPUrcr4moMwmodix"
        ],
        "previousHash": "EpyZL4dsRiooEV3hWog2XaLhhxuQsXfZEbiaBqmnJMtU"
    },
    "headerTip": {
        "height": 413284,
        "hash": "FQD5cNyNzx7jWTV9sf392ZCzbzz1tFr3x7G7gu3KakJ2",
        "difficulty": "2.1151013686880353e-9",
        "merkleRoot": "G9sVhZZoEUUAa59ehuqiq4X6f3yn584pHDhgMCy4jBfR",
        "stateRoot": "HTqbKVEgaRkspZnrHL4nBhyStmJudDMDRNkiVrka1gVS",
        "timestamp": 1543479291581,
        "nonce": "9223373127776471614",
        "miner": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
        "uncleHash": [],
        "previousHash": "FRn4rbom7fgZzdBK87GjxtB9qbgG92PKwUcc1SKieL3t"
    }
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `NOT_FOUND` | Tip information is undefined in consensus.