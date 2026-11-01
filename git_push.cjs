const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'script_status.txt');
function log(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

fs.writeFileSync(logFile, 'Script started: ' + new Date().toISOString() + '\n');

function run(cmd) {
  log(`> ${cmd}`);
  try {
    const out = execSync(cmd, {
      cwd: __dirname,
      encoding: 'utf8',
      timeout: 15000,
      input: '', // close stdin so no interactive prompt can hang
      stdio: ['pipe', 'pipe', 'pipe']
    });
    log(out || '(ok)');
    return out;
  } catch (err) {
    log(`ERROR on ${cmd}: ` + (err.stderr ? err.stderr.toString() : err.message));
    return null;
  }
}

try {
  run('git init');
  run('git config user.name "Skeletor-Pirate"');
  run('git config user.email "skeletor.pirate@gmail.com"');
  run('git branch -M main');
  run('git add -A');
  run('git commit -m "feat: complete noClue website replicating WeAreDevelopers architecture"');
  
  // Check if remote origin already exists
  const remote = run('git remote -v');
  log('Remote is: ' + remote);

  // GitHub CLI non-interactive repo create or push
  run('gh repo view Skeletor-Pirate/noclue');
  
  // If repo exists or not:
  run('gh repo create Skeletor-Pirate/noclue --public --source=. --remote=origin --push --confirm');
  
  // Also try direct push
  run('git push -u origin main');
} catch (e) {
  log('Fatal exception: ' + e.message);
}

log('Script finished at ' + new Date().toISOString());
