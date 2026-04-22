# Test Plan: [專案名稱]

## 1. 測試目標 (Test Objectives)
- 驗證 [主要功能 A] 是否運作正常。
- 確保後端 FastAPI 與 SQLite 資料持久化正確。
- 檢查前端 HTML/CSS 視覺效果與互動。

## 2. 測試範疇 (Scope)
- **前端**：UI 元件、響應式佈局、使用者互動流。
- **後端**：API 路由、錯誤處理 (Validation Error)、資料庫 CRUD。

## 3. 測試環境與工具 (Environment & Tools)
- **環境**：Local Development (FastAPI, SQLite)
- **工具**：Pytest (後端), Browser Console / Manual Test (前端)

## 4. 測試案例 (Test Cases)

### 4.1 後端 API 測試
| ID | 測試場景 | 測試步驟 | 預期結果 | 狀態 |
|---|---|---|---|---|
| API-01 | 成功建立資料 | POST `/api/items` 帶入正確 JSON | 回傳 201 並存入 SQLite | [ ] |
| API-02 | 遺漏必填欄位 | POST `/api/items` 帶入不完整資料 | 回傳 422 Validation Error | [ ] |

### 4.2 前端 UI 測試
| ID | 測試場景 | 測試步驟 | 預期結果 | 狀態 |
|---|---|---|---|---|
| UI-01 | 首頁加載 | 開啟 index.html | 顯示 Premium Aesthetics 標題與動畫 | [ ] |
| UI-02 | 表單提交互動 | 點擊提交按鈕 | 顯示載入動畫並彈出成功提示 | [ ] |

## 5. 驗收標準 (Acceptance Criteria)
- [ ] 所有核心 API 回傳正確狀態碼。
- [ ] UI 在行動裝置與桌機均能正確顯示。
- [ ] 無明顯的 JS Runtime Error。

---
*Last Updated: {{DATE}}*
