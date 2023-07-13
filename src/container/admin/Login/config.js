

export const TODO_LIST_ADDRESS = '0x07865c6e87b9f70255377e024ace6630c1eaa37f'

export const TODO_LIST_ABI = [
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"internalType": "address",
"name": "_owner",
"type": "address"
},
{
"indexed": true,
"internalType": "address",
"name": "_spender",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "_value",
"type": "uint256"
}
],
"name": "Approval",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"internalType": "address",
"name": "from",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "value",
"type": "uint256"
}
],
"name": "Burn",
"type": "event"
},
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"internalType": "address",
"name": "from",
"type": "address"
},
{
"indexed": true,
"internalType": "address",
"name": "to",
"type": "address"
},
{
"indexed": false,
"internalType": "uint256",
"name": "value",
"type": "uint256"
}
],
"name": "Transfer",
"type": "event"
},
{
"constant": false,
"inputs": [
{
"internalType": "address",
"name": "_spender",
"type": "address"
},
{
"internalType": "uint256",
"name": "_value",
"type": "uint256"
}
],
"name": "approve",
"outputs": [
{
"internalType": "bool",
"name": "success",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"internalType": "uint256",
"name": "_value",
"type": "uint256"
}
],
"name": "burn",
"outputs": [
{
"internalType": "bool",
"name": "success",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"internalType": "address",
"name": "_from",
"type": "address"
},
{
"internalType": "uint256",
"name": "_value",
"type": "uint256"
}
],
"name": "burnFrom",
"outputs": [
{
"internalType": "bool",
"name": "success",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [],
"name": "buy",
"outputs": [],
"payable": true,
"stateMutability": "payable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"internalType": "address",
"name": "target",
"type": "address"
},
{
"internalType": "uint256",
"name": "mintedAmount",
"type": "uint256"
}
],
"name": "mintToken",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "sell",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [],
"name": "setContractbalance",
"outputs": [],
"payable": true,
"stateMutability": "payable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"internalType": "uint256",
"name": "newSellPrice",
"type": "uint256"
},
{
"internalType": "uint256",
"name": "newBuyPrice",
"type": "uint256"
}
],
"name": "setPrices",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"internalType": "address",
"name": "_to",
"type": "address"
},
{
"internalType": "uint256",
"name": "_value",
"type": "uint256"
}
],
"name": "transfer",
"outputs": [
{
"internalType": "bool",
"name": "success",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"internalType": "address",
"name": "_from",
"type": "address"
},
{
"internalType": "address",
"name": "_to",
"type": "address"
},
{
"internalType": "uint256",
"name": "_value",
"type": "uint256"
}
],
"name": "transferFrom",
"outputs": [
{
"internalType": "bool",
"name": "success",
"type": "bool"
}
],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"internalType": "address",
"name": "newOwner",
"type": "address"
}
],
"name": "transferOwnership",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "initialSupply",
"type": "uint256"
},
{
"internalType": "string",
"name": "tokenName",
"type": "string"
},
{
"internalType": "string",
"name": "tokenSymbol",
"type": "string"
}
],
"payable": true,
"stateMutability": "payable",
"type": "constructor"
},
{
"constant": true,
"inputs": [
{
"internalType": "address",
"name": "tokenOwner",
"type": "address"
},
{
"internalType": "address",
"name": "spender",
"type": "address"
}
],
"name": "allowance",
"outputs": [
{
"internalType": "uint256",
"name": "remaining",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [
{
"internalType": "address",
"name": "tokenOwner",
"type": "address"
}
],
"name": "balanceOf",
"outputs": [
{
"internalType": "uint256",
"name": "balance",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "decimals",
"outputs": [
{
"internalType": "uint256",
"name": "balance",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "owner",
"outputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [],
"name": "totalSupply",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
}
]