# 作業：設計 Skill + 打造 AI 聊天機器人 (宮廟抽籤系統版)

> **繳交方式**：將你的 GitHub repo 網址貼到作業繳交區
> **作業性質**：個人作業

---

## 作業目標

使用 Antigravity Skill 引導 AI，完成一個具備前後端的「線上宮廟抽籤系統」。
重點不只是「讓程式跑起來」，而是透過設計 Skill，學會用結構化的方式與 AI 協作開發。

---

## 繳交項目

你的 GitHub repo 需要包含以下內容：

### 1. Skill 設計（`.agents/skills/`）

為以下五個開發階段＋提交方式各設計一個 SKILL.md：

| 資料夾名稱        | 對應指令          | 說明                                                                           |
| ----------------- | ----------------- | ------------------------------------------------------------------------------ |
| `prd/`          | `/prd`          | 產出 `docs/PRD.md`                                                           |
| `architecture/` | `/architecture` | 產出 `docs/ARCHITECTURE.md`                                                  |
| `models/`       | `/models`       | 產出 `docs/MODELS.md`                                                        |
| `implement/`    | `/implement`    | 產出程式碼（**已指定**：HTML 前端 + Flask + SQLite 後端）              |
| `test/`         | `/test`         | 產出手動測試清單                                                               |
| `commit/`       | `/commit`       | 自動 commit + push（**已指定**：使用者與 email 使用 Antigravity 預設值） |

### 2. 開發文件（`docs/`）

用你設計的 Skill 產出的文件，需包含：

- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/MODELS.md`

### 3. 程式碼

一個可執行的線上宮廟抽籤系統，需支援以下功能：

| 功能           | 說明                                       | 是否完成 |
| -------------- | ------------------------------------------ | -------- |
| 擬真儀式流程   | 包含參拜、擲筊動畫、隨機抽籤與二次確認     | O        |
| 籤詩資料庫     | 內建 60 首經典甲子籤詩內容                 | O        |
| 個人功德簿     | 記錄過去所有的抽籤歷史與問事類別           | O        |
| 感恩功德系統   | 非金錢交易，透過「誠心感恩」記數累積功德   | O        |
| 數據持久化     | 使用 SQLite 確保重啟後紀錄不消失           | O        |
| 功德等級晉升   | 根據感恩次數自動晉升稱號 (如：大德、居士)  | O        |

### 4. 系統截圖（`screenshots/`）

在 `screenshots/` 資料夾放入以下截圖：

- `ritual.png`：系統抽籤主畫面與動畫
 <img width="1920" height="1080" alt="螢幕擷取畫面 (6)" src="https://github.com/user-attachments/assets/4f75edcb-3988-4210-914a-981b201b5bd4" />
<img width="1920" height="1080" alt="螢幕擷取畫面 (5)" src="https://github.com/user-attachments/assets/ced58e36-abfd-46dc-99a8-450b6820e97b" />
<img width="1920" height="1080" alt="螢幕擷取畫面 (4)" src="https://github.com/user-attachments/assets/ae647fa7-5252-40ab-8887-c17163fcb15b" />
<img width="1920" height="1080" alt="螢幕擷取畫面 (2)" src="https://github.com/user-attachments/assets/7a7c6c2b-ad33-4b0b-ac61-559d96161bc7" />
<img width="1920" height="1080" alt="螢幕擷取畫面 (1)" src="https://github.com/user-attachments/assets/48e24dff-563b-42cd-9812-bd86972a12cd" />

- `history.png`：個人功德簿與歷史紀錄畫面 部分
 <img width="1920" height="1080" alt="螢幕擷取畫面 (3)" src="https://github.com/user-attachments/assets/69152c7c-9b3e-4f2c-9770-737cacacda97" />
<img width="1920" height="1080" alt="螢幕擷取畫面 (7)" src="https://github.com/user-attachments/assets/1ab3e94d-6a9f-4761-b63b-7601c7bcc236" />


### 5. 心得報告（本 README.md 下方）

在表格下方填寫。

---

## 啟動方式

```bash
# 1. 建立虛擬環境
python -m venv venv

# 2. 啟動虛擬環境 (Windows)
.\venv\Scripts\activate

# 3. 安裝套件
pip install -r requirements.txt

# 4. 啟動伺服器
python app.py
# 開啟瀏覽器：http://localhost:5000
```

---

## 心得報告

**姓名**：沈靖恩
**學號**：D1321025

### 問題與反思

**Q1. 你設計的哪一個 Skill 效果最好？為什麼？哪一個效果最差？你認為原因是什麼？**

> 效果最好的是 `prd` 與 `architecture`。透過結構化的 Prompt 指引，AI 能快速產出符合產業標準的文件，為後續開發奠定穩固基礎。
> 效果最差的是 `test`。他在測試網站的時候，測試不到一些很人性化<像是抽出來的籤是不是有邏輯意思或是全籤空白這種情況。

---

**Q2. 在用 AI 產生程式碼的過程中，你遇到什麼問題是 AI 沒辦法自己解決、需要你介入處理的？**

> 有些細節ai沒辦法自己做到完全符合使用者的意思。要不斷地和ai舉例說明，他才會比較理解。

---

**Q3. 把「感恩功德系統」從金錢改為「誠心記數」的設計，對使用者體驗有什麼影響？**

> 將「宗教信仰」與「現代互動」結合，減少商業氣息，增加儀式感與趣味性。使用者透過「誠心感恩」來累積功德等級（如大德、居士），更符合線上體驗的輕量化需求，也讓系統更具備社交分享與自我激勵的正面價值。

**心得**

> 這次課程我更深刻了解antigravity的運作模式，他在執行的每一個步驟我都有參與到，不同以往連他為什麼卡住都不知道。今天我能夠清楚認知他在做哪一個SKILL，在做甚麼規劃什麼，也能夠介入他生成的文件進行我想要的修改，整體非常有參與感!
