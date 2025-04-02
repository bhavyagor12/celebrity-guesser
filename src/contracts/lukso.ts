export const lukso_contract_dets = {
  contractAddress: "0x3347b4d90ebe72befb30444c9966b2b990ae9fcb",
  abi: [
    {
      type: "constructor",
      inputs: [],
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
      name: "fundContract",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "games",
      inputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "gameId",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "player",
          type: "address",
          internalType: "address",
        },
        {
          name: "difficulty",
          type: "uint8",
          internalType: "enum GuessTheCharacter.Difficulty",
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
      name: "getPlayerActiveGames",
      inputs: [
        {
          name: "player",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
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
      name: "playerGames",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
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
      name: "resolveGame",
      inputs: [
        {
          name: "gameId",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "won",
          type: "bool",
          internalType: "bool",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "rewardMultipliers",
      inputs: [
        {
          name: "",
          type: "uint8",
          internalType: "enum GuessTheCharacter.Difficulty",
        },
      ],
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
      name: "startGame",
      inputs: [
        {
          name: "_difficulty",
          type: "uint8",
          internalType: "enum GuessTheCharacter.Difficulty",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
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
          name: "gameId",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
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
          name: "gameId",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
        {
          name: "player",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "difficulty",
          type: "uint8",
          indexed: false,
          internalType: "enum GuessTheCharacter.Difficulty",
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
          name: "gameId",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
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
      ],
      anonymous: false,
    },
  ],
};
