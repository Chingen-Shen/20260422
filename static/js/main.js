let currentPoem = null;

function showStep(stepId) {
    const steps = ['step-pray', 'step-jiaobei', 'step-poem'];
    steps.forEach(id => {
        document.getElementById(id).style.display = (id === stepId) ? 'block' : 'none';
    });
}

function startRitual() {
    const name = document.getElementById('user-name').value;
    if (!name) {
        alert("請輸入姓名以示虔誠。");
        return;
    }
    showStep('step-jiaobei');
}

async function castJiaobei() {
    const btn = document.getElementById('btn-cast');
    btn.disabled = true;
    
    // 動畫效果
    const jb1 = document.getElementById('jb1');
    const jb2 = document.getElementById('jb2');
    jb1.style.transform = "translateY(-50px) rotate(360deg)";
    jb2.style.transform = "translateY(-50px) rotate(-360deg)";
    
    const response = await fetch('/api/cast_jiaobei', { method: 'POST' });
    const data = await response.json();
    
    setTimeout(() => {
        // 設定結果形狀
        if (data.code === 'success') {
            jb1.classList.remove('flip');
            jb2.classList.add('flip');
        } else if (data.code === 'maybe') {
            jb1.classList.remove('flip');
            jb2.classList.remove('flip');
        } else {
            jb1.classList.add('flip');
            jb2.classList.add('flip');
        }
        
        jb1.style.transform = "";
        jb2.style.transform = "";
        
        document.getElementById('jiaobei-result').innerText = `結果：${data.result}`;
        
        if (data.code === 'success') {
            document.getElementById('btn-next').style.display = 'inline-block';
            btn.style.display = 'none';
        } else {
            btn.disabled = false;
            alert(`神明指示：${data.result}。請重新祈福請示。`);
        }
    }, 600);
}

async function drawPoem() {
    const response = await fetch('/api/draw_poem', { method: 'POST' });
    currentPoem = await response.json();
    
    const display = document.getElementById('poem-display');
    display.innerHTML = `
        <div class="poem-card">
            <div class="poem-title">${currentPoem.title}</div>
            <p><strong>詩曰：</strong></p>
            <p style="font-size: 1.2rem; line-height: 1.8;">${currentPoem.poem_content || "載入中..."}</p>
            <hr>
            <p><strong>故事：</strong> ${currentPoem.story || "無"}</p>
            <p><strong>解說：</strong> ${currentPoem.explanation || "請待實體籤詩解讀。"}</p>
        </div>
    `;
    
    showStep('step-poem');
}

async function confirmPoem() {
    const name = document.getElementById('user-name').value;
    const category = document.getElementById('category').value;
    
    await fetch('/api/save_record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_name: name,
            category: category,
            poem_id: currentPoem.id
        })
    });
    
    alert("功德圓滿，紀錄已存入您的個人功德簿。");
    resetRitual();
    updateMeritBook();
}

function resetRitual() {
    showStep('step-pray');
    document.getElementById('btn-cast').style.display = 'inline-block';
    document.getElementById('btn-cast').disabled = false;
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('jiaobei-result').innerText = "";
}

async function expressGratitude() {
    const response = await fetch('/api/gratitude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: "虔誠感恩" })
    });
    const data = await response.json();
    
    document.getElementById('merit-points').innerText = data.total_merit;
    document.getElementById('merit-rank').innerText = data.rank;
    alert(data.message);
}

async function fetchHistoryByName() {
    const name = document.getElementById('user-name').value;
    if (!name) {
        alert("請輸入姓名以查詢您的專屬紀錄。");
        return;
    }
    
    const list = document.getElementById('history-list');
    list.style.display = 'block';
    list.innerHTML = '<p style="text-align: center;">查詢中...</p>';
    
    const response = await fetch(`/api/history?name=${encodeURIComponent(name)}`);
    const history = await response.json();
    
    if (history.length === 0) {
        list.innerHTML = '<p style="text-align: center;">尚未有您的專屬紀錄</p>';
    } else {
        list.innerHTML = history.map(h => `
            <div class="history-item">
                <strong>${h.timestamp}</strong> - [${h.category}] 抽得第 ${h.poem_id} 籤
                <br><small>信眾：${h.user_name}</small>
            </div>
        `).join('');
    }
}

async function updateMeritBook() {
    // 僅更新功德與稱號，不再自動載入歷史清單以維護隱私
    const mResp = await fetch('/api/gratitude', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: "系統刷新", refresh: true }) 
    });
    const mData = await mResp.json();
    document.getElementById('merit-points').innerText = mData.total_merit;
    document.getElementById('merit-rank').innerText = mData.rank;
}

// 頁面載入時初始化
updateMeritBook();
