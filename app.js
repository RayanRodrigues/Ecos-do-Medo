const state = {
  allItems: [],
  filteredItems: [],
  visibleCount: 9,
  filters: {
    query: "",
    type: "",
    classification: "",
    risk: "",
  },
};

const refs = {
  searchInput: document.getElementById("searchInput"),
  typeFilter: document.getElementById("typeFilter"),
  cardsGrid: document.getElementById("cardsGrid"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
  resultCount: document.getElementById("resultCount"),
  cardTemplate: document.getElementById("cardTemplate"),
  chips: document.querySelectorAll(".chip"),
  title: document.getElementById("siteTitle"),
};

async function init() {
  try {
    const response = await fetch("./data/items.json");
    if (!response.ok) {
      throw new Error("Falha ao carregar os dados do acervo.");
    }

    const data = await response.json();
    state.allItems = data
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    bindEvents();
    applyFilters();
    setGlitchPulse();
  } catch (error) {
    refs.resultCount.textContent = "Nao foi possivel carregar os arquivos.";
    refs.cardsGrid.innerHTML = `<p>${error.message}</p>`;
    refs.loadMoreBtn.hidden = true;
  }
}

function bindEvents() {
  refs.searchInput.addEventListener("input", (event) => {
    state.filters.query = event.target.value.trim().toLowerCase();
    resetAndFilter();
  });

  refs.typeFilter.addEventListener("change", (event) => {
    state.filters.type = event.target.value;
    resetAndFilter();
  });

  refs.chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.filterGroup;
      const value = chip.dataset.filterValue;
      const next = state.filters[group] === value ? "" : value;

      state.filters[group] = next;

      refs.chips.forEach((other) => {
        if (other.dataset.filterGroup === group) {
          const pressed = other.dataset.filterValue === next;
          other.setAttribute("aria-pressed", String(pressed));
        }
      });

      resetAndFilter();
    });
  });

  refs.loadMoreBtn.addEventListener("click", () => {
    state.visibleCount += 9;
    render();
  });
}

function resetAndFilter() {
  state.visibleCount = 9;
  applyFilters();
}

function applyFilters() {
  const { query, type, classification, risk } = state.filters;

  state.filteredItems = state.allItems.filter((item) => {
    const matchesType = !type || item.type === type;
    const matchesClass = !classification || item.classification === classification;
    const matchesRisk = !risk || normalizeText(item.risk) === normalizeText(risk);

    const searchTarget = [
      item.title,
      item.author,
      item.excerpt,
      item.id,
      ...(Array.isArray(item.tags) ? item.tags : []),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchTarget.includes(query);

    return matchesType && matchesClass && matchesRisk && matchesQuery;
  });

  render();
}

function render() {
  refs.cardsGrid.innerHTML = "";

  if (!state.filteredItems.length) {
    refs.resultCount.textContent = "Nenhum arquivo encontrado para os filtros atuais.";
    refs.loadMoreBtn.hidden = true;
    return;
  }

  const visibleItems = state.filteredItems.slice(0, state.visibleCount);
  const fragment = document.createDocumentFragment();

  visibleItems.forEach((item) => {
    const cardNode = refs.cardTemplate.content.firstElementChild.cloneNode(true);

    cardNode.querySelector(".doc-id").textContent = `ARQUIVO ${item.id}`;
    cardNode.querySelector("h2").textContent = item.title;
    cardNode.querySelector(".excerpt").textContent = item.excerpt;

    const meta = cardNode.querySelector(".meta");
    meta.innerHTML = [
      `<li>Tipo: ${item.type}</li>`,
      `<li>Autor: ${item.author || "Desconhecido"}</li>`,
      `<li>Classificacao: Classe ${item.classification}</li>`,
      `<li class="${riskClass(item.risk)}">Risco Cognitivo: ${item.risk || "Nao informado"}</li>`,
    ].join("");

    const openLink = cardNode.querySelector(".open-btn");
    openLink.href = `document.html?slug=${encodeURIComponent(item.slug)}`;
    openLink.setAttribute("aria-label", `Abrir arquivo ${item.id} - ${item.title}`);

    fragment.appendChild(cardNode);
  });

  refs.cardsGrid.appendChild(fragment);

  refs.resultCount.textContent = `${state.filteredItems.length} arquivo(s) encontrado(s). Exibindo ${visibleItems.length}.`;
  refs.loadMoreBtn.hidden = visibleItems.length >= state.filteredItems.length;
}

function riskClass(value = "") {
  const normalized = normalizeText(value);
  if (normalized === "alto") return "risk-high";
  if (normalized === "medio") return "risk-medium";
  return "risk-low";
}

function normalizeText(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function setGlitchPulse() {
  if (!refs.title) return;

  setInterval(() => {
    const shouldGlitch = Math.random() < 0.22;
    if (!shouldGlitch) return;

    refs.title.classList.add("glitch");
    setTimeout(() => refs.title.classList.remove("glitch"), 180);
  }, 4200);
}

init();
