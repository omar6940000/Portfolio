try {
  const preferredTheme = localStorage.getItem('omar-theme');
  if (preferredTheme === 'light' || preferredTheme === 'dark') document.documentElement.dataset.theme = preferredTheme;
} catch (_) { /* Storage may be unavailable when opened directly from a file. */ }
