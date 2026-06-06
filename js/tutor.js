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
- Point out common pitfalls before they happen

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

    conversationHistory.push({ role: 'user', content: userMessage });

    let systemPrompt = SYSTEM_PROMPT;
    if (currentContext) {
      systemPrompt += `\n\nCurrent lesson context:\nTrack: ${currentContext.track}\nLesson: ${currentContext.lesson}`;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: conversationHistory,
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      if (response.status === 401) throw new Error('INVALID_KEY');
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
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
              fullText += parsed.delta.text;
              if (onChunk) onChunk(parsed.delta.text);
            }
          } catch {}
        }
      }
    }

    conversationHistory.push({ role: 'assistant', content: fullText });
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
