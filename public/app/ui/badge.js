export function renderBadge(count) {

  if (!count || count <= 0) return "";

  return `<span class="badge">${count}</span>`;
}