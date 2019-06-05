
# Wallet API

Requests related to wallet should be requested by specifying the root path as a wallet. 

## Prerequisites (/wallet)

Requests related to **Wallet** should be requested by specifying the root path as `/wallet`.
The below REST API routes may require the following to provide accurate responses: 

- A fully synchronized Hycon node

## Getting information of wallet list

Requests a list of wallets generated on the node. If a wallet does not exist on the node, an empty JSON list will be returned.

### Query method (wallet list)

```endpoint
GET /api/v3/wallet/list
```

#### Example request

```curl
curl -X GET http://localhost:2442/api/v3/wallet/list \
-H 'Content-Type: application/json;charset=utf-8'
```


### Response (wallet list) `200 OK, application/json`

A wallet list with the following objects as elements is returned:

Parameter | Type | Description
----------|------|------------
`name` | string | The name of a wallet.
`address` | string | A Hycon wallet public address.
`balance` | string | The total circulation of HYCON coin.
`nonce` | number | The transaction number sent from the address.


#### Response (Success, no wallets) `200 OK, application/json`
```json
[
]

```

#### Response (Success) `200 OK, application/json`
```json
[
    {
        "name": "first",
        "address": "H3rKFuQySycSigA8saiDfmBw3tUE4HEN9",
        "balance": "0",
        "nonce": 0
    },
    {
        "name": "second",
        "address": "H2pM9frgtFwqcBBrVCQr9x8yJ4Dy89ag3",
        "balance": "0",
        "nonce": 0
    },
    {
        "name": "third",
        "address": "HD Wallet (use post method with {name, password, index})",
        "balance": "0",
        "nonce": 0
    }
]
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | Parameter should be defined
500 | `INTERNAL_SERVER_ERROR` | FAILED getWalletList: Internal Server Error Error: {ERROR MESSAGE FROM SERVER}

## Getting information of specific wallet

Request specific wallet by `name` or `address` parameter.

### Query method (specified wallet)

```endpoint
GET /api/v3/wallet?{name}
```

```endpoint
GET /api/v3/wallet?{address}
```

#### Example request with `name` specified

```curl
curl -X GET http://localhost:2442/api/v3/wallet?name=first \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `address` specified

```curl
curl -X GET http://localhost:2442/api/v3/wallet?address=H3rKFuQySycSigA8saiDfmBw3tUE4HEN9 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`name`  | Yes* | The name of requested wallet
`address` | Yes* | The address of the requested wallet

_*Only one of either the `name` or `address` parameter should be used. If both are passed as query parameters, the `name` parameter is used._

### URL method (specified wallet)

```endpoint
GET /api/v3/wallet/:name
```

```endpoint
GET /api/v3/wallet/:address
```

#### Example request with `name` specified

```curl
curl -X GET http://localhost:2442/api/v3/wallet/first \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `address` specified

```curl
curl -X GET http://localhost:2442/api/v3/wallet/H3rKFuQySycSigA8saiDfmBw3tUE4HEN9 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`name`  | Yes* | The name of requested wallet
`address` | Yes* | The address of the requested wallet

_*Only one of either the `name` or `address` parameter should be used. If both are passed as query parameters, the `name` parameter is used._

### Response (specified wallet) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
`name` | string | The name of a wallet.
`address` | string | A Hycon wallet public address.
`balance` | string | The total circulation of HYCON coin.
`nonce` | number | The transaction number sent from the address.

#### Response (Success)
```json
{
    "name": "first",
    "address": "H3rKFuQySycSigA8saiDfmBw3tUE4HEN9",
    "balance": "0",
    "nonce": 0
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | should provide count or host as query param or path parameter undefined
404 | `NOT_FOUND` | nonexist not found


## Delete Wallet

Delete a wallet from the node using either the `name` or `address` parameter.

### Query method (delete wallet)

```endpoint
DELETE /api/v3/wallet?{name}
```

```endpoint
DELETE /api/v3/wallet?{address}
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`name`  | Yes* | The name of requested wallet
`address` | Yes* | The address of the requested wallet

_*Only one of either the `name` or `address` parameter should be used. If both are passed as query parameters, the `name` parameter is used._

#### Example request with `name`

```curl
curl -X DELETE http://localhost:2442/api/v3/wallet?name=first \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `address`
```curl
curl -X DELETE http://localhost:2442/api/v3/wallet?address=H3rKFuQySycSigA8saiDfmBw3tUE4HEN9 \
-H 'Content-Type: application/json;charset=utf-8'
```

### URL method (delete wallet)

```endpoint
DELETE /api/v3/wallet/:name
```

```endpoint
DELETE /api/v3/wallet/:address
```

#### Example request with `name`

```curl
curl -X DELETE http://localhost:2442/api/v3/wallet/first \
-H 'Content-Type: application/json;charset=utf-8'
```

#### Example request with `address`
```curl
curl -X DELETE http://localhost:2442/api/v3/wallet/H3rKFuQySycSigA8saiDfmBw3tUE4HEN9 \
-H 'Content-Type: application/json;charset=utf-8'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Required | Description 
----------|----------|------------
`name`  | Yes* | The name of requested wallet
`address` | Yes* | The address of the requested wallet

_*Only one of either the `name` or `address` parameter should be used. If both are passed as query parameters, the `name` parameter is used._

### Response (delete wallet) `200 OK, application/json`

Parameter | Type | Description
----------|------|------------
**success** | boolean | The result of deleting wallet.

#### Response (Success)

```json
{
    "success": true
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | Parameter should be defined
404 | `NOT_FOUND` | first not found

## Generate random mnemonic

Request a random BIP-39 mnemonic phrase used to generate a wallet address.

```endpoint
POST /api/v3/wallet
```

#### Example request to generate random mnemonic

```curl
curl -X POST http://localhost:2442/api/v3/wallet \
-H 'Content-Type: application/json;charset=utf-8' \
--data '{}'
```

#### Example request to generate random mnemonic in specific language
```curl
curl -X POST http://localhost:2442/api/v3/wallet \
-H 'Content-Type: application/json;charset=utf-8' \
--data '{"language": "french"}'
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`language` | string | Optional | Regional language to generate or to recover your wallet's mnemonic phrase. (_Default: English_)

_You can send an empty body request to get a new random mnemonic._ <br/>
_A body request without a name will generate a new random mnemonic in ${language}._

### Response (random mnemonic) `200 OK, application/json`

Parameter | Type | Description 
----------|------|-------------
**mnemonic** | string | Random mnemonic

#### Response (Success)
```json
{
    "mnemonic": "screen main cannon inmate believe multiply maze panic check soda lesson sibling"
}
```

#### Response (Success) `--data '{"language": "french"}'`

```json
{
    "mnemonic": "inutile espèce brioche devancer coton dimanche risque ambre client vipère spécial cerise"
}
```

## Generate / Recover normal wallet or HD wallet with password or passphrase

Request to generate a normal wallet or HD wallet. To generate an HD wallet instead of a single-address wallet, pass the `HD` parameter as `true`. The `index` parameter can only be used with HD wallet creation and references the HD wallet address to return in the JSON response.

```endpoint
POST /api/v3/wallet
```

#### Example request (HD Wallet)

```curl
curl -X POST http://localhost:2442/api/v3/wallet \
-H 'Content-Type: application/json;charset=utf-8' \
--data '{"name": "HD_wallet","language": "korean", "HD": true, "passphrase": "is used with mnemonic to generate your wallet", "password": "is used to encrypt wallet file", "index": 3}`
```

#### Example request (Single Address Wallet)

```curl
curl -X POST http://localhost:2442/api/v3/wallet \
-H 'Content-Type: application/json;charset=utf-8' \
--data '{"name": "HD_wallet","language": "korean", "HD": true, "passphrase": "is used with mnemonic to generate your wallet", "password": "is used to encrypt wallet file", "index": 3}`
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type | Required | Description 
----------|------|----------|------------
`name` | string | Optional | The wallet name what you want to save.
`language` | string | Optional | Regional language to generate or to recover your wallet's mnemonic phrase. (_Default: English_)
`mnemonic` | string | Optional | A 12- to 24-word BIP39 phrase to seed your wallet.
`password` | string | Optional | Password to encrypt your wallet.
`passphrase` | string | Optional | Passphrase for your wallet.
`HD` | boolean | Optional | When it is set as true, it will make or recover HD wallet.
`index` | number | Optional | The index of the HD wallet to lookup. If present, a specific wallet address will be returned from this HDwallet (_HD Wallet only_).

You can create an HD or normal wallet. <br/>
_(You must give $name otherwise it generates random mnemonic)_ 


### Response (generate/recover wallet) `200 OK, application/json`

Parameter | Type | Description 
----------|------|-------------
**name** | string | The created wallet name.
**address** | string | The created or recovered wallet public address. 
**balance** | string | The total circulation of HYCON coin.
**nonce** | number |  The transaction number sent from the address.
**mnemonic** | string | Random mnemonic or mnemonic used to create the wallet. (_Only when request mnemonic or create/recover wallet_) 
**index** | number | The index of the HD wallet to lookup. (_HD Wallet only_) 


#### Response (Success - HD Wallet)

```json
{
    "name": "HD_wallet",
    "address": "H3jbvMss7E2xjso9sxcSTjw2WcQ5e6Qjg",
    "balance": "0",
    "nonce": 0,
    "mnemonic":"위성 그제서야 변명 슬쩍 여행 할머니 하반기 범위 햇살 월세 마음 조직",
    "index": 3
}
```

#### Response (Success - Single Address Wallet)

```json
{
    "name": "Non_HD_wallet",
    "address": "H4M6CQ41SRjSfKpucKfNCsRE9xk2k7hSc",
    "balance": "0",
    "nonce": 0,
    "mnemonic": "army pumpkin disease sniff raw since nut icon biology word cute hover"
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | wallet duplicate name

## Decrypt and get an HD wallet information

Get the details of an HD wallet address from the `index` parameter passed in the request. 

```endpoint
POST /api/v3/wallet
```

**Request Body - `Content-Type: application/json;charset=utf-8`**

Parameter | Type |  Description 
----------|------|------------
**name** | string | The wallet name what you want to find.
**password** | string | Password to decrypt your wallet.
**index** | number | The index of the HD wallet to lookup. If present, a specific wallet address will be returned from this HD wallet.

#### Example request

```curl
curl -X POST http://localhost:2442/api/v3/wallet \
-H 'Content-Type: application/json;charset=utf-8' \
--data '{"name": "HD_wallet", "password": "is used to encrypt wallet file", "index": 1}'
```

### Response (get HD wallet information) `200 OK, application/json`

Parameter | Type | Description 
----------|------|-------------
**name** | string | The wallet name.
**address** | string | The wallet public address. 
**balance** | string | The total circulation of HYCON coin of the address.
**nonce** | number |  The transaction number sent from the address.
**index** | number | The index of the HD wallet to lookup. (_HD Wallet only_) 

You can get a HD wallet information. <br/>
_(Must give $name, $index, $password parameters)_ 

#### Response (Success)

```json
{
    "name": "HD_wallet",
    "address": "HgAoS1pywdcbjkvubr4ovaYEXLoB3Xj9",
    "balance": "0",
    "nonce": 0,
    "index": 1
}
```

**Response Error Table**

Status | Error | Message
-------|-------|--------
400 | `BAD_REQUEST` | Wallet HD_wallet is exist and it is not a HD wallet. Error: Fail to loadKeys : Error: error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt.