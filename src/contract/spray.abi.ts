
const MODESPRAY_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'initialOwner', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'recipients', type: 'address[]' },
      { internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
    ],
    name: 'disperseEther',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address[]', name: 'recipients', type: 'address[]' },
      { internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
    ],
    name: 'disperseToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// Direcciones del contrato por cadena
const CONTRACT_ADDRESSES = {
  // Ethereum
  1: '0x7731F8D7B0DaC6C09c1B713C9A608e7854B0F7F5',
  // Mode Testnet
  919: '0x7731F8D7B0DaC6C09c1B713C9A608e7854B0F7F5',
  // Mode Mainnet
  34443: '0x7731F8D7B0DaC6C09c1B713C9A608e7854B0F7F5',
  // Base Sepolia
  84532: '0x7731F8D7B0DaC6C09c1B713C9A608e7854B0F7F5',
  // Base Mainnet
  8453: '0x7731F8D7B0DaC6C09c1B713C9A608e7854B0F7F5',
  // Optimism Sepolia
  11155420: '0x7731F8D7B0DaC6C09c1B713C9A608e7854B0F7F5',
  // Optimism Mainnet
  10: '0x7731F8D7B0DaC6C09c1B713C9A608e7854B0F7F5',
  // Hardhat/Local
  31337: '0xDBA7D42BAC31Fa58A6Ab7ffE95D9FfA4bD398A0f',
} as const;

// Exportamos una estructura unificada que facilita el acceso a contratos por cadena
export const SPRAY_CONTRACTS_ABI = Object.entries(CONTRACT_ADDRESSES).reduce(
  (acc, [chainId, address]) => ({
    ...acc,
    [chainId]: {
      ModeSpray: {
        address,
        abi: MODESPRAY_ABI,
      },
    },
  }),
  {}
) as Record<keyof typeof CONTRACT_ADDRESSES, { ModeSpray: { address: string; abi: typeof MODESPRAY_ABI } }>;

// Función de ayuda para obtener el contrato por chainId
export function getSprayContract(chainId: number) {
  return SPRAY_CONTRACTS_ABI[chainId as keyof typeof CONTRACT_ADDRESSES]?.ModeSpray;
}