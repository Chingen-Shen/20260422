# 資料模型文件 (Data Models)

## 1. 籤詩資料結構 (Oracle Poem Schema)
我們使用一個單一的 JSON 陣列來儲存 60 首甲子籤詩。

### 1.1 `poems.json` 物件結構
| 欄位 | 類型 | 說明 | 範例 |
| :--- | :--- | :--- | :--- |
| `id` | Integer | 籤號 (1-60) | `1` |
| `title` | String | 籤詩標題/卦頭 | `"第一籤 甲子"` |
| `poem_content` | String | 詩文本體 (文言文) | `"日出便見風雲散..."` |
| `story` | String | 籤詩典故 | `"包公請雷驚仁宗"` |
| `type` | String | 吉凶等級 | `"大吉" / "中平" / "下下"` |
| `explanation` | String | 總體白話解說 | `"事情已經明朗，好運將至..."` |
| `details` | Object | 各項指引細節 | (包含婚姻、事業、健康、旅行、求財、尋人) |

---

## 2. 抽籤歷史紀錄 (Draw History Model)
使用 SQLite 儲存，用於展示用戶的「個人功德簿」。

| 欄位名稱 | 類型 | 說明 |
| :--- | :--- | :--- |
| `id` | Integer | Primary Key, 自動遞增 |
| `user_id` | String | 用戶唯一識別碼 (Session/UUID) |
| `timestamp` | DateTime | 抽籤日期時間 |
| `category` | String | 求籤類別 (如：運勢、感情、事業) |
| `poem_id` | Integer | 抽到的籤號 (1-60) |
| `user_name` | String | 用戶自訂姓名 (信士/信女) |

---

## 3. 感恩功德計數 (Merit & Gratitude Model)
**核心原則**：非實質金錢交易，以「虔誠感恩的心」進行記數。

| 欄位名稱 | 類型 | 說明 |
| :--- | :--- | :--- |
| `id` | Integer | Primary Key |
| `user_id` | String | 關聯用戶 |
| `timestamp` | DateTime | 感恩/捐獻時間 |
| `merit_points` | Integer | 功德點數 (點擊一次增加一定點數) |
| `message` | String | 祈福或感謝語 |

### 3.1 功德等級 (Merit Levels)
系統會根據累計的 `merit_points` 自動轉換等級：
- 0 - 100: 初心信士
- 101 - 500: 虔誠大德
- 501+: 福緣居士

---

## 4. Session 狀態模型 (Session State Model)
後端 Session 追蹤動態狀態，確保儀式流程完整。

| 欄位名稱 | 說明 |
| :--- | :--- |
| `session_id` | 用戶目前的會話 ID |
| `current_step` | 當前步驟 (`INIT`, `PRAYED`, `GRANTED`, `DRAWN`, `CONFIRMED`) |
| `temp_poem_id` | 尚未確認前暫存的籤號 |
| `start_time` | 本次求籤開始時間 |
