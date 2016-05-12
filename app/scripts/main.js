var script = document.createElement('script');
script.src = chrome.extension.getURL('scripts/content.min.js');
document.documentElement.appendChild(script);