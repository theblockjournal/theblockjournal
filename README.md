# [theblockjournal](https://theblockjournal.itsarnavb.me)

Theblockjournal is an open-source tool that makes it easy to publish signatures of text, creating a proof of existence, integrity, and ownership. It's inspired from the concept of an [Inventor's notebook](https://en.wikipedia.org/wiki/Inventor%27s_notebook).

It's an attempt to combine the function of a blockchain notary with that of a note-taking app like Evernote or OneNote. 

[Instructions for use](https://imgur.com/a/l6X5GSs)

## The contracts

Theblockjournal is written to allow the use of multiple contracts, deployed across the mainnet and testnets. The design goals of existing and future contracts include:

* Create a proof of existence, integrity, and ownership
* Minimize transaction costs of signature creation
* Seek no 'rent' for signature creation (theblockjournal acts as a utility)

## Current deployment

This project is just an early prototype. The contract is deployed on the Rinkeby testnet at [0x32e30615fdf4631259644af2305e2317f5b28a0e](https://rinkeby.etherscan.io/address/0x32e30615fdf4631259644af2305e2317f5b28a0e). The contract is extremely simple, and I'm sure there are flaws currently invisible to me. 

The web app is available on a testing subdomain: https://theblockjournal.itsarnavb.me. It's written in VueJS, and makes use of Ethjs to interface with Metamask and the Ethereum blockchain.

Thanks for checking theblockjournal out.
