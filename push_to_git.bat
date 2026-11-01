@echo off
cd /d "c:\Users\HP\app\noclue"
echo Initializing git... > push_log.txt
git init >> push_log.txt 2>&1
git config user.name "Skeletor-Pirate" >> push_log.txt 2>&1
git config user.email "skeletor.pirate@gmail.com" >> push_log.txt 2>&1
git branch -M main >> push_log.txt 2>&1
git add -A >> push_log.txt 2>&1
git commit -m "feat: complete noClue website authentic WeAreDevelopers layout" >> push_log.txt 2>&1

echo Creating GitHub repository... >> push_log.txt
gh repo create Skeletor-Pirate/noclue --public --source=. --remote=origin --push >> push_log.txt 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Repo may already exist, pushing to origin main... >> push_log.txt
    git remote set-url origin https://github.com/Skeletor-Pirate/noclue.git >> push_log.txt 2>&1 || git remote add origin https://github.com/Skeletor-Pirate/noclue.git >> push_log.txt 2>&1
    git push -u origin main >> push_log.txt 2>&1
)

echo Push complete at %date% %time% >> push_log.txt
type push_log.txt
