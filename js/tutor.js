const Tutor = (() => {
  let apiKey = null;
  let conversationHistory = [];
  let currentContext = null;

  const SYSTEM_PROMPT = `You are Lyra, a friendly, encouraging coding tutor with a fantasy elf aesthetic. You have fiery red hair, bright green eyes, and pointed ears. You're passionate about teaching code and genuinely excited when students learn something new.

Your teaching style:
- Explain concepts clearly with real-world analogies
- Use concrete examples with actual runnable code
- Be encouraging but honest — celebrate progress, gently correct mistakes
- Never just give away answers to challenges; instead guide with hints
- Use emojis sparingly but effectively (✨ 💡 🎯 🐛 🚀)
- Keep responses concise but thorough
- When showing code, always use proper markdown code blocks with language labels
- If someone is stuck, break the problem into smaller steps
- Praise good practices (descriptive variable names, comments, clean code)

Personality traits:
- Warm, patient, and never condescending
- Gets genuinely excited about elegant solutions
- Has a gentle sense of humor
- Celebrates "aha!" moments

When reviewing code:
1. Start with what they did RIGHT
2. Explain any issues clearly
3. Offer the corrected version
4. Explain WHY the correction matters`;

  function setApiKey(key) {
    apiKey = key.trim();
    sessionStorage.setItem('lyra_api_key', apiKey);
  }

  function getApiKey() {
    if (!apiKey) apiKey = sessionStorage.getItem('lyra_api_key');
    return apiKey;
  }

  function setContext(ctx) { currentContext = ctx; conversationHistory = []; }

  async function chat(userMessage, onChunk) {
    const key = getApiKey();
    if (!key) throw new Error('NO_API_KEY');

    let fullMessage = userMessage;
    if (currentContext && conversationHistory.length === 0) {
      fullMessage = `[Context: Teaching ${currentContext.track}, lesson: ${currentContext.lesson}]\n\n${userMessage}`;
    }

    conversationHistory.push({ role: 'user', parts: [{ text: fullMessage }] });

    const contents = conversationHistory.map((msg, i) => {
      if (i === 0) {
        return {
          role: msg.role,
          parts: [{ text: SYSTEM_PROMPT + '\n\n---\n\n' + msg.parts[0].text }]
        };
      }
      return msg;
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      if (response.status === 400 || response.status === 403) throw new Error('INVALID_KEY');
      throw new Error(err.error?.message || `API error ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      for (const line of chunk.split('\n')) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (!data || data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              fullText += text;
              if (onChunk) onChunk(text);
            }
          } catch {}
        }
      }
    }

    conversationHistory.push({ role: 'model', parts: [{ text: fullText }] });
    return fullText;
  }

  async function reviewCode(code, challenge, onChunk) {
    return chat(`Review my code for the challenge "${challenge.title}":\n\`\`\`\n${code}\n\`\`\`\nWhat did I do well? What can I improve?`, onChunk);
  }

  async function getHint(code, challenge, failedTests, onChunk) {
    const failedList = failedTests.map(t => `- ${t}`).join('\n');
    return chat(`I'm stuck on "${challenge.title}". My code:\n\`\`\`\n${code}\n\`\`\`\nFailing tests:\n${failedList}\n\nCan you give me a hint without giving away the answer?`, onChunk);
  }

  return { setApiKey, getApiKey, setContext, chat, reviewCode, getHint };
})();

window.Tutor = Tutor;
