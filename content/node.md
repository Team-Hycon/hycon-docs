# Interacting with local Hycon Node

## Prerequisites

<h2 style="padding-top: 0">Interacting with local Hycon Node</h2>

The below REST API routes require the following to provide accurate responses: 

- A fully synchronized Hycon node
- Read and write permissions to storage for the Hycon node (_may require admin rights_)
- Sufficient storage space for the Hycon node and blockchain information

## Wallet Management

Hycon wallets are represented on the network as addresses. You are able to create wallets and query information from them. Each address contains zero (0) or more transactions sent to and received from the address.

### Generating a new wallet

A wallet file will be created in local storage. You can use the UI via the relevant URL or this API to interact with your wallet.

```endpoint
POST /api/v1/generateWallet
```

#### Example request body

```json
{
    "name": "test",
    "password": "password",
    "passphrase": "passphrase",
    "hint": "default",
    "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
    "language": "english"
}
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`name` | string | Yes | A unique wallet name
`mnemonic` | string | Yes | A 12- to 24-word BIP39 phrase to seed your wallet's private key
`language` | string | Yes | Language of your wallet's mnemonic
`password` | string | No | A password used to authenticate wallet use
`passphrase` | string | No | Custom text used as part of your wallet's address generation
`hint` | string | No | A hint for your password

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/generateWallet \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
        "name": "test",
        "password": "password",
        "passphrase": "passphrase",
        "hint": "default",
        "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
        "language": "english"
    }'
```

Please check _Appendix > Language Support_ for more information. **$language** is not case-sensitive.

**Response - `200 OK, text/plain`**

Parameter | Type | Description
----------|------|------------
`address` | string | A 12- to 24-word BIP39 phrase to seed your wallet's private key

#### Response (Success)

```json
"H36vybmEsPXdXzBD6a3sE2A6pGNTbCsae"
```

#### Response (Error)

```json
"Information is missing"
```


### Generating a new HD wallet

An HD wallet file will be created in local storage. You can use the UI via the relevant URL or this API to interact with your wallet. An HD wallet contains multiple addresses to send and receive Hycon, and these addresses may be referenced by their `index` value.

```endpoint
POST /api/v1/generateHDWallet
```

#### Example request body

```json
{
    "name": "test",
    "password": "password",
    "passphrase": "passphrase",
    "hint": "default",
    "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
    "language": "english"
}
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`name` | string | Yes | A unique wallet name
`mnemonic` | string | Yes | A 12- to 24-word BIP39 phrase to seed your wallet's private key
`language` | string | Yes | Language of your wallet's mnemonic
`password` | string | No | A password used to authenticate wallet use
`passphrase` | string | No | Custom text used as part of your wallet's address generation
`hint` | string | No | A hint for your password

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/generateHDWallet \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
        "name": "test",
        "password": "password",
        "passphrase": "passphrase",
        "hint": "default",
        "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
        "language": "english"
    }'
```

Please check _Appendix > Language Support_ for more information. **$language** is not case-sensitive.

**Response - `200 OK, text/plain`**

Parameter | Type | Description
----------|------|------------
`name` | string | Your wallet name

#### Response (Success)

```json
"test"
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | missing parameters
409 | `CONFLICT` | Error: Wallet name `{name}` already exits
409 | `CONFLICT` | Error: mnemonic or language is invalid/mismatched


### Deleting a wallet

Your wallet will be deleted from the local Hycon node. You may use this endpoint to delete a non-HD or HD wallet. If you have the same mnemonic and passphrase (optional), you will be able to recover the wallet using `/api/v1/recoverWallet` or `/api/v1/generateWallet`.

```endpoint
GET /api/v1/deleteWallet/{name}
```

**Path Parameter**

Parameter | Type | Required | Description 
----------|------|----------|------------
`name` | string | Yes | The name of the wallet

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/deleteWallet/test \
    -H 'Content-Type: application/json;charset=utf-8'
```

**Response - `200 OK, text/plain`**

`true` if wallet is deleted successfully; else `false`

#### Response (Success)

```json
true
```

#### Response (Error)

```json
false
```


### Recover a wallet

```endpoint
POST /api/v1/recoverWallet/
```

#### Example request body

```json
{
    "name": "test",
    "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
    "language": "english"
}
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`name` | string | Yes | A unique wallet name
`mnemonic` | string | Yes | A 12- to 24-word BIP39 phrase to seed your wallet's private key
`language` | string | Yes | Language of your wallet's mnemonic
`password` | string | No | A password used to authenticate wallet use
`passphrase` | string | No | Custom text used as part of your wallet's address generation
`hint` | string | No | A hint for your password

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/recoverWallet \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
        "name": "test",
        "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
        "language": "english"
    }'
```

Please check _Appendix > Language Support_ for more information. **$language** is not case-sensitive.

**Response - `200 OK, text/plain`**

Parameter | Type | Description
----------|------|------------
`address` | string | A 12- to 24-word BIP39 phrase to seed your wallet's private key

#### Response (Success)

```json
"H34kywGZSMUdPSCa3rqJLeHaRqigS3Bnt"
```

#### Response (Error)

```json
false
```


### Recover an HD wallet

```endpoint
POST /api/v1/recoverHDWallet/
```

#### Example request body

```json
{
    "name": "test",
    "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
    "language": "english"
}
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`name` | string | Yes | A unique wallet name
`mnemonic` | string | Yes | A 12- to 24-word BIP39 phrase to seed your wallet's private key
`language` | string | Yes | Language of your wallet's mnemonic
`password` | string | No | A password used to authenticate wallet use
`passphrase` | string | No | Custom text used as part of your wallet's address generation
`hint` | string | No | A hint for your password

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/recoverHDWallet \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
        "name": "test",
        "mnemonic": "someone window crucial magic shoulder latin satisfy total siege curtain candy trip",
        "language": "english"
    }'
```

Please check _Appendix > Language Support_ for more information. **$language** is not case-sensitive.

**Response - `200 OK, text/plain`**

Parameter | Type | Description
----------|------|------------
`address` | string | A 12- to 24-word BIP39 phrase to seed your wallet's private key

#### Response (Success)

```json
"test"
```

#### Response (Error)

```json
false
```


### Getting details of a wallet

```endpoint
GET /api/v1/wallet/detail/{name}
```

**Path Parameter**

Parameter | Type | Required | Description 
----------|------|----------|------------
`name` | string | Yes | The name of the wallet

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/wallet/detail/mining \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{
    "name": "mining",
    "address": "H34kywGZSMUdPSCa3rqJLeHaRqigS3Bnt",
    "balance": "0",
    "txs": [
        {
            "hash": "wVTPoSvrAbC63zy7RorvRW4BfuiqgQozUyqYDaYE77J",
            "amount": "0.62213847",
            "fee": "0.000001",
            "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
            "to": "H4FPn4X1RfR9RQtmFzY6BRozUAfoR3Ejp",
            "estimated": "0.62213947",
            "receiveTime": 1542101560397,
            "nonce": 2154143
        },
        ...
    ],
    "pendings": [],
    "minedBlocks": [
        {
            "blockhash": "FnQ2PKQmytfJLbyjoZwSSwtXjaFoCHzzUMsJGUmExNQ8",
            "timestamp": 1528456179304,
            "miner": "H34kywGZSMUdPSCa3rqJLeHaRqigS3Bnt",
            "feeReward": "240"
        },
        ...
    ],
    "pendingAmount": "0"
}
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`name` | string | The name of the wallet
`address` | string | The address of the wallet
`balance` | string | The amount of Hycon in the wallet
`txs` | list | A list of transactions sent to or received from by the wallet
`pendings` | list | A list of pending transactions awaiting confirmation
`minedBlocks` | list | A list of mined blocks by the wallet
`pendingAmount` | string | The amount of Hycon pending in the wallet

#### Response (Error)

```json
{
    "name": "{name}",
    "address": ""
}
```


### Getting details of an HD wallet

```endpoint
POST /api/v1/getHDWallet
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`name` | list | Yes | Name of your HD Wallet
`password` | string | Yes | Password of your wallet
`index` | string | No | Starting index of wallet to return
`count` | string | No | Number of wallet addresses to return

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/getHDWallet \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
      "name": "test",
      "password": "",
      "index": 0,
      "count": 2
    }'
```

#### Response (Success)

```json
[
    {
        "address": "H34kywGZSMUdPSCa3rqJLeHaRqigS3Bnt",
        "balance": "0",
        "pendingAmount": "0"
    },
    {
        "address": "H2zTphq19pxGWHgHyitKcXgjH9S37JB9L",
        "balance": "0",
        "pendingAmount": "0"
    }
]
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `NOT_FOUND` | the wallet cannot be found


### Getting a list of wallets

You can query information about all of your wallets on your local Hycon node. 

```endpoint
GET /api/v1/wallet
```

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/wallet \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{
    "walletList": [
        {
            "address": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
            "name": "mining",
            "balance": "2.670910068",
            "pendingAmount": "0"
        },
        {
            "address": "H34kywGZSMUdPSCa3rqJLeHaRqigS3Bnt",
            "name": "test",
            "balance": "0",
            "pendingAmount": "0"
        }
    ],
    "length": 2
}
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`walletList` | list | A list of wallet addresses with `address`, `name`, `balance`, and `pendingAmount`
`length` | number | The number of addresses in the list


### Making an outgoing transaction

Send Hycon from your wallet to another Hycon wallet. All transactions include a _n_ HYC miner fee.

```endpoint
POST /api/v1/transaction
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`tx` | list | Yes | Transaction information with the below parameters
`tx[name]` | string | Yes | Name of your wallet
`tx[password]` | string | Yes | Password of your wallet
`tx[address]` | string | Yes | A Hycon wallet address of the recipient
`tx[amount]` | string | Yes | Amount of Hycon to send to the recipient
`tx[minerFee]` | string | Yes | Transaction fee in Hycon
`tx[nonce]` | number | No | The transaction number sent from your wallet

#### Example request

```curl
$ curl -X POST http://localhost:2442/api/v1/transaction \
    -H 'Content-Type: application/json;charset=utf-8' \
    -d '{
        "tx": [
            {
                "name": "test",
                "password": "test",
                "address": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
                "amount": "0.000000001",
                "minerFee": "0.000000001"
            }
        ]
    }'
```

#### Response (Success)

```json
{
    "res": true
}
```

#### Response (Error)

```json
{
    "res": false,
    "case": "{status}"
}
```

**Response Error Table**

Case | Error
-----|-------
2 | invalid address
3 | miscellaneous error
error | insufficient wallet balance to send transaction




## Getting Blockchain Information

You can get information about blocks by providing a height value as well as get the current height of the blockchain.

### Getting block info at a specific height

```endpoint
GET /api/v1/block/height/{height}
```

**Path Parameter**

Parameter | Type | Required | Description 
----------|------|----------|------------
`height` | number | Yes | Height of a specific block on the Hycon blockchain

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/block/height/317713 \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{
    "hash": "55FeLzZohwsp7kUyxGBRcHQJAVqRLsar6CQmZvK9ZdpM",
    "difficulty": "1.4607536548526529e-9",
    "stateRoot": "EpQv5Vrkisf1n9wgMH4Pec82i3FxcFhsiKi2WeKHohDf",
    "merkleRoot": "xyw95Bsby3s4mt6f4FmFDnFVpQBAeJxBFNGzu2cX4dM",
    "txs": [
        {
            "amount": "1.077076457",
            "hash": "BLDTEDhqbUaxftUQ4oZSVAPUj5qzBrBuQ37EMNQEES1m",
            "fee": "0.000001",
            "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
            "to": "H3ZHv2sLw7NhpDnJJVpJ85u2kmECJBZud",
            "estimated": "1.077077457",
            "receiveTime": 1541402086473
        },
        ...
    ],
    "height": "317713",
    "timeStamp": 1541402040765
}
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`hash` | string | Hash representation of the transaction
`difficulty` | string | Mining difficulty of block
`stateRoot` | string | Hash of the world state at that block
`merkleRoot` | string | Merkle hash of all transactions in the block
`txs` | list | List of transactions in the block
`height` | string | Height of the block
`timestamp` | number | Timestamp when the block was added

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `NOT_FOUND` | no block found at that height

### Getting highest block on current chain

```endpoint
GET /api/v1/toptipHeight
```

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/toptipHeight \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{ "height": 346151 }
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`height` | string | Block number of the highest block

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `NOT_FOUND` | Fail to getTopTipHeight







## Fetching Block(s)

Blocks are a list of records which are linked and secured on the Hycon blockchain. Each block contains published transactions and can include unconfirmed transactions and possibly double spends.

### Getting the details of a block

Retrieve the details of a block given its hash to lookup.

```endpoint
GET /api/v1/block/{hash}
```

**Path Parameter**

Parameter | Type | Required | Description 
----------|------|----------|------------
`hash` | string | Yes | A hash string of a block to lookup

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/block/EL5DXFLKx8Y5YayvJQjqAsb3RvFRV4twUo8ZnNzQsnar \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{
    "hash": "EL5DXFLKx8Y5YayvJQjqAsb3RvFRV4twUo8ZnNzQsnar",
    "amount": "976.721369496",
    "difficulty": "1.4581169978347811e-9",
    "fee": "0.00003",
    "length": 30,
    "volume": "976.721399496",
    "stateRoot": "GXs3WPMAKaRTB6mx98jPqnmPhnVge86DUN4KaWX5ovNk",
    "merkleRoot": "4e25MRTztFcWYZwB4F7JwA8bfv8nokWQannJdTW6oGim",
    "txs": [
        {
            "hash": "BDaTKkKihPJi3nzB5wmKBMfvdz1oum64FjCVinFkkYJb",
            "amount": "0.137988774",
            "fee": "0.000001",
            "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
            "to": "H28ohpNTCZgviHTV8ftRQvQKBRVpbC5cr",
            "estimated": "0.137989774",
            "receiveTime": 1541402086473,
            "nonce": 1888209
        },
        ...
    ],
    "height": 317714,
    "timeStamp": 1541402086473,
    "prevBlock": "55FeLzZohwsp7kUyxGBRcHQJAVqRLsar6CQmZvK9ZdpM",
    "nonce": "000016147ffffffc",
    "miner": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
    "resultHash": "000000019fd96c80c8fbfd04ee0b339989bc8421da243c59b3979865f8fa4025"
}
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`hash` | string | Hash representation of the block
`amount` | string | Amount of Hycon in the block (sum of transactions)
`difficulty` | string | Mining difficulty of block
`fee` | string | Total fees accumulated from transactions in the block
`length` | number | Number of transactions in the block
`volume` | string | Amount of Hycon in the block (sum of transactions)
`stateRoot` | string | Hash of the world state at that block
`merkleRoot` | string | Merkle hash of all transactions in the block
`txs` | list | List of transactions in the block
`height` | number | Height of the block
`timestamp` | number | Timestamp when the block was added
`prevBlock` | string | Previous block hash
`nonce` | string | Value assigned by the miner that constitutes proof of work
`miner` | string | Wallet address of the miner
`resultHash` | string | Value assigned by the miner that constitutes proof of work

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `NOT_FOUND` | the block cannot be found


### Getting a list of recently published blocks

Retrieve a list of ten (10) most recent blocks published on the Hycon network.

```endpoint
GET /api/v1/blockList/{index}
```

**Path Parameter**

Parameter | Type | Required | Description 
----------|------|----------|------------
`index` | number | Yes | Index value of the recent block list (`0` returns the 10 most recent blocks)

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/blockList/0 \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{
    "blocks": [
        {
            "hash": "5rjhUnz94wBE4Aakq4Hb5NhSiy3XcTmvmDFdJG6dcLvW",
            "difficulty": "2.391887430150769e-9",
            "height": 348632,
            "size": 3995,
            "txs": [
                {
                    "amount": "1.128210794",
                    "hash": "3SmACLKLj9ydUQUn77r1ZVGWsUuhNeUFmMVVQ2qWBUEh",
                    "fee": "0.000001",
                    "from": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT",
                    "to": "H3PFczLsRMtq2pNndqD64TrWVKpAc2u6x",
                    "estimated": "1.128211794"
                },
                ...
            ],
            "timeStamp": 1542077044227,
            "prevBlock": [
                {
                    "0": 131,
                    "1": 160,
                    "2": 31,
                    "3": 182,
                    "4": 50,
                    "5": 249,
                    "6": 29,
                    "7": 80,
                    "8": 172,
                    "9": 221,
                    "10": 181,
                    "11": 17,
                    "12": 145,
                    "13": 51,
                    "14": 248,
                    "15": 108,
                    "16": 111,
                    "17": 68,
                    "18": 184,
                    "19": 238,
                    "20": 68,
                    "21": 45,
                    "22": 91,
                    "23": 222,
                    "24": 230,
                    "25": 84,
                    "26": 83,
                    "27": 121,
                    "28": 14,
                    "29": 64,
                    "30": 37,
                    "31": 168
                }
            ],
            "nonce": "000008613fffeb00",
            "miner": "H23fF8ktBWYwK7aHFbPSW52LtoHcbDvmT"
        },
        ...
    ],
    "length": 17433
}
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`hash` | string | Hash representation of the transaction
`difficulty` | string | Mining difficulty of block
`height` | number | Height of the block
`size` | number | Size of block information, in bytes
`txs` | list | List of transactions in the block
`timestamp` | number | Timestamp when the block was added
`prevBlock` | string | Previous block hash
`nonce` | string | Value assigned by the miner that constitutes proof of work
`miner` | string | Wallet address of the miner
`length` | string | Page number of the block list, used for pagination

**Response Error Table**

Status | Error | Message
-------|-------|--------
404 | `INVALID_ROUTE` | resource not found



## Fetching Peer(s)

Peers are other nodes connected to your Hycon node on the network.

### Getting a list of peers

Retrieve a list of peers connected to your Hycon node.

```endpoint
GET /api/v1/peerList
```

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/peerList \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
[
    {
        "host": "110.14.194.10",
        "port": 8148,
        "lastSeen": "11/14/2018, 12:08:14 PM",
        "failCount": 0,
        "lastAttempt": "11/14/2018, 12:08:14 PM",
        "active": 2
    },
    ...
]
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`host` | string | IP address of the peer
`port` | number | Port connected with the peer
`lastSeen` | timestamp | Most recent timestamp the peer was seen
`failCount` | number | Number of connection failures
`lastAttempt` | timestamp | Most recent timestamp the peer attempted connection
`active` | number | Activity of the peer


## Miscellaneous Tools

You may use the following APIs to assist with Hycon network or wallet interaction.

### Generating a new mnemonic

You can generate new mnemonic phrases to create a BIP39 wallet, such as a Hycon wallet. You can pass it as a parameter to `/generateWallet` and `/recoverWallet`. Please check _Appendix > Language Support_ for a list of supported languages. `language` is not case-sensitive.

```endpoint
GET /api/v1/getMnemonic/{language}
```

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/getMnemonic/korean \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
"찻잔 역사 조건 나흘 별명 조상 현금 태풍 사업 업종 대규모 유형"
```

**Response - `text/plain`**

Parameter | Type | Description
----------|------|------------
`mnemonic` | string | A 12- to 24-word BIP39 phrase to seed your wallet's private key


### Get network market cap

You can get the total supply and circulating supply of Hycon by querying the Hycon network.

```endpoint
GET /api/v1/getMarketCap
```

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/getMarketCap \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
{
    "totalSupply": "2973547208.888888889",
    "circulatingSupply": "1742306672.910558701"
}
```

**Response - `200 OK, application/json`**

Parameter | Type | Description
----------|------|------------
`totalSupply` | string | Total amount of Hycon on the network
`circulatingSupply` | string | Circulating supply of Hycon on the network



### Query if block is an uncle block

```endpoint
GET /api/v1/isUncleBlock/{blockhash}
```

**Path Parameter**

Parameter | Type | Required | Description 
----------|------|----------|------------
`blockhash` | text | Yes | Hash representation of the block

#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/isUncleBlock/wVTPoSvrAbC63zy7RorvRW4BfuiqgQozUyqYDaYE77J \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
false
```

**Response - `200 OK, text/plain`**

`true` if block hash is an uncle block; else `false`


### Amount of mining reward from block

```endpoint
GET /api/v1/getMiningReward/{blockhash}
```

**Path Parameter**

Parameter | Type | Required | Description 
----------|------|----------|------------
`blockhash` | text | Yes | Hash representation of the block


#### Example request

```curl
$ curl -X GET http://localhost:2442/api/v1/getMiningReward/FnQ2PKQmytfJLbyjoZwSSwtXjaFoCHzzUMsJGUmExNQ8 \
    -H 'Content-Type: application/json;charset=utf-8'
```

#### Response (Success)

```json
"240"
```

**Response - `200 OK, text/plain`**

Parameter | Type | Description
----------|------|------------
`amount` | string | Amount in Hycon of the mining reward


**Response Error**

Response will return empty if the block is not a mined block; else will always return an `amount`.