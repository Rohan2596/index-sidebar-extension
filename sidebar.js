const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqXmeLLqmm2Se-5KNCQP-rwincJ7RdUzjGJXeGOLNeoYmtdrr-ldSSrRQoM3MyHO0KCDXWHz5ll64H/pub?gid=0&single=true&output=csv';

// 1. TAB SWITCHING LOGIC
document.getElementById('btn-market').onclick = () => switchTab('market');
document.getElementById('btn-info').onclick = () => switchTab('info');

function switchTab(tab) {
  document.getElementById('market-page').classList.toggle('active', tab === 'market');
  document.getElementById('info-page').classList.toggle('active', tab === 'info');
  document.getElementById('btn-market').classList.toggle('selected', tab === 'market');
  document.getElementById('btn-info').classList.toggle('selected', tab === 'info');
}

// 2. DATA FETCHING & AUTO-REFRESH
async function loadData() {
  const table = document.getElementById('data-table');
  const refreshBtn = document.getElementById('refresh');
  
  try {
    refreshBtn.innerText = "UPDATING...";
    const res = await fetch(SHEET_URL);
    const csv = await res.text();
    const rows = csv.split('\n').map(r => r.split(',')).filter(r => r.length > 5);
    
    rows.shift(); // Remove header
    table.innerHTML = '';

    rows.forEach(col => {
      const clean = (v) => v?.replace(/"/g, '').trim() || '-';
      const parseNum = (v) => parseFloat(v) || 0;

      const symbol = clean(col[0]);
      const name = clean(col[1]);
      const d1 = parseNum(col[3]);
      const d5 = parseNum(col[4]);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span style="font-weight:700">${symbol}</span><br><span style="font-size:9px;color:#787b86">${name}</span></td>
        <td style="font-weight:600">${parseNum(col[2]).toLocaleString()}</td>
        <td class="${d1 >= 0 ? 'pos' : 'neg'}">${d1 >= 0 ? '+' : ''}${d1.toFixed(2)}%</td>
        <td class="${d5 >= 0 ? 'pos' : 'neg'}">${d5 >= 0 ? '+' : ''}${d5.toFixed(2)}%</td>
        <td>${parseNum(col[5]).toLocaleString()}</td>
        <td>${parseNum(col[6]).toLocaleString()}</td>
        <td>${parseNum(col[7]).toLocaleString()}</td>
        <td>${parseNum(col[8]).toLocaleString()}</td>
        <td style="color:#bb86fc">${parseNum(col[9]).toLocaleString()}</td>
        <td style="color:#ff8f00">${parseNum(col[10]).toLocaleString()}</td>
      `;
      
    //   tr.onclick = () => {
    //     const t = symbol.includes(':') ? symbol.split(':')[1] : symbol;
    //     chrome.tabs.create({ url: `https://in.tradingview.com/symbols/${t}/` });
    //   };
      table.appendChild(tr);
    });
    
    refreshBtn.innerText = "REFRESH NOW";
  } catch (err) {
    refreshBtn.innerText = "OFFLINE";
  }
}

// Initialize
document.getElementById('refresh').onclick = loadData;
loadData();

// AUTO REFRESH: Every 30 seconds
// Google Finance "Publish to Web" typically updates every 5 mins, 
// so 2-minute polling ensures you catch the update as soon as it's live.
setInterval(loadData, 30000);