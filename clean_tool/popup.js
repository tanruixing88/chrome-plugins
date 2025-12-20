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
        showStatus('Please enter JSON data', true);
        return;
      }
      
      const jsonObject = JSON.parse(jsonString);
      jsonInput.value = JSON.stringify(jsonObject, null, 2);
      showStatus('JSON expanded successfully');
    } catch (e) {
      showStatus('Invalid JSON format', true);
    }
  });

  // 压缩JSON
  compressBtn.addEventListener('click', function() {
    try {
      const jsonString = jsonInput.value.trim();
      if (!jsonString) {
        showStatus('Please enter JSON data', true);
        return;
      }
      
      const jsonObject = JSON.parse(jsonString);
      jsonInput.value = JSON.stringify(jsonObject);
      showStatus('JSON compressed successfully');
    } catch (e) {
      showStatus('Invalid JSON format', true);
    }
  });

  // 复制到剪贴板
  copyBtn.addEventListener('click', function() {
    if (!jsonInput.value.trim()) {
      showStatus('Nothing to copy', true);
      return;
    }
    
    navigator.clipboard.writeText(jsonInput.value)
      .then(() => {
        showStatus('Copied to clipboard');
      })
      .catch(err => {
        showStatus('Failed to copy: ' + err, true);
      });
  });

  // 显示状态信息
  function showStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.style.color = isError ? 'red' : 'green';
    setTimeout(() => {
      statusDiv.textContent = '';
    }, 3000);
  }
});