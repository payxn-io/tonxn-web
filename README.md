# Tonxn Web Front-End Interface

Welcome to the **Tonxn Web Front-End Interface**, the front-end interface for **Tonxn**—a decentralized stablecoin lending and borrowing platform built on the TON blockchain. With **Tonxn**, users can deposit various assets as collateral (such as TON, DOGS, BTC, ETH, SOL) and borrow **pUSD**, a stablecoin pegged to the USD. The platform allows users to manage their positions, monitor collateral values, and mint or repay stablecoins seamlessly through this web interface.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**Tonxn** leverages the TON blockchain's security and efficiency to offer decentralized lending and borrowing services. Through **Tonxn**, users can:
- Deposit assets like TON, DOGS, BTC, ETH, SOL as collateral.
- Borrow **pUSD**, a stablecoin pegged 1:1 to the US Dollar.
- Easily repay loans and manage positions in a decentralized environment.

This **web front-end interface** provides a simple, responsive platform for interacting with the Tonxn protocol. You can deposit collateral, borrow pUSD, check your collateral ratio, and repay loans with ease.

## Features
- **Deposit Collateral**: Securely deposit assets (TON, DOGS, BTC, ETH, SOL) into the platform as collateral.
- **Borrow pUSD**: Borrow pUSD against your collateral, which can be used for various purposes like trading, saving, or paying.
- **Manage Collateral**: View the collateral value, monitor your assets, and keep track of your loans.
- **Repay pUSD Loans**: Repay borrowed pUSD at any time, maintaining your collateral ratio.
- **Collateral Ratio Monitoring**: Keep track of the collateral-to-loan ratio to avoid liquidation.
- **Stable Interface**: A clean, user-friendly interface optimized for performance.

## Getting Started

### Prerequisites
To run this project locally, you need:
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Key Dependencies:
- **React.js**: Front-end framework for building the UI.
- **Web3.js**: To interact with the TON blockchain.
- **ethers.js**: For Ethereum-based interactions (if applicable).
- **Redux**: For state management of user positions and balances.

## Installation

Follow these steps to get the project up and running locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/payxn-io/tonxn-web.git
   ```
2. Navigate to the project directory:
   ```bash
cd tonxn-web
   ```
3. Install the dependencies:
   ```bash
yarn install
   ```
4. Start the local development server:
   ```bash
yarn start
   ```
The application will be running on http://localhost:3000.

###Usage
Once the project is running locally, users can access the interface to:

Connect to the TON blockchain: Click the “Connect Wallet” button to link your wallet to the platform.
Deposit Collateral: Choose an asset, enter the deposit amount, and submit the transaction.
Borrow pUSD: After depositing collateral, choose how much pUSD you wish to borrow and submit the transaction.
Repay Loan: Track your borrowed pUSD and repay it as needed.
Check Collateral Ratio: View your collateral-to-loan ratio and avoid liquidation.
View User Dashboard: View all details about your positions, collateral, borrowed pUSD, and more.


