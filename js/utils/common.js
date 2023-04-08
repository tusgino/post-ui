export const setTextContent = (parent, selector, text) => {
  if (!parent) return;
  const el = parent.querySelector(selector);
  if (el) el.textContent = text;
}

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength - 1)}…`
}