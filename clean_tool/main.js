document.addEventListener('DOMContentLoaded', function() {
  const jsonInput = document.getElementById('jsonInput');
  const expandBtn = document.getElementById('expandBtn');
  const compressBtn = document.getElementById('compressBtn');
  const copyBtn = document.getElementById('copyBtn');
  const statusDiv = document.getElementById('status');

  // 展开JSON
  expandBtn.addEventListener('click', function() {
    try {
      const jsonString = jsonInput.value.trim();
      if (!jsonString) {
        showStatus('请输入JSON数据', true);
        return;
      }
      
      const jsonObject = JSON.parse(jsonString);
      jsonInput.value = JSON.stringify(jsonObject, null, 2);
      showStatus('JSON展开成功');
    } catch (e) {
      showStatus('无效的JSON格式: ' + e.message, true);
    }
  });

  // 压缩JSON
  compressBtn.addEventListener('click', function() {
    try {
      const jsonString = jsonInput.value.trim();
      if (!jsonString) {
        showStatus('请输入JSON数据', true);
        return;
      }
      
      const jsonObject = JSON.parse(jsonString);
      jsonInput.value = JSON.stringify(jsonObject);
      showStatus('JSON压缩成功');
    } catch (e) {
      showStatus('无效的JSON格式: ' + e.message, true);
    }
  });

  // 复制到剪贴板
  copyBtn.addEventListener('click', function() {
    if (!jsonInput.value.trim()) {
      showStatus('没有内容可复制', true);
      return;
    }
    
    navigator.clipboard.writeText(jsonInput.value)
      .then(() => {
        showStatus('已复制到剪贴板');
      })
      .catch(err => {
        showStatus('复制失败: ' + err, true);
      });
  });

  // 显示状态信息
  function showStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.style.color = isError ? 'red' : 'green';
    
    // 3秒后清除状态信息
    setTimeout(() => {
      statusDiv.textContent = '';
    }, 3000);
  }
});