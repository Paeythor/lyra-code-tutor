const App = (() => {
  let activeEditor = null;
  let currentLesson = null;
  let currentChallenge = null;

  function renderMarkdown(text) {
    return text
      .replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, code) =>
        `<pre class="code-block"><code>${escHtml(code.trim())}</code></pre>`)
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^\> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[hptubl]|<\/|<pre|<block)(.+)$/gm, '<p>$1</p>');
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function showHome() {
    Tutor.setContext(null);
    const level = Progress.getLevel();
    const xp = Progress.getXP();
    const completed = Progress.getCompletedCount();

    const trackCards = CURRICULUM.tracks.map(track => {
      const total = track.lessons.length;
      const done = track.lessons.filter(l => Progress.isCompleted(l.id)).length;
      const pct = Math.round((done / total) * 100);
      return `
        <div class="track-card" onclick="App.showTrack('${track.id}')" style="--track-color:${track.color}">
          <div class="track-icon">${track.icon}</div>
          <div class="track-name">${track.name}</div>
          <div class="track-progress-bar"><div class="track-progress-fill" style="width:${pct}%"></div></div>
          <div class="track-meta">${done}/${total} lessons · ${pct}%</div>
        </div>`;
    }).join('');

    setContent(`
      <div class="home-view">
        <div class="hero-section">
          <div class="avatar-glow">
            <img src="avatar.png" class="hero-avatar" alt="Lyra">
          </div>
          <div class="hero-text">
            <h1>Hey there, Coder! ✨</h1>
            <p>I'm <strong>Lyra</strong>, your personal coding tutor. I'm here to guide you through HTML, CSS, JavaScript, Python, SQL, Git and beyond. Ask me anything!</p>
            <div class="level-badge">
              <span class="level-num">Lv.${level.level}</span>
              <span class="level-title">${level.title}</span>
              <span class="xp-count">${xp} XP</span>
            </div>
            <div class="xp-bar-wrap">
              <div class="xp-bar-fill" style="width:${Math.min(100,(xp/level.next)*100)}%"></div>
            </div>
            <p class="xp-hint">${level.next - xp} XP to next level · ${completed} lessons complete</p>
          </div>
        </div>

        <div class="quick-chat-wrap">
          <h2>💬 Ask Lyra Anything</h2>
          <div id="quick-chat-box" class="quick-chat-box"></div>
          <div class="chat-input-row">
            <textarea id="quick-chat-input" class="chat-textarea" placeholder="Ask me anything about coding..." rows="2"></textarea>
            <button class="btn-send" onclick="App.quickChat()">Send ✨</button>
          </div>
        </div>

        <h2 class="section-title">📚 Learning Tracks</h2>
        <div class="tracks-grid">${trackCards}</div>
      </div>
    `);

    const input = document.getElementById('quick-chat-input');
    if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); App.quickChat(); } });
  }

  function showTrack(trackId) {
    const track = CURRICULUM.tracks.find(t => t.id === trackId);
    if (!track) return;

    const lessonItems = track.lessons.map((lesson, i) => {
      const done = Progress.isCompleted(lesson.id);
      return `
        <div class="lesson-item ${done ? 'done' : ''}" onclick="App.showLesson('${trackId}','${lesson.id}')">
          <div class="lesson-num">${i+1}</div>
          <div class="lesson-info">
            <div class="lesson-title">${lesson.title}</div>
            <div class="lesson-xp">+${lesson.xp} XP</div>
          </div>
          <div class="lesson-status">${done ? '✅' : '▶️'}</div>
        </div>`;
    }).join('');

    setContent(`
      <div class="track-view">
        <button class="btn-back" onclick="App.showHome()">← Back</button>
        <div class="track-header" style="--track-color:${track.color}">
          <span class="track-hero-icon">${track.icon}</span>
          <h1>${track.name} Track</h1>
        </div>
        <div class="lessons-list">${lessonItems}</div>
      </div>
    `);
  }

  function showLesson(trackId, lessonId) {
    const track = CURRICULUM.tracks.find(t => t.id === trackId);
    const lesson = track?.lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    currentLesson = lesson;
    currentChallenge = lesson.challenge;
    Tutor.setContext({ track: track.name, lesson: lesson.title });

    const done = Progress.isCompleted(lesson.id);

    setContent(`
      <div class="lesson-view">
        <button class="btn-back" onclick="App.showTrack('${trackId}')">← ${track.name}</button>
        <div class="lesson-header">
          <h1>${track.icon} ${lesson.title}</h1>
          <span class="xp-badge">+${lesson.xp} XP</span>
          ${done ? '<span class="done-badge">✅ Completed</span>' : ''}
        </div>

        <div class="theory-panel">
          <h2>📖 Theory</h2>
          <div class="theory-content">${renderMarkdown(lesson.theory)}</div>
        </div>

        <div class="challenge-panel">
          <h2>💻 Challenge: ${lesson.challenge.title}</h2>
          <p class="challenge-desc">${lesson.challenge.description}</p>
          <div class="editor-wrap"><div id="code-editor"></div></div>
          <div class="challenge-actions">
            <button class="btn-run" onclick="App.runTests()">▶ Run Tests</button>
            <button class="btn-hint" onclick="App.getHint()">💡 Hint</button>
            <button class="btn-review" onclick="App.reviewCode()">🔍 Ask Lyra to Review</button>
            <button class="btn-reset" onclick="App.resetCode()">↺ Reset</button>
          </div>
          <div id="test-results" class="test-results"></div>
        </div>

        <div class="lesson-chat">
          <h2>💬 Ask Lyra About This Lesson</h2>
          <div id="lesson-chat-box" class="chat-box"></div>
          <div class="chat-input-row">
            <textarea id="lesson-chat-input" class="chat-textarea" placeholder="Ask about this lesson..." rows="2"></textarea>
            <button class="btn-send" onclick="App.lessonChat()">Send ✨</button>
          </div>
        </div>
      </div>
    `);

    initEditor(lesson.challenge.starterCode);
    const input = document.getElementById('lesson-chat-input');
    if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); App.lessonChat(); } });
  }

  function initEditor(code) {
    const el = document.getElementById('code-editor');
    if (!el) return;
    if (activeEditor) { try { activeEditor.toTextArea(); } catch {} activeEditor = null; }
    el.innerHTML = '';
    const ta = document.createElement('textarea');
    ta.value = code;
    el.appendChild(ta);
    if (window.CodeMirror) {
      activeEditor = CodeMirror.fromTextArea(ta, {
        lineNumbers: true, mode: 'javascript', theme: 'dracula',
        indentWithTabs: false, tabSize: 2, lineWrapping: true,
        extraKeys: { Tab: cm => cm.replaceSelection('  ') }
      });
    } else {
      ta.style.cssText = 'width:100%;min-height:200px;font-family:monospace;font-size:14px;padding:12px;background:#282a36;color:#f8f8f2;border:none;border-radius:6px;resize:vertical;';
      activeEditor = { getValue: () => ta.value, setValue: v => { ta.value = v; } };
    }
  }

  function getEditorCode() { return activeEditor ? activeEditor.getValue() : ''; }

  function runTests() {
    if (!currentChallenge) return;
    const code = getEditorCode();
    const results = currentChallenge.tests.map(test => {
      let passed = false;
      try { passed = test.fn(code); } catch {}
      return { desc: test.description, passed };
    });
    const allPassed = results.every(r => r.passed);
    const passCount = results.filter(r => r.passed).length;

    let html = `<div class="test-summary ${allPassed ? 'all-pass' : 'some-fail'}">
      ${allPassed ? '🎉 All tests passed!' : `${passCount}/${results.length} tests passing`}
    </div>`;
    html += results.map(r => `
      <div class="test-row ${r.passed ? 'pass' : 'fail'}">
        <span class="test-icon">${r.passed ? '✅' : '❌'}</span>
        <span class="test-desc">${escHtml(r.desc)}</span>
      </div>`).join('');

    document.getElementById('test-results').innerHTML = html;

    if (allPassed && !Progress.isCompleted(currentLesson.id)) {
      Progress.completeLesson(currentLesson.id, currentLesson.xp);
      updateStats();
      setTimeout(() => showXPToast(currentLesson.xp), 300);
    }
  }

  function resetCode() {
    if (activeEditor && currentChallenge) activeEditor.setValue(currentChallenge.starterCode);
  }

  async function getHint() {
    if (!currentChallenge) return;
    const code = getEditorCode();
    const failed = currentChallenge.tests
      .filter(t => { try { return !t.fn(code); } catch { return true; } })
      .map(t => t.description);
    await streamToChat('lesson-chat-box', null, cb => Tutor.getHint(code, currentChallenge, failed, cb));
  }

  async function reviewCode() {
    if (!currentChallenge) return;
    await streamToChat('lesson-chat-box', null, cb => Tutor.reviewCode(getEditorCode(), currentChallenge, cb));
  }

  async function quickChat() {
    const input = document.getElementById('quick-chat-input');
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    await streamToChat('quick-chat-box', msg, cb => Tutor.chat(msg, cb));
  }

  async function lessonChat() {
    const input = document.getElementById('lesson-chat-input');
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    await streamToChat('lesson-chat-box', msg, cb => Tutor.chat(msg, cb));
  }

  async function streamToChat(boxId, userMsg, apiCall) {
    if (!Tutor.getApiKey()) { showApiKeyModal(); return; }
    const box = document.getElementById(boxId);
    if (!box) return;

    if (userMsg) {
      box.innerHTML += `<div class="msg user-msg"><div class="msg-bubble">${escHtml(userMsg)}</div></div>`;
    }

    const replyEl = document.createElement('div');
    replyEl.className = 'msg lyra-msg';
    replyEl.innerHTML = `<img src="avatar.png" class="msg-avatar" alt="Lyra"><div class="msg-bubble"><span class="thinking">Lyra is thinking...</span></div>`;
    box.appendChild(replyEl);
    box.scrollTop = box.scrollHeight;

    const bubble = replyEl.querySelector('.msg-bubble');
    let fullText = '';

    try {
      await apiCall(chunk => {
        fullText += chunk;
        bubble.innerHTML = renderMarkdown(fullText);
        box.scrollTop = box.scrollHeight;
      });
    } catch (e) {
      if (e.message === 'NO_API_KEY' || e.message === 'INVALID_KEY') {
        bubble.innerHTML = '<em>⚠️ Please set your Gemini API key to chat with Lyra.</em>';
        showApiKeyModal();
      } else {
        bubble.innerHTML = `<em>⚠️ Error: ${escHtml(e.message)}</em>`;
      }
    }
  }

  function showApiKeyModal() {
    showKeyPrompt();
  }

  function saveApiKey() {
    const inp = document.getElementById('api-key-input');
    if (!inp) return;
    const key = inp.value.trim();
    if (!key) { inp.style.borderColor = '#ff5555'; return; }
    Tutor.setApiKey(key);
    closeModal();
  }

  function closeModal() {
    const m = document.getElementById('api-modal');
    if (m) m.style.display = 'none';
  }

  function setContent(html) {
    const main = document.getElementById('main-content');
    if (main) main.innerHTML = html;
  }

  function updateStats() {
    const level = Progress.getLevel();
    const xp = Progress.getXP();
    const el = document.getElementById('nav-xp');
    if (el) el.textContent = `Lv.${level.level} · ${xp} XP`;
  }

  function showXPToast(xp) {
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.textContent = `+${xp} XP! 🎉`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 2500);
  }

  function init() {
    updateStats();
    showHome();
    if (!Tutor.getApiKey()) setTimeout(showApiKeyModal, 1500);
  }

  return { init, showHome, showTrack, showLesson, runTests, resetCode, getHint, reviewCode, quickChat, lessonChat, saveApiKey, closeModal };
})();

window.App = App;
window.addEventListener('DOMContentLoaded', () => App.init());
