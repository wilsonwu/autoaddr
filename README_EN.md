# 📦 Auto Address - Smart Shipping Address Parser

Auto Address is a Chrome extension based on Azure OpenAI, designed for e-commerce sellers, customer service, and logistics personnel. It intelligently extracts name, phone, address, and other information from cluttered text, displaying it in a structured way with one-click copy support, greatly improving the efficiency of filling out shipping forms.

## ✨ Features

- **🤖 Smart Parsing**: Uses powerful GPT models to accurately identify name, province/state, city, house number, detailed address, and zip code.
- **🧩 Smart Completion**: If province/state information is missing, the extension automatically infers it based on city and country information to ensure completeness.
- **🌍 Multi-language Support**: Supports Chinese and English interfaces, automatically detects browser language, and allows manual switching in settings.
- **🖥️ Side Panel Mode**: Designed with Chrome Side Panel to stay open on the side while browsing web pages (like shipping form pages) without interference.
- **📋 One-Click Copy**: Each parsed field supports click-to-copy, eliminating the hassle of manual selection.
- **🔒 Privacy & Security**: Connects directly to your own Azure OpenAI service; data does not pass through any third-party relay servers.

## 🚀 Installation Guide

Since this extension is not yet published on the Chrome Web Store, you need to install it via "Load unpacked":

1. **Download Code**: Download the ZIP package of this repository and unzip it, or `git clone` directly to local.
2. **Open Extension Management**: Enter `chrome://extensions` in the Chrome address bar and press Enter.
3. **Enable Developer Mode**: Click the "Developer mode" switch in the top right corner of the page.
4. **Load Extension**: Click "Load unpacked" in the top left corner and select the folder where this project is located.
5. **Pin Icon**: Click the puzzle icon in the browser toolbar, find "Auto Address", and click the pin to fix it for easy access.

## ⚙️ Configuration

Before use, you need to configure the Azure OpenAI service:

1. Click the extension icon to open the side panel.
2. If not configured, the interface will prompt you to enter the **Options** page (or right-click the extension icon and select "Options").
3. Fill in the following information:
   - **Language**: Select interface language (中文 / English)
   - **Endpoint**: Your Azure OpenAI resource endpoint (e.g., `https://your-resource.openai.azure.com/`)
   - **API Key**: Your Azure OpenAI key
   - **Deployment**: Your deployed model name (gpt-3.5-turbo or gpt-4 recommended)
4. Click **Save Configuration**.

## 📖 Usage

1. **Open Extension**: Click the extension icon in the top right corner of the browser, and the side panel will open automatically.
2. **Input Text**: Paste the text containing recipient information into the input box.
   > Example: John Doe 13800138000 32 Kennedy Avenue, Long Eaton, Derbyshire, UK
3. **Click Parse**: Click the "Parse Address" button.
4. **Copy Results**: After parsing is complete, click on the corresponding field (such as name, address, etc.), and the content will be automatically copied to the clipboard, then paste it into the corresponding input box of the courier system.

## 📦 Packaging for Release

If you need to manually package the extension for release, use the following command (Mac/Linux):

```bash
zip -r autoaddr_v1.2.zip . -x "*.git*" -x ".venv/*" -x "*.DS_Store*" -x "*.zip" -x "screenshot-*.png" -x "store_screenshot-*.png" -x "generate_icon.html" -x "resize_screenshots.py" -x "__pycache__/*"
```

## 🛡️ Privacy Policy

This extension does not collect any user data. All API requests are sent directly from your browser to your configured Azure OpenAI endpoint. See [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) for details.
