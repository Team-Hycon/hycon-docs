# Interacting directly with the network

## Prerequisites

<h2 style="padding-top: 0">Interacting directly with the Hycon Public Network</h2>

The below REST API routes may require the following to provide accurate responses: 

- A fully synchronized Hycon node

## Address Management

Hycon wallets are represented on the network as addresses. You are able to create wallets and query information from them.

### Generating a new address

The first step to be able to send and receive Hycon is by creating a new wallet.

```endpoint
POST /api/v1/wallet
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`mnemonic` | string | No | A 12- to 24-word BIP39 phrase to seed your wallet's private key
`language` | string | No | Regional language to generate your wallet's mnemonic phrase (_Default: English_)

#### Example request body

```json
{
	"mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
	"language": "english"
}
```

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/wallet \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
	  "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
	  "language": "english"
    }'
```

Please check _Appendix > Language Support_ for more information. **$language** is not case-sensitive.

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`mnemonic` | string | A 12- to 24-word BIP39 phrase to seed your wallet's private key
`privateKey` | string | The generated private key from the mnemonic
`address` | string | The generated Hycon wallet address

#### Response (Success)

```json
{
    "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
    "privateKey": "7bf8ec7059c3f5237ec2651dbb1997f0288a260e1f9335ecf33df49b148b0710",
    "address": "H34kywGZSMUdPSCa3rqJLeHaRqigS3Bnt"
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `INVALID_PARAMETER` | mnemonic or language is invalid/mismatched
404 | `NOT_FOUND` | the resource cannot be found / currently unavailable


### Generating a new HD wallet root key

```endpoint
POST /api/v1/HDWallet
```

#### Example request body

```json
{
	"mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
    "language": "english",
    "index": 0
}
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`rootKey` | string | No | Root key generated from the mnemonic. If present, response will only contain this root key.
`mnemonic` | string | No | A 12- to 24-word BIP39 phrase to seed your wallet's root key
`language` | string | No | Regional language to generate your wallet's mnemonic phrase (_Default: English_)
`passphrase` | string | No | Passphrase of your HD wallet
`index` | number | No | The index of the HD wallet to lookup. If present, a specific wallet address will be returned from this HD wallet.

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/HDWallet \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
	  "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
	  "language": "english",
      "index": 0
    }'
```

Please check _Appendix > Language Support_ for more information. **$language** is not case-sensitive.

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`rootKey` | string | Root key generated from the mnemonic. If present, response will only contain this root key.
`mnemonic` | string | A 12- to 24-word BIP39 phrase to seed your wallet's root key
`language` | string | Regional language to generate your wallet's mnemonic phrase (_Default: English_)
`index` | string | Index of the HD wallet (_Present if `index` parameter is sent in the request_)
`address` | number | The generated Hycon wallet address. (_Present if `index` parameter is sent in the request_

#### Response (Success)

```json
{
    "rootKey": "xprv9s21ZrQH143K4AS5aB6u92QhhFNraGRKE9kHUdtkndLLLu4V5CKHugyAGVgs7R38y8gTG2t",
    "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
    "language": "english",
    "index": 0,
    "address": "H34kywGZSMUdPSCa3rqJLeHaRqigS3Bnt"
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `INVALID_PARAMETER` | mnemonic or language is invalid/mismatched
404 | `NOT_FOUND` | the resource cannot be found / currently unavailable


## Querying an address

### Getting details of an address

```endpoint
GET /api/v1/address/{address}
```

**Path Parameters**

Parameter | Type | Required | Description 
----------|------|----------|------------
`address` | string | Yes | A Hycon wallet address

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/address/H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{
    "hash": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
    "balance": "780622.88691486",
    "nonce": 2178449,
    "txs": [
        {
            "hash": "92jiapATwyUj2GhWTvs2kXg4jcLeaLsFXgA3b9T42XDQ",
            "amount": "1.346689458",
            "fee": "0.000001",
            "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
            "to": "H4GxCHsAjDLhDBGTMpiwPK9cKAUxwEXmj",
            "estimated": "1.346690458",
            "receiveTime": 1542165841013,
            "nonce": 2178449
        },
        ...
    ],
    "pendings": [],
    "minedBlocks": [
        {
            "blockhash": "7Wn8GbtXEGDUcctRYPk71Jij6ya3o6dvitQgLN9JmU8K",
            "timestamp": 1542165848576,
            "miner": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
            "feeReward": "120"
        },
        ...
    ],
    "pendingAmount": "0"
}
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`hash` | string | A Hycon wallet address
`balance` | string | The amount of Hycon in the address
`txs` | list | A list of transactions sent to or received from by the address
`pendings` | list | A list of pending transactions awaiting confirmation
`minedBlocks` | list | A list of mined blocks by the address
`pendingAmount` | string | The amount of Hycon pending in the address


**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `INVALID_PARAMETER` | Error: {address error}



### Getting details of an HD wallet root key

```endpoint
POST /api/v1/getHDWalletFromRootKey
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`rootKey` | string | Yes | Root key generated from the mnemonic.
`index` | number | No | The starting index of the HD wallet to lookup (_Default: 0_)
`count` | number | No | The number of wallet addresses to return for the lookup (_Default: 10_)

#### Example request body

```json
{
	"rootKey": "xprv9s21ZrQH143K4AS5aB6u92QhhFNraGRKE9kHUdtkndLLLu4V5CKHugyAGVgs7R38y8gTG2t",
    "index": 0,
    "count": 2
}
```

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/getHDWalletFromRootKey \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
	  "rootkey": "xprv9s21ZrQH143K4AS5aB6u92QhhFNraGRKE9kHUdtkndLLLu4V5CKHugyAGVgs7R38y8gTG2t",
      "index": 0,
      "count": 2
    }'
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`address` | list | A list of addresses with the following parameters:
`balance` | string | The amount of Hycon in the address
`pendingAmount` | string | The amount of Hycon pending in the address
`index` | number | Index value of the address in the HD walelt

#### Response (Success)

```json
[
    {
        "address": "H34kywGZSMUdPSCa3rqJLeHaRqigS3Bnt",
        "balance": "0",
        "pendingAmount": "0",
        "index": 0
    },
    {
        "address": "H2zTphq19pxGWHgHyitKcXgjH9S37JB9L",
        "balance": "0",
        "pendingAmount": "0",
        "index": 1
    }
]
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `NOT_FOUND` | the wallet cannot be found


### Getting the balance

```endpoint
GET /api/v1/wallet/{address}/balance
```

**Path Parameter**

Parameter | Type | Required | Description 
----------|------|----------|------------
`address` | string | Yes | A Hycon wallet address

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/wallet/H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT/balance \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{ "balance": "76722.558742064" }
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`balance` | string | The balance in HYC of the address

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `INVALID_ADDRESS` | invalid address
404 | `NOT_FOUND` | the resource cannot be found / currently unavailable


### Getting a list of transactions

To retrieve a list of transactions sent to and received from the wallet. Providing the `nonce` parameter will retrieve a list of transactions after the `nonce` value.

```endpoint
GET /api/v1/wallet/{address}/txs/{nonce}
```

**Path Parameters**

Parameter | Type | Required | Description 
----------|------|----------|------------
`address` | string | Yes | A Hycon wallet address
`nonce` | string | No | The transaction number sent from the Hycon address

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/wallet/H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT/txs/20 \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{
    "txs": [
        {
            "hash": "A3CpvMaSm92mYbShhRwxFuXQYrNba1iZwBeCRrfhoeBn",
            "amount": "25.995459977",
            "fee": "0.000001",
            "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
            "to": "H3zYvzxTDGEF9fZtmzLV78h38J4BR2qnL",
            "estimated": "25.995460977",
            "receiveTime": 1542011323948
        },
        ...
    ]
}
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`txs` | list | A list of transactions with: `hash`,`amount`,`fee`,`from`,`to`,`estimated`,`receiveTime`

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `INVALID_NONCE` | nonce value is too big
400 | `INVALID_ADDRESS` | invalid address
404 | `NOT_FOUND` | the resource cannot be found / currently unavailable






## Transaction Management

You can directly query transactions from their hashes or allow HYC to be withdrawn from a specified wallet's address.

### Getting the details of a transaction

Retrieve the details of a single transaction.

```endpoint
GET /api/v1/tx/{hash}
```

**Path Parameter**

Parameter | Type | Required | Description 
----------|------|----------|------------
`hash` | string | Yes | A hash string of a transaction

#### Example request

```curl
$ curl -X GET \
    http://localhost:2442/api/v1/tx/A3CpvMaSm92mYbShhRwxFuXQYrNba1iZwBeCRrfhoeBn \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{
    "hash": "A3CpvMaSm92mYbShhRwxFuXQYrNba1iZwBeCRrfhoeBn",
    "amount": "25.995459977",
    "fee": "0.000001",
    "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
    "to": "H3zYvzxTDGEF9fZtmzLV78h38J4BR2qnL",
    "blockHash": "CW1yZ5ii51zruXn13hTfQaUNmXtxQCPnPVRJYPt1Vydf",
    "nonce": 2120339,
    "receiveTime": 1542011323948,
    "estimated": "25.995460977",
    "confirmation": 85
}
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`hash` | string | Hash representation of the transaction
`amount` | string | Amount of Hycon transferred in the transaction
`fee` | string | Transaction fee, in Hycon, to complete the transaction
`from` | string | Sender Hycon address
`to` | string | Recipient Hycon address
`blockHash` | string | Hash representation of the block that contains the transaction
`nonce` | number | Nonce value of the transaction from the address
`receiveTime` | number | Timestamp when the transaction is confirmed
`estimated` | string | Amount of Hycon needed to complete the transaction
`confirmation` | number | Number of nodes that have processed and validated the transaction

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `INVALID_PARAMETER` | address was not provided
404 | `NOT_FOUND` | the resource cannot be found / currently unavailable

### Creating an outgoing transaction with a private key

Send Hycon from a wallet via a private key to another Hycon wallet. All transactions include a _n_ HYC miner fee.

```endpoint
POST /api/v1/signedtx
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`privateKey` | string | Yes | A Hycon wallet's generated private key
`to` | string | Yes | A Hycon wallet address of the receiver
`amount` | string | Yes | Amount of Hycon to send to recipient
`fee` | string | Yes | Transaction fee, in Hycon, to complete the transaction
`nonce` | number | No | The transaction number sent from the Hycon address

#### Example request body

```json
{
    "privateKey": "65b4f0c4e5594117e7a7951e60dc81e5701731c61830a30e1bd8199a469f6f90a",
    "to": "H3zYvzxTDGEF9fZtmzLV78h38J4BR2qnL",
    "amount": "25.995459977",
    "fee": "0.000001"
}
```

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/signedtx \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
	  "privateKey": "65b4f0c4e5594117e7a7951e60dc81e5701731c61830a30e1bd8199a469f6f90a",
      "to": "H3zYvzxTDGEF9fZtmzLV78h38J4BR2qnL",
      "amount": "25.995459977",
      "fee": "0.000001"
    }'
```

#### Response (Success)

```json
{ "txHash": "A3CpvMaSm92mYbShhRwxFuXQYrNba1iZwBeCRrfhoeBn" }
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`txHash` | string | Hash representation of the transaction after it is created

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `INVALID_PARAMETER` | insufficient wallet balance to send transaction
404 | `INVALID_PARAMETER` | could not queue transaction

### Creating an outgoing transaction with a signature

Send Hycon from a wallet via a signature to another Hycon wallet. All transactions include a _n_ HYC miner fee.

```endpoint
POST /api/v1/tx
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`signature` | string | Yes | A signature generated from a Hycon private key
`from` | string | Yes | A Hycon wallet address of the sender
`to` | string | Yes | A Hycon wallet address of the receiver
`amount` | string | Yes | Amount of Hycon to send to recipient
`fee` | string | Yes | Transaction fee, in Hycon, to complete the transaction
`nonce` | number | No | The transaction number sent from the Hycon address
`recovery` | number | No | Transaction recovery value

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/tx \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
	  "signature": "65b4f0c4e5594117e7a7951e60dc81e5701731c61830a30e1bd8199a469f6f90a",
	  "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
      "to": "H3zYvzxTDGEF9fZtmzLV78h38J4BR2qnL",
      "amount": "25.995459977",
      "fee": "0.000001",
      "nonce": 1,
      "recovery": 0
    }'
```

#### Response (Success)

```json
{ "txHash": "A3CpvMaSm92mYbShhRwxFuXQYrNba1iZwBeCRrfhoeBn" }
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`txHash` | string | Hash representation of the transaction after it is created

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `INVALID_PARAMETER` | insufficient wallet balance to send transaction
404 | `INVALID_PARAMETER` | transaction information or signature is incorrect
404 | `INVALID_PARAMETER` | could not queue transaction


### Creating an outgoing transaction from HD wallet root key

```endpoint
POST /api/v1/sendTxWithHDWalletRootKey
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`tx` | object | Yes | Transaction information with the below parameters:
`tx.address` | string | Yes | A Hycon wallet address of the recipient
`tx.amount` | string | Yes | Amount of Hycon to send to the recipient
`tx.minerFee` | string | Yes | Transaction fee in Hycon
`tx.nonce` | number | No | The transaction number sent from the Hycon address
`rootKey` | string | Yes | Root key of the wallet you want to use for the transaction
`index` | number | Yes | HD wallet index to a specific wallet address

#### Example request body

```json
{
    "tx": {
        "address": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
        "amount": "0.000000001",
        "minerFee": "0.000000001"
    },
    "rootKey": "xprv9s21ZrQH143K4AS5aB6u92QhhFNraGRKE9kHUdtkndLLLu4V5CKHugyAGVgs7R38y8gTG2t",
    "index": 0
}
```

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/sendTxWithHDWalletRootKey \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
        "tx": [
            {
                "address": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
                "amount": "0.000000001",
                "minerFee": "0.000000001"
            }
        ],
        "rootKey": "xprv9s21ZrQH143K4AS5aB6u92QhhFNraGRKE9kHUdtkndLLLu4V5CKHugyAGVgs7R38y8gTG2t",
        "index": 0
    }'
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`hash` | string | Hash representation of the transaction after it is created

#### Response (Success)

```json
{ "hash": "3AeeciKEM97w32GLQPeSnU1i6U9G2YxbeyVc7BQb4LQD" }
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `INVALID_PARAMETER` | Invalid address: Please check 'To address'