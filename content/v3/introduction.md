## Introduction `api/v3`

The Hycon API provides a simple and powerful interface for Users to programmatically interact with their wallet and the Hycon public network. This HTTP-based [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) API uses request and response bodies formatted in JSON, and uses built-in HTTP features, like HTTP verbs, which are understood by off-the-shelf HTTP clients. 

API v3 is an architectural upgrade over its previous version, and only supports routes that do not store information on the local system. The endpoints are now distributed into four root routes: [address](/#prerequisites-address), [block](/#prerequisites-block), [network](/#prerequisites-network), and [transactions](/#prerequisites-tx). Starting from API v3, we support both url and query parameters in all requests. We do, however, recommend that requests are sent via query parameters with matching parameter name and value.

This API reference provides information on available endpoints and how to interact with it.

## Installation

To use this API, you will need to run a small local service which will be responsible for managing your wallet and interacting with the blockchain. Your application interacts with this service locally via HTTP API calls.

Team Hycon currently supports Linux, MacOS, and Windows through a compiled release. You may also clone and compile the repository from source. Hycon uses `npm` to run the node with minimal setup.

Please select the release for your operating system [here](https://github.com/team-hycon/hycon-core/releases) or clone the GitHub repository [here](https://github.com/team-hycon/hycon-core) to deploy your local Hycon node.

## Make your first call

After deploying your local Hycon node, let the node synchronize with the public network. This may require an extended amount of time depending on your network connection and geographic location with other nodes on the network. 

You may use `cURL` to send API requests from the terminal. You may also download the latest version of [Postman](https://www.getpostman.com/) for your environment, and send API requests through that application. Please follow the examples in each endpoint for more information. 

**Note that example _request bodies_ and _path parameters_ may not be valid or may return a different request response.** If your node is connected with the Hycon network, please reference the [Official Hycon Public Blockexplorer](https://explorer.hycon.io) for information about the network.


