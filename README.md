# Superspray

A modern web application for batch transferring tokens across different blockchain networks. Built with Next.js and React, Superspray provides a seamless interface for sending multiple transactions at once.

## Features

- 🚀 Batch token transfers across multiple addresses
- 🔄 Support for multiple blockchain networks
- 💰 Native token (ETH) and ERC20 token support
- 📋 Clipboard paste functionality for quick address input
- 💳 CSV import support
- 🌙 Dark mode support
- 🔍 Real-time gas fee calculation
- 🎯 User-friendly interface with responsive design

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Viem (for blockchain interactions)
- Lucide React (for icons)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Web3 wallet (like MetaMask)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/wolfcito/superspray-app.git
cd superspray-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_INFURA_KEY=your_infura_key
# Add other required environment variables
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Connect your wallet using the "Connect Wallet" button
2. Select your desired blockchain network
3. Choose the token you want to transfer
4. Add recipient addresses and amounts:
   - Paste from clipboard
   - Import from CSV
   - Add manually
5. Review the total amount and gas fees
6. Click "Spray!" to execute the batch transfer

## Supported Networks

The application supports multiple blockchain networks, including:
- Mode Network
- Base
- Optimism

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

- Never share your private keys or seed phrases
- Always verify transaction details before confirming
- Use hardware wallets for large transactions
- Keep your dependencies up to date

## Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/wolfcito/superspray-app/issues) page
2. Create a new issue if your problem isn't already listed
3. Join our community Discord for real-time support

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the Web3 community for their continuous support
