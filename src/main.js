import "./styles.css";
import { researchItems } from "./research-items.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="app">
    <header class="topbar">
      <div class="topbar__inner">
        <div>
          <h1>Infra Specs - Investigaciones</h1>
          <p class="subtitle">Documentos de investigacion hechos por IA para revision humana antes de ejecucion.</p>
        </div>
        <div class="count" id="countLabel">0 investigaciones</div>
      </div>
    </header>

    <main class="layout">
      <aside class="sidebar" aria-label="Investigaciones disponibles">
        <div class="tools">
          <div class="field">
            <label for="searchInput">Buscar</label>
            <input id="searchInput" type="search" placeholder="WhatsApp, dash-admins, seguridad">
          </div>
          <div class="field">
            <label for="sortSelect">Orden</label>
            <select id="sortSelect">
              <option value="newest">Mas recientes primero</option>
              <option value="oldest">Mas antiguas primero</option>
              <option value="id-desc">ID descendente</option>
              <option value="id-asc">ID ascendente</option>
            </select>
          </div>
        </div>
        <div class="list" id="list"></div>
      </aside>

      <section class="viewer" aria-label="Visualizador de investigacion">
        <div class="viewer-meta">
          <div class="viewer-heading">
            <div>
              <h2 id="selectedTitle">Selecciona una investigacion</h2>
              <p class="summary" id="selectedSummary">El documento se mostrara aqui.</p>
            </div>
            <div class="actions">
              <a class="button" id="openLink" href="#" target="_blank" rel="noopener">Abrir HTML</a>
            </div>
          </div>
          <div class="meta-grid">
            <div class="meta-box">
              <span class="meta-label">Ticket</span>
              <span class="meta-value" id="selectedId">-</span>
            </div>
            <div class="meta-box">
              <span class="meta-label">Fecha</span>
              <span class="meta-value" id="selectedDate">-</span>
            </div>
            <div class="meta-box">
              <span class="meta-label">Estado</span>
              <span class="meta-value" id="selectedStatus">-</span>
            </div>
            <div class="meta-box">
              <span class="meta-label">Area</span>
              <span class="meta-value" id="selectedArea">-</span>
            </div>
          </div>
        </div>
        <iframe id="preview" title="Vista previa de investigacion"></iframe>
      </section>
    </main>
  </div>
`;

const els = {
  count: document.getElementById("countLabel"),
  list: document.getElementById("list"),
  search: document.getElementById("searchInput"),
  sort: document.getElementById("sortSelect"),
  title: document.getElementById("selectedTitle"),
  summary: document.getElementById("selectedSummary"),
  id: document.getElementById("selectedId"),
  date: document.getElementById("selectedDate"),
  status: document.getElementById("selectedStatus"),
  area: document.getElementById("selectedArea"),
  open: document.getElementById("openLink"),
  preview: document.getElementById("preview"),
};

let selectedId = decodeURIComponent(window.location.hash.replace(/^#/, "")) || researchItems[0]?.id || "";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function itemMatches(item, query) {
  if (!query) return true;
  const haystack = [
    item.id,
    item.title,
    item.summary,
    item.status,
    item.area,
    item.repo,
    ...(item.tags || []),
  ].join(" ");
  return normalize(haystack).includes(normalize(query));
}

function sortedItems(items) {
  const copy = [...items];
  const mode = els.sort.value;
  copy.sort((left, right) => {
    if (mode === "oldest") return left.date.localeCompare(right.date) || left.sequence - right.sequence;
    if (mode === "id-asc") return left.sequence - right.sequence;
    if (mode === "id-desc") return right.sequence - left.sequence;
    return right.date.localeCompare(left.date) || right.sequence - left.sequence;
  });
  return copy;
}

function selectItem(id) {
  const item = researchItems.find((entry) => entry.id === id) || researchItems[0];
  if (!item) return;

  selectedId = item.id;
  window.history.replaceState(null, "", `#${encodeURIComponent(item.id)}`);
  els.title.textContent = item.title;
  els.summary.textContent = item.summary;
  els.id.textContent = item.id;
  els.date.textContent = item.date;
  els.status.textContent = item.status;
  els.area.textContent = item.area;
  els.open.href = item.file;
  els.preview.src = item.file;
  renderList();
}

function renderList() {
  const query = els.search.value.trim();
  const items = sortedItems(researchItems.filter((item) => itemMatches(item, query)));
  els.count.textContent = `${items.length} de ${researchItems.length} investigaciones`;

  if (!items.length) {
    els.list.innerHTML = '<p class="empty">No hay investigaciones que coincidan con la busqueda.</p>';
    return;
  }

  els.list.innerHTML = items
    .map((item) => {
      const current = item.id === selectedId ? "true" : "false";
      const tags = (item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
      return `
        <button class="item" type="button" data-id="${escapeHtml(item.id)}" aria-current="${current}">
          <span class="item-top">
            <span class="item-id">${escapeHtml(item.id)}</span>
            <span class="item-date">${escapeHtml(item.date)}</span>
          </span>
          <span class="item-title">${escapeHtml(item.title)}</span>
          <span class="item-summary">${escapeHtml(item.summary)}</span>
          <span class="tag-row">${tags}</span>
        </button>
      `;
    })
    .join("");
}

els.list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  selectItem(button.dataset.id);
});

els.search.addEventListener("input", renderList);
els.sort.addEventListener("change", renderList);

renderList();
selectItem(selectedId);
