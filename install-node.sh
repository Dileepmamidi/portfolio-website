#!/bin/bash

echo "🚀 Node.js Installation Guide for macOS"
echo "========================================"
echo ""

# Check if Node.js is already installed
if command -v node &> /dev/null; then
    echo "✅ Node.js is already installed!"
    node -v
    npm -v
    exit 0
fi

echo "Node.js is not installed. Choose an installation method:"
echo ""
echo "METHOD 1: Install Node.js directly (EASIEST - Recommended)"
echo "-----------------------------------------------------------"
echo "1. Visit: https://nodejs.org/"
echo "2. Download the LTS version for macOS"
echo "3. Run the installer (.pkg file)"
echo "4. Restart your terminal"
echo ""
echo "METHOD 2: Install using Homebrew"
echo "---------------------------------"
echo "First, install Homebrew (if not installed):"
echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
echo ""
echo "Then install Node.js:"
echo "  brew install node"
echo ""
echo "METHOD 3: Install using nvm (Node Version Manager)"
echo "---------------------------------------------------"
echo "Step 1: Install Xcode Command Line Tools (REQUIRED FIRST):"
echo "  xcode-select --install"
echo "  (This will open a dialog - click 'Install')"
echo ""
echo "Step 2: After Xcode tools are installed, install nvm:"
echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
echo ""
echo "Step 3: Restart terminal or run:"
echo "  source ~/.zshrc"
echo ""
echo "Step 4: Install Node.js LTS:"
echo "  nvm install --lts"
echo "  nvm use --lts"
echo ""
echo "After installation, verify with:"
echo "  node -v"
echo "  npm -v"
echo ""







