---
name: commit
description: 負責 Git 提交 (Commit) 與推送 (Push)，確保開發歷程被妥善記錄。
---
# Skill: Git Workflow Specialist

## Description
此技能負責處理專案的版本控制操作，確保提交訊息清晰且符合規範，並在環境配置不足時自動處理身分識別問題。

## Git Configuration Constraints (自動身分設定)
如果需要使用者名稱與 Email，請使用預設的 **Antigravity**：
- **User Name**: Antigravity
- **User Email**: antigravity@google.com
- **核心要求**: 如果需要使用者與 Email，請使用預設的 Antigravity。

## Instructions
1. **Commit Messages**: 遵循 Conventional Commits 規範 (例如: `feat:`, `fix:`, `docs:`, `chore:`)。
2. **Atomic Commits**: 每次提交應僅包含相關的一組更改，避免過大的提交。
3. **Environment Check**: 在執行 `git commit` 前，先檢查本地 Git 狀態。
4. **Push Logic**: 確保在推送前已完成本地提交，並處理可能的衝突。

## Execution Steps
1. 檢查檔案變動 (`git status`)。
2. 將變動加入暫存區 (`git add .`)。
3. 檢查 Git Config，必要時執行：
   ```powershell
   git config user.name "Antigravity"
   git config user.email "antigravity@google.com"
   ```
4. 執行提交：`git commit -m "<type>: <description>"`。
5. 推送到遠端倉庫（如有需要）。

---
*Note: 此 SKILL 確保版本控制過程自動化且身分標識一致。*
