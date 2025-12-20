// 检测页面中的JSON内容并添加格式化按钮
function detectAndFormatJSON() {
  const preElements = document.querySelectorAll('pre');
  
  preElements.forEach(pre => {
    try {
      const textContent = pre.textContent.trim();
      // 简单检测是否为JSON格式
      if ((textContent.startsWith('{') && textContent.endsWith('}')) || 
          (textContent.startsWith('[') && textContent.endsWith(']'))) {
        JSON.parse(textContent); // 验证是否为有效JSON
        
        // 添加格式化按钮
        if (!pre.parentNode.querySelector('.json-format-btn')) {
          const button = document.createElement('button');
          button.className = 'json-format-btn';
          button.textContent = 'Format JSON';
          button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1000;
            padding: 5px 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          `;
          
          button.addEventListener('click', function() {
            try {
              const formatted = JSON.stringify(JSON.parse(textContent), null, 2);
              pre.textContent = formatted;
              pre.style.whiteSpace = 'pre';
              button.textContent = 'Compress JSON';
              
              // 切换功能
              button.onclick = function() {
                const compressed = JSON.stringify(JSON.parse(pre.textContent));
                pre.textContent = compressed;
                pre.style.whiteSpace = 'pre-wrap';
                button.textContent = 'Format JSON';
              };
            } catch (e) {
              console.error('Invalid JSON:', e);
            }
          });
          
          pre.style.position = 'relative';
          pre.parentNode.insertBefore(button, pre);
        }
      }
    } catch (e) {
      // 不是有效的JSON，跳过
    }
  });
}

// 页面加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', detectAndFormatJSON);
} else {
  detectAndFormatJSON();
}

// 监听DOM变化，动态检测新添加的JSON内容
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      detectAndFormatJSON();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});