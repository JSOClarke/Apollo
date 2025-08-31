# Apollo Finance

**Apollo Finance** is an open-source project inspired by **Projection Labs** and **YNAB**.

The goal of this project is to provide a **simple, intuitive, and user-friendly platform** to project your finances, track spending, and export data for **internal or external reporting**.

<img width="2869" height="1547" alt="Apollo Finance Screenshot" src="https://github.com/user-attachments/assets/e31b4cd5-542c-4c54-a735-b2fec9512185" />

## Features

- Project your finances with ease
- Export financial data for external tracking
- Simple and intuitive user interface
- Lightweight and easy to set up

## Build & Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Dependencies

- [Node.js](https://nodejs.org/en/download)
- npm (included in Node.js)

### Getting Started

1. Clone or download this repository.

   ```sh
   git clone https://github.com/jellyfin/jellyfin-web.git
   cd jellyfin-web
   ```

2. Install build dependencies in the project directory.

   ```sh
   npm install
   ```

3. Run the web client with webpack for local development.

   ```sh
   npm start
   ```

4. Build the client with sourcemaps available.

   ```sh
   npm run build:development
   ```

## Directory Structure

.
└── src
├── apps
│   ├── dashboard # Admin dashboard app
│   ├── experimental # New experimental app
│   ├── stable # Classic (stable) app
│   └── wizard # Startup wizard app
├── assets # Static assets
