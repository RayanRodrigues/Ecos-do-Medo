"use strict";

const data = {
  categoriasGaleria: [
    "Aparicoes Fantasmagoricas",
    "Sombras Anomalas",
    "Disturbios de Luz",
    "Anomalias Termicas",
    "Ectoplasma e Nevoa Paranormal",
    "Evidencias Registradas por Equipamentos",
    "Objetos Amaldicoados",
    "Artefatos Antigos",
    "Locais Assombrados",
    "Casas e Estruturas Abandonadas",
    "Florestas e Areas Naturais Estranhas",
    "Simbolos e Marcas Paranormais",
    "Registros de Investigacao",
    "Rituais e Selos de Protecao",
    "Criaturas e Entidades Desconhecidas",
  ],
  investigadores: [
    {
      nome: "Observador",
      nivel: "Nivel I",
      descricao: "Especialista em leitura de ambiente e percepcao agucada.",
      funcoes: ["Percepcao agucada", "Registrar evidencias", "Identificar areas assombradas"],
    },
    {
      nome: "Pesquisador",
      nivel: "Nivel II",
      descricao: "Interpreta arquivos antigos e identifica padroes sobrenaturais.",
      funcoes: ["Analisar registros antigos", "Identificar padroes sobrenaturais", "Traduzir simbolos antigos"],
    },
    {
      nome: "Rastreador",
      nivel: "Nivel II",
      descricao: "Segue sinais energeticos e localiza origem dos fenomenos.",
      funcoes: ["Localizar origem de fenomenos", "Seguir rastros energeticos", "Detectar anomalias"],
    },
    {
      nome: "Sensitivo",
      nivel: "Nivel III",
      descricao: "Sente presencas e interpreta intencoes de entidades.",
      funcoes: ["Sentir presenca espiritual", "Prever manifestacoes", "Identificar intencoes de entidades"],
    },
    {
      nome: "Tecnico Paranormal",
      nivel: "Nivel III",
      descricao: "Opera e calibra aparelhos de investigacao sobrenatural.",
      funcoes: ["Operar equipamentos paranormais", "Interpretar leituras anormais", "Calibrar sensores de investigacao"],
    },
    {
      nome: "Guardiao",
      nivel: "Nivel IV",
      descricao: "Linha de defesa da equipe em locais de alto risco.",
      funcoes: ["Criar barreiras de protecao", "Resistir a influencia paranormal", "Defender aliados"],
    },
    {
      nome: "Ritualista",
      nivel: "Nivel IV",
      descricao: "Conduz rituais para contencao e purificacao.",
      funcoes: ["Realizar rituais de protecao", "Selar entidades espirituais", "Purificar locais contaminados"],
    },
    {
      nome: "Cronista",
      nivel: "Nivel I",
      descricao: "Documenta cada caso e preserva a memoria da investigacao.",
      funcoes: ["Documentar eventos paranormais", "Organizar arquivos de casos", "Preservar conhecimento investigativo"],
    },
  ],
  funcoes: [
    "Percepcao agucada",
    "Registrar evidencias",
    "Detectar anomalias",
    "Analisar registros antigos",
    "Identificar padroes sobrenaturais",
    "Traduzir simbolos antigos",
    "Localizar origem de fenomenos",
    "Seguir rastros energeticos",
    "Identificar areas assombradas",
    "Sentir presenca espiritual",
    "Prever manifestacoes",
    "Identificar intencoes de entidades",
    "Operar equipamentos paranormais",
    "Interpretar leituras anormais",
    "Calibrar sensores de investigacao",
    "Criar barreiras de protecao",
    "Resistir a influencia paranormal",
    "Defender aliados",
    "Realizar rituais de protecao",
    "Selar entidades espirituais",
    "Purificar locais contaminados",
    "Documentar eventos paranormais",
    "Organizar arquivos de casos",
    "Preservar conhecimento investigativo",
  ],
  evidencias: [
    "Pico de energia espiritual residual",
    "Fluxo ectoplasmatico detectado no ambiente",
    "Frequencia animica anormal registrada",
    "Queda extrema de temperatura localizada",
    "Vozes ou sussurros captados na gravacao",
    "Disturbio no campo etereo do ambiente",
    "Aumento da densidade espiritual em um ponto",
    "Distorcao luminosa capturada em fotografia",
    "Presenca de energia pos-vital residual",
    "Corrente astral atravessando o espaco",
    "Microanomalias temporais registradas",
    "Oscilacao no campo magneto-necroenergetico",
    "Silhueta espectral detectada pela lente",
    "Vibracao de ondas umbrais no ambiente",
    "Instabilidade localizada na realidade fisica",
    "Interferencia eletromagnetica anormal",
    "Eco energetico persistente no local",
  ],
};

const refs = {
  themeToggle: document.getElementById("themeToggle"),
  searchInput: document.getElementById("searchInput"),
  galleryFilters: document.getElementById("galleryFilters"),
  investigatorFilters: document.getElementById("investigatorFilters"),
  functionFilters: document.getElementById("functionFilters"),
  evidenceFilters: document.getElementById("evidenceFilters"),
  resetFilters: document.getElementById("resetFilters"),
  galleryGrid: document.getElementById("galleryGrid"),
  investigatorGrid: document.getElementById("investigatorGrid"),
  evidenceGrid: document.getElementById("evidenceGrid"),
  galleryCount: document.getElementById("galleryCount"),
  investigatorCount: document.getElementById("investigatorCount"),
  evidenceCount: document.getElementById("evidenceCount"),
  folderTabs: [...document.querySelectorAll(".colecoes-folder-tabs a")],
};

const PAGE_FILTER_CONFIG = {
  evidencias: ["evidence"],
  investigadores: ["investigator", "function"],
  galeria: ["gallery"],
  fantasmas: [],
  ferramentas: [],
  diario: [],
};

function setupThemeToggle() {
  const root = document.body;
  const storageKey = "ecosTheme";
  const savedTheme = localStorage.getItem(storageKey);
  const preferredTheme = savedTheme === "dark" ? "dark" : "light";
  root.setAttribute("data-theme", preferredTheme);
  updateThemeToggleLabel(preferredTheme);

  if (!refs.themeToggle) return;

  refs.themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem(storageKey, nextTheme);
    updateThemeToggleLabel(nextTheme);
  });
}

function updateThemeToggleLabel(theme) {
  if (!refs.themeToggle) return;
  refs.themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
  );
  refs.themeToggle.setAttribute("data-active-theme", theme);
}

function uniqueId(prefix, value) {
  return `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function createCheckList(container, prefix, values) {
  if (!container) return;
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  values.forEach((value) => {
    const id = uniqueId(prefix, value);
    const label = document.createElement("label");
    label.className = "check-item";
    label.setAttribute("for", id);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.value = value;

    const text = document.createElement("span");
    text.textContent = value;

    label.append(input, text);
    fragment.append(label);
  });

  container.append(fragment);
}

function getSelectedValues(container) {
  return new Set(
    [...container.querySelectorAll("input:checked")].map((input) => input.value)
  );
}

function matchesSearch(value, query) {
  if (!query) return true;
  return value.toLowerCase().includes(query);
}

function renderEmpty(container, message) {
  container.innerHTML = `<p class="empty">${message}</p>`;
}

function renderGallery(items) {
  if (!refs.galleryGrid || !refs.galleryCount) return;
  if (!items.length) {
    renderEmpty(refs.galleryGrid, "Nenhuma categoria de galeria encontrada com os filtros atuais.");
    refs.galleryCount.textContent = "0 exibidas";
    return;
  }

  refs.galleryGrid.innerHTML = items
    .map(
      (item) => `
      <article class="card gallery-card">
        <div class="gallery-thumb">Arquivo Visual</div>
        <div class="gallery-meta">
          <h3>${item}</h3>
          <p>Colecao visual para investigacao de ${item.toLowerCase()}.</p>
        </div>
      </article>
    `
    )
    .join("");

  refs.galleryCount.textContent = `${items.length} exibidas`;
}

function renderInvestigators(items) {
  if (!refs.investigatorGrid || !refs.investigatorCount) return;
  if (!items.length) {
    renderEmpty(refs.investigatorGrid, "Nenhum investigador encontrado com os filtros atuais.");
    refs.investigatorCount.textContent = "0 exibidos";
    return;
  }

  refs.investigatorGrid.innerHTML = items
    .map(
      (item) => `
      <article class="card investigator-card">
        <div class="card-top">
          <h3>${item.nome}</h3>
          <span class="lvl">${item.nivel}</span>
        </div>
        <p>${item.descricao}</p>
        <div class="tag-list">
          ${item.funcoes.map((funcao) => `<span class="tag">${funcao}</span>`).join("")}
        </div>
      </article>
    `
    )
    .join("");

  refs.investigatorCount.textContent = `${items.length} exibidos`;
}

function renderEvidences(items) {
  if (!refs.evidenceGrid || !refs.evidenceCount) return;
  if (!items.length) {
    renderEmpty(refs.evidenceGrid, "Nenhuma evidencia encontrada com os filtros atuais.");
    refs.evidenceCount.textContent = "0 exibidas";
    return;
  }

  refs.evidenceGrid.innerHTML = items
    .map(
      (item) => `
      <article class="card evidence-card">
        <div class="evidence-actions" aria-hidden="true">
          <span class="evidence-dot"></span>
          <span class="evidence-dot"></span>
        </div>
        <div class="evidence-top">Evidencias</div>
        <div class="evidence-body">
          <p>Sobre</p>
          <p>Equipamento</p>
          <p>Como identificar</p>
        </div>
        <p class="evidence-name">${item}</p>
      </article>
    `
    )
    .join("");

  refs.evidenceCount.textContent = `${items.length} exibidas`;
}

function applyFilters() {
  if (!refs.searchInput) return;
  const query = refs.searchInput.value.trim().toLowerCase();
  const selectedGallery = refs.galleryFilters ? getSelectedValues(refs.galleryFilters) : new Set();
  const selectedInvestigators = refs.investigatorFilters ? getSelectedValues(refs.investigatorFilters) : new Set();
  const selectedFunctions = refs.functionFilters ? getSelectedValues(refs.functionFilters) : new Set();
  const selectedEvidences = refs.evidenceFilters ? getSelectedValues(refs.evidenceFilters) : new Set();

  const filteredGallery = data.categoriasGaleria.filter((item) => {
    const byCategory = selectedGallery.size === 0 || selectedGallery.has(item);
    return byCategory && matchesSearch(item, query);
  });

  const filteredInvestigators = data.investigadores.filter((item) => {
    const byName = selectedInvestigators.size === 0 || selectedInvestigators.has(item.nome);
    const byFunction =
      selectedFunctions.size === 0 || item.funcoes.some((funcao) => selectedFunctions.has(funcao));

    const searchable = `${item.nome} ${item.descricao} ${item.funcoes.join(" ")}`.toLowerCase();
    return byName && byFunction && matchesSearch(searchable, query);
  });

  const filteredEvidences = data.evidencias.filter((item) => {
    const byEvidence = selectedEvidences.size === 0 || selectedEvidences.has(item);
    return byEvidence && matchesSearch(item, query);
  });

  renderGallery(filteredGallery);
  renderInvestigators(filteredInvestigators);
  renderEvidences(filteredEvidences);
}

function bindEvents() {
  document.querySelectorAll(".colecoes-check-list").forEach((block) => {
    block.addEventListener("change", applyFilters);
  });

  refs.searchInput?.addEventListener("input", applyFilters);

  refs.resetFilters?.addEventListener("click", () => {
    refs.searchInput.value = "";
    document.querySelectorAll('.colecoes-check-list input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
    applyFilters();
  });
}

function setupPageScopedFilters() {
  const page = document.body.dataset.page || "evidencias";
  const allowed = new Set(PAGE_FILTER_CONFIG[page] || []);

  const map = [
    { key: "gallery", box: refs.galleryFilters },
    { key: "investigator", box: refs.investigatorFilters },
    { key: "function", box: refs.functionFilters },
    { key: "evidence", box: refs.evidenceFilters },
  ];

  let visibleCount = 0;
  map.forEach(({ key, box }) => {
    if (!box) return;
    const block = box.closest(".colecoes-filter-block");
    if (!block) return;
    const show = allowed.has(key);
    block.hidden = !show;
    if (show) visibleCount += 1;
  });

  if (refs.searchInput) {
    const shouldShowSearch = allowed.size > 0;
    const searchWrap = refs.searchInput.closest(".colecoes-search");
    if (searchWrap) searchWrap.hidden = !shouldShowSearch;
    refs.searchInput.placeholder = shouldShowSearch
      ? "Buscar nos filtros desta pagina..."
      : "Sem filtros nesta pagina";
  }

  if (refs.resetFilters) {
    refs.resetFilters.hidden = visibleCount === 0;
  }
}

function setActiveFolderTab(url) {
  if (!url) return;
  const currentPath = window.location.pathname.split("/").pop() || "colecoes-evidencias.html";
  refs.folderTabs.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPath = href.split("/").pop();
    const isActive = linkPath === currentPath || (currentPath === "colecoes.html" && linkPath === "colecoes-evidencias.html");
    link.classList.toggle("active-tab", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function setupFolderTabs() {
  if (!refs.folderTabs.length) return;
  setActiveFolderTab(window.location.pathname);
}

function init() {
  setupThemeToggle();
  setupFolderTabs();
  setupPageScopedFilters();
  createCheckList(refs.galleryFilters, "gallery", data.categoriasGaleria);
  createCheckList(refs.investigatorFilters, "investigator", data.investigadores.map((item) => item.nome));
  createCheckList(refs.functionFilters, "function", data.funcoes);
  createCheckList(refs.evidenceFilters, "evidence", data.evidencias);

  bindEvents();
  applyFilters();
}

init();
