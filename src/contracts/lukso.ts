export const lukso_contract_dets = {
  contractAddress: "0x9db544b32dcdaa4513d535372fc5db7f4e742e93",
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_nftContract",
          type: "address",
          internalType: "address payable",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "fallback",
      stateMutability: "payable",
    },
    {
      type: "receive",
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "baseEntryFee",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "games",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "player",
          type: "address",
          internalType: "address",
        },
        {
          name: "entryFee",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "isActive",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "nftContract",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract CategoryGuessedNFT",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "resolveGame",
      inputs: [
        {
          name: "player",
          type: "address",
          internalType: "address",
        },
        {
          name: "won",
          type: "bool",
          internalType: "bool",
        },
        {
          name: "category",
          type: "string",
          internalType: "string",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "startGame",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "withdrawFunds",
      inputs: [
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "GameLost",
      inputs: [
        {
          name: "player",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "GameStarted",
      inputs: [
        {
          name: "player",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "entryFee",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "GameWon",
      inputs: [
        {
          name: "player",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "reward",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
        {
          name: "category",
          type: "string",
          indexed: false,
          internalType: "string",
        },
      ],
      anonymous: false,
    },
  ],
};
