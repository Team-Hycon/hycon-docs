# Reference

## Language Support

The Hycon wallet currently supports the following languages, and can generate valid BIP39 mnemonic phrases using any of these supported languages:

Language | `value`
---------|------------
CHINESE SIMPLIFIED | `chinese_simplified`
CHINESE TRADITIONAL | `chinese_traditional`
ENGLISH **(default)** | `english`
FRENCH | `french`
ITALIAN | `italian`
JAPANESE | `japanese`
KOREAN | `korean`
SPANISH | `spanish`

## Blockchain Reorganization

In the event of a _blockchain reorganization_, similar to that in Bitcoin, subscriptions will receive one or more blocks that were previously thought to be in the difficultywise-longest well-formed blockchain. These blocks will be returned as a result of a new difficultywise-longest well-formed blockchain.

<figure>
    <img src="../../content/img/chain_reorg.png" style="width: 75%; max-width: 500px; height: auto; margin: 0 auto;" ></img>
    <span style="font-size: .7em;"><b><i>Figure 1</i></b> | In the event of a subscription trigger from a reorganization, the blocks inside the red box will be returned, wherein the height of the new difficultywise-longest well-formed blockchain is higher than the other.</span>
</figure>

## Changelog

Date | Maintainer | Description
-----|------------|------------
1559718180 | [Shawn Lee](mailto:shawn@glosfer.com) | added `/wallet` section.
1546405803 | [Shawn Lee](mailto:shawn@glosfer.com) | fixed typos, removed request types.
1546232471 | [Jimin Kim](kjm@glosfer.com), [Joonbum Lee](mailto:jblee@glosfer.com), [Shawn Lee](mailto:shawn@glosfer.com) | added `api/v3`. `beta-1.01` release in English.
