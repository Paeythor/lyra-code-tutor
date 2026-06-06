const Progress = (() => {
  const KEY = 'lyra_progress';

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || { completedLessons: {}, xp: 0 };
    } catch { return { completedLessons: {}, xp: 0 }; }
  }

  function save(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

  function completeLesson(lessonId, xpGained) {
    const data = load();
    if (!data.completedLessons[lessonId]) {
      data.completedLessons[lessonId] = { completedAt: new Date().toISOString(), xp: xpGained };
      data.xp += xpGained;
    }
    save(data);
    return data;
  }

  function isCompleted(lessonId) { return !!load().completedLessons[lessonId]; }
  function getXP() { return load().xp; }

  function getLevel() {
    const xp = getXP();
    if (xp < 50)   return { level: 1, title: 'Apprentice',   next: 50 };
    if (xp < 150)  return { level: 2, title: 'Explorer',     next: 150 };
    if (xp < 300)  return { level: 3, title: 'Builder',      next: 300 };
    if (xp < 500)  return { level: 4, title: 'Developer',    next: 500 };
    if (xp < 800)  return { level: 5, title: 'Engineer',     next: 800 };
    if (xp < 1200) return { level: 6, title: 'Architect',    next: 1200 };
    return           { level: 7, title: 'Code Wizard',  next: 9999 };
  }

  function getCompletedCount() { return Object.keys(load().completedLessons).length; }
  function reset() { save({ completedLessons: {}, xp: 0 }); }

  return { completeLesson, isCompleted, getXP, getLevel, getCompletedCount, load, reset };
})();

window.Progress = Progress;
