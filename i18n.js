const translations = {
  "zh-CN": {
    "appTitle": "📦 快递运单助手",
    "inputPlaceholder": "请粘贴包含姓名、电话、地址的文本...\n例如：张三 13800138000 广东省深圳市南山区科技园...",
    "btnParse": "智能解析地址",
    "settingsTitle": "⚙️ Azure OpenAI 设置",
    "lblEndpoint": "Endpoint (端点):",
    "lblApiKey": "API Key (密钥):",
    "lblDeployment": "Deployment (部署名称):",
    "lblLanguage": "语言 (Language):",
    "btnSave": "保存配置",
    "msgSaved": "配置已保存。",
    "msgProcessing": "处理中...",
    "msgCompleting": "正在补全省份信息...",
    "msgConfigError": "请在 <a href='#' id='openOptions'>选项页</a> 配置 Azure OpenAI 设置。",
    "msgEnterAddress": "请输入地址。",
    "msgApiError": "API 错误: ",
    "msgParseError": "无法解析 JSON: ",
    "lblClickToCopy": "点击条目即可复制",
    "fieldName": "姓名",
    "fieldProvince": "省/州",
    "fieldCity": "城市",
    "fieldHouse": "门牌号",
    "fieldAddress": "地址",
    "fieldZip": "邮编"
  },
  "en": {
    "appTitle": "📦 Auto Address Parser",
    "inputPlaceholder": "Paste text containing name, phone, and address here...\nExample: John Doe 13800138000 ...",
    "btnParse": "Parse Address",
    "settingsTitle": "⚙️ Azure OpenAI Settings",
    "lblEndpoint": "Endpoint:",
    "lblApiKey": "API Key:",
    "lblDeployment": "Deployment Name:",
    "lblLanguage": "Language:",
    "btnSave": "Save Configuration",
    "msgSaved": "Options saved.",
    "msgProcessing": "Processing...",
    "msgCompleting": "Completing province info...",
    "msgConfigError": "Please configure Azure OpenAI settings in <a href='#' id='openOptions'>Options</a>.",
    "msgEnterAddress": "Please enter an address.",
    "msgApiError": "API Error: ",
    "msgParseError": "Could not parse JSON: ",
    "lblClickToCopy": "Click item to copy",
    "fieldName": "Name",
    "fieldProvince": "Province/State",
    "fieldCity": "City",
    "fieldHouse": "House No.",
    "fieldAddress": "Address",
    "fieldZip": "Zip Code"
  }
};

let currentLang = "zh-CN";

const i18n = {
  init: () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['language'], (items) => {
        if (items.language) {
          currentLang = items.language;
        } else {
          // Detect browser language
          const browserLang = navigator.language;
          if (browserLang.startsWith('zh')) {
            currentLang = 'zh-CN';
          } else {
            currentLang = 'en';
          }
        }
        resolve(currentLang);
      });
    });
  },
  getText: (key) => {
    return translations[currentLang][key] || key;
  },
  apply: () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = i18n.getText(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });
  },
  getLang: () => currentLang
};
