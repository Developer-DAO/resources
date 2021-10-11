
# 📓 Glossary

## A
- What is a account?
    > An Ethereum account is an entity with an ether (ETH) balance that can send transactions on Ethereum. Accounts can be user-controlled or deployed as smart contracts.
- Ethereum accounts have four fields:

    1. **nonce**:
        > a counter that indicates the number of transactions sent from the account. This ensures transactions are only processed once. In a contract account, this number represents the number of contracts created by the account

    2. **balance**:
        >the number of wei owned by this address. Wei is a denomination of ETH and there are 1e+18 wei per ETH.

    3. **codeHash**:
        > this hash refers to the code of an account on the Ethereum virtual machine (EVM). Contract accounts have code fragments programmed in that can perform different operations. This EVM code gets executed if the account gets a message call. It cannot be changed unlike the other account fields. All such code fragments are contained in the state database under their corresponding hashes for later retrieval. This hash value is known as a codeHash. For externally owned accounts, the codeHash field is the hash of an empty string.

    4. **storageRoot**:
        >Sometimes known as a storage hash. A 256-bit hash of the root node of a Merkle Patricia trie that encodes the storage contents of the account (a mapping between 256-bit integer values), encoded into the trie as a mapping from the Keccak 256-bit hash of the 256-bit integer keys to the RLP-encoded 256-bit integer values. This trie encodes the hash of the storage contents of this account, and is empty by default.

    ![here](https://ethereum.org/static/19443ab40f108c985fb95b07bac29bcb/302a4/accounts.png)

    Diagram adapted from *[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)*

## B
- What is a Blockchain? 
    > A blockchain is a public database that is updated and shared across many computers in a network.
    
    > "Block" refers to data and state being stored in consecutive groups known as "blocks". If you send ETH to someone else, the transaction data needs to be added to a block to be successful.
    
    > "Chain" refers to the fact that each block cryptographically references its parent. In other words, blocks get chained together. The data in a block cannot change without changing all subsequent blocks, which would require the consensus of the entire network.

    [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/intro-to-ethereum/)

## D
- What is a dapp?
    > A decentralized application (dapp) is an application built on a decentralized network that combines a smart contract and a frontend user interface. Note: in Ethereum, smart-contracts are accessible and transparent – like open APIs – so your dapp can even include a smart contract that someone else has written.

    [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/dapps/)

- What is Defi?
   > DeFi is a collective term for financial products and services that are accessible to anyone who can use Ethereum – anyone with an internet connection. With DeFi, the markets are always open and there are no centralized authorities who can block payments or deny you access to anything. Services that were previously slow and at risk of human error are automatic and safer now that they're handled by code that anyone can inspect and scrutinize.

    [Learn more about defi from here](https://ethereum.org/en/defi/)
## E
- What are ERC Tokens?
    > ERCs (Ethereum Request for Comments) are technical documents used by smart contract developers at Ethereum. They define a set of rules required to implement tokens for the Ethereum ecosystem. These documents are usually created by developers, and they include information about protocol specifications and contract descriptions. Before becoming an standard, an ERC must be revised, commented and accepted by the community through an EIP (Ethereum Improvement Proposal).
    
    [Learn more from EthHub Docs](https://docs.ethhub.io/built-on-ethereum/erc-token-standards/what-are-erc-tokens/)

- What is ERC-20?
    > The ERC-20 introduces a standard for Fungible Tokens, in other words, they have a property that makes each Token be exactly the same (in type and value) of another Token. For example, an ERC-20 Token acts just like the ETH, meaning that 1 Token is and will always be equal to all the other Tokens.
    
    [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)

- What is ERC-721?
    > The ERC-721 introduces a standard for NFT, in other words, this type of Token is unique and can have different value than another Token from the same Smart Contract, maybe due to its age, rarity or even something else like its visual.
    
    [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)

- What is Ether?
    > Ether (ETH) is the cryptocurrency used to pay for computing services on the Ethereum blockchain.
    
    [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/intro-to-ether/)

- What is Ethereum?
    > Ethereum is a blockchain platform with its own cryptocurrency, called Ether (ETH) or Ethereum, and its own programming language, called Solidity.
    
    [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/intro-to-ethereum/)

- What is Ethereum virtual Machine(EVM)?
    > The Ethereum protocol itself exists solely for the purpose of keeping the continuous, uninterrupted, and immutable operation of this special state machine; It's the environment in which all Ethereum accounts and smart contracts live. At any given block in the chain, Ethereum has one and only one 'canonical' state, and the EVM is what defines the rules for computing a new valid state from block to block.

    [Learn more from EVM Docs](https://ethereum.org/en/developers/docs/evm/)

## F
- What is a Fungible Token?
    > The ERC-20 introduces a standard for Fungible Tokens, in other words, they have a property that makes each Token be exactly the same (in type and value) of another Token. For example, an ERC-20 Token acts just like the ETH, meaning that 1 Token is and will always be equal to all the other Tokens.
    
    [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)

## G
- What is Gas?
    > Gas is essential to the Ethereum network. It is the fuel that allows it to operate, in the same way that a car needs gasoline to run.
    
    [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/gas/)

## H
- What is Hardhat?
    > Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software. It helps developers manage and automate the recurring tasks that are inherent to the process of building smart contracts and dApps, as well as easily introducing more functionality around this workflow. This means compiling, running and testing smart contracts at the very core.
    
    [Learn more from Hardhat Docs](https://hardhat.org/getting-started/)

## M

- What is Metamask?
    
    > Metamask is a crypto wallet- it allows you to store and transact Ethereum or any other Ethereum-based (ERC- 20) tokens.
     
    [Learn more from metamask docs](https://docs.metamask.io/guide/)



## N
- What is a Non-Fungible Token?
    > A Non-Fungible Token (NFT) is used to identify something or someone in a unique way. This type of Token is perfect to be used on platforms that offer collectible items, access keys, lottery tickets, numbered seats for concerts and sports matches, etc. This special type of Token has amazing possibilities so it deserves a proper Standard, the ERC-721 came to solve that!

    [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)

## S
- What is a Smart Contract?
   > A "smart contract" is simply a program that runs on the Ethereum blockchain. It's a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain.

   [Learn more from Ethereum Docs](https://ethereum.org/en/developers/docs/smart-contracts/)

- What is Solana?
   > Solana is an open source project implementing a new, high-performance, permissionless blockchain. 

   [Learn more from Solana Docs](https://docs.solana.com/introduction)

- What is Solidity?
   > Solidity is an object-oriented, high-level language for implementing smart contracts. Smart contracts are programs which govern the behaviour of accounts within the Ethereum state.
   
   > Solidity is a curly-bracket language. It is influenced by C++, Python and JavaScript, and is designed to target the Ethereum Virtual Machine (EVM). 

   [Learn more from Solidity Docs](https://docs.soliditylang.org/en/v0.8.8/)

## T
- What is a Transaction?
 >An Ethereum transaction refers to an action initiated by an externally-owned account, in other words an account managed by a human, not a contract. For example, if Bob sends Alice 1 ETH, Bob's account must be debited and Alice's must be credited. This state-changing action takes place within a transaction..

## W
- WEB2 VS WEB3
    > Web2 refers to the version of the internet most of us know today. An internet dominated by companies that provide services in exchange for your personal data. Web3, in the context of Ethereum, refers to decentralized apps that run on the blockchain. These are apps that allow anyone to participate without monetising their personal data.


    | Web2                      | Web3 |
    | ------------- | ------------- |
    | Twitter can censor any account or tweet  | Web3 tweets would be uncensorable because control is decentralized  |
    | Payment service may decide to not allow payments for certain types of work  | Web3 payment apps require no personal data and can't prevent payments  |
    | Servers for gig-economy apps could go down and affect worker income | Web3 servers can't go down – they use Ethereum, a decentralized network of 1000s of computers as their backend |


  [ Learn more web2 vs web3 from here](https://ethereum.org/en/developers/docs/web2-vs-web3/)
