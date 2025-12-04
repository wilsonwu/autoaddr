# 隐私政策 (Privacy Policy)

**生效日期 / Effective Date：** 2025年12月3日 / December 3, 2025

---

## 中文版 (Chinese Version)

感谢您使用 **Auto Address**（以下简称“本插件”）。我们非常重视您的隐私。本隐私政策旨在说明我们如何收集、使用和保护您的信息。

### 1. 数据收集与使用

#### 1.1 用户输入的数据

本插件的主要功能是解析快递运单地址。

- **处理方式**：您在插件输入框中粘贴或输入的地址文本，仅用于发送至您配置的 Azure OpenAI 服务进行解析。
- **存储**：本插件**不会**在我们的服务器上存储您输入的任何地址信息。解析结果仅在您的浏览器本地显示。

#### 1.2 配置信息 (API Key 等)

为了使用 Azure OpenAI 服务，您需要在设置页面配置 Endpoint、API Key 和 Deployment Name。

- **存储**：这些敏感信息仅存储在您浏览器的本地存储中 (`chrome.storage.sync`)。
- **同步**：如果您登录了 Chrome 浏览器并开启了同步功能，这些配置可能会在您的不同设备间同步，该过程由 Google Chrome 浏览器加密并管理。
- **使用**：这些凭据仅用于验证和调用您指定的 Azure OpenAI 接口，绝不会发送给本插件开发者或任何其他第三方。

### 2. 数据共享与第三方服务

本插件依赖 **Azure OpenAI Service** 来提供智能解析功能。

- 当您点击“智能解析地址”按钮时，您输入的文本将直接发送至您在设置中配置的 Azure OpenAI Endpoint。
- 请参阅 [Microsoft Privacy Statement](https://privacy.microsoft.com/en-us/privacystatement) 以了解 Microsoft Azure 如何处理数据。

除上述情况外，本插件**不会**收集、出售或与任何第三方共享您的个人数据。

### 3. 权限说明

本插件需要以下权限才能正常工作：

- **storage**: 用于在本地保存您的 Azure OpenAI 配置信息。
- **sidePanel**: 用于在浏览器侧边栏显示插件界面，方便您在浏览网页时使用。

### 4. 变更通知

如果我们决定更改隐私政策，我们将在此页面上发布这些更改。建议您定期查看本隐私政策。

### 5. 联系我们

如果您对本隐私政策有任何疑问，请通过 GitHub 仓库提交 Issue 与我们联系。

---

## English Version

Thank you for using **Auto Address** (hereinafter referred to as "this extension"). We value your privacy very much. This Privacy Policy aims to explain how we collect, use, and protect your information.

### 1. Data Collection and Use

#### 1.1 User Input Data

The main function of this extension is to parse shipping addresses.

- **Processing**: The address text you paste or enter in the extension input box is only used to be sent to the Azure OpenAI service you configured for parsing.
- **Storage**: This extension **does not** store any address information you enter on our servers. The parsing results are displayed locally in your browser only.

#### 1.2 Configuration Information (API Key, etc.)

To use the Azure OpenAI service, you need to configure the Endpoint, API Key, and Deployment Name on the settings page.

- **Storage**: These sensitive details are stored only in your browser's local storage (`chrome.storage.sync`).
- **Sync**: If you are logged into the Chrome browser and have sync enabled, these configurations may be synced across your devices, a process encrypted and managed by Google Chrome.
- **Usage**: These credentials are only used to authenticate and call the Azure OpenAI interface you specified and will never be sent to the extension developer or any other third party.

### 2. Data Sharing and Third-Party Services

This extension relies on **Azure OpenAI Service** to provide intelligent parsing capabilities.

- When you click the "Parse Address" button, the text you entered is sent directly to the Azure OpenAI Endpoint you configured in the settings.
- Please refer to the [Microsoft Privacy Statement](https://privacy.microsoft.com/en-us/privacystatement) to understand how Microsoft Azure handles data.

Except for the above, this extension **does not** collect, sell, or share your personal data with any third parties.

### 3. Permissions

This extension requires the following permissions to function properly:

- **storage**: Used to save your Azure OpenAI configuration information locally.
- **sidePanel**: Used to display the extension interface in the browser side panel for easy access while browsing web pages.

### 4. Changes to This Policy

If we decide to change our privacy policy, we will post those changes on this page. We encourage you to review this privacy policy periodically.

### 5. Contact Us

If you have any questions about this Privacy Policy, please contact us by submitting an Issue via the GitHub repository.