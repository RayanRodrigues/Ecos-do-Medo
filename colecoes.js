"use strict";

const SUPABASE_URL = "https://bwkzbcfrgmckiruawlqt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a3piY2ZyZ21ja2lydWF3bHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzEzNzIsImV4cCI6MjA4ODUwNzM3Mn0.QlIZV9C5gezRKX2YmtHtZUzZHgVRUi5uOLl1Rmh2LSM";
const ADMIN_EMAIL_ALLOWLIST = ["rayandepaulagpt@gmail.com"];
const FAVORITES_SECTION_GHOSTS = "fantasmas";
const FAVORITES_SECTION_TOOLS = "ferramentas";

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

const defaultGhostData = {
  evidences: [
    "EMF Nivel 5",
    "Escrita Fantasma",
    "Temperatura Congelante",
    "Orbes",
    "Spirit Box",
    "D.O.T.S",
  ],
  ghosts: [
    {
      name: "Murmurante",
      evidences: ["EMF Nivel 5", "Escrita Fantasma", "Spirit Box"],
      speed: "Normal",
      behavior: "Agressivo",
      category: "Introvertido",
      about: "Entidade de corredor que induz ruido branco.",
      appearance: "Silhueta alongada com distorcao de luz.",
    },
    {
      name: "Vesper",
      evidences: ["Orbes", "Temperatura Congelante", "D.O.T.S"],
      speed: "Lento",
      behavior: "Instavel",
      category: "Extrovertido",
      about: "Aparece em janelas e locais com neblina densa.",
      appearance: "Contorno intermitente esverdeado.",
    },
  ],
};

const defaultToolData = [
  {
    name: "Leitor EMF",
    about: "Dispositivo que detecta picos eletromagneticos causados por atividade paranormal.",
    howToUse: "Ligue proximo ao ponto de manifestacao. Nivel 5 e uma evidencia importante.",
    evidence: "EMF Nivel 5",
  },
  {
    name: "Spirit Box",
    about: "Radio de varredura para tentativa de comunicacao direta com entidades.",
    howToUse: "Fale perguntas curtas em ambiente escuro e silencioso, perto do fantasma.",
    evidence: "Spirit Box",
  },
  {
    name: "Lanterna UV",
    about: "Luz ultravioleta usada para revelar digitais, pegadas e marcas invisiveis.",
    howToUse: "Aponte para portas, janelas, interruptores e sal para encontrar rastros.",
    evidence: "Digitais / UV",
  },
  {
    name: "Camera de Video",
    about: "Camera para observar orbes e monitorar salas remotamente.",
    howToUse: "Posicione cobrindo o local da atividade e veja pelo monitor da van.",
    evidence: "Orbes Fantasmagoricos",
  },
  {
    name: "Livro de Escrita",
    about: "Caderno paranormal onde entidades podem deixar mensagens.",
    howToUse: "Coloque no chao perto do ponto assombrado e aguarde interacao.",
    evidence: "Escrita Fantasma",
  },
  {
    name: "Projetor D.O.T.S",
    about: "Grade de laser para detectar silhuetas atravessando o feixe.",
    howToUse: "Instale na sala do fantasma e observe movimentos no padrao verde.",
    evidence: "D.O.T.S",
  },
  {
    name: "Termometro",
    about: "Mede queda de temperatura e congelamento de ambiente.",
    howToUse: "Escaneie com frequencia. Temperaturas negativas indicam evidencia forte.",
    evidence: "Temperatura Congelante",
  },
];

const ghostState = {
  evidences: [],
  ghosts: [],
  marks: {},
  favorites: new Set(),
};

const toolState = {
  items: [],
  editingId: null,
  editingName: "",
  marks: {},
  favorites: new Set(),
};

const uiState = {
  editingGhostId: null,
  editingGhostName: "",
};

const supaState = {
  client: null,
  user: null,
  profile: null,
  isAdmin: false,
};

const refs = {
  themeToggle: document.getElementById("themeToggle"),
  searchInput: document.getElementById("searchInput"),
  toolFilters: document.getElementById("toolFilters"),
  galleryFilters: document.getElementById("galleryFilters"),
  investigatorFilters: document.getElementById("investigatorFilters"),
  functionFilters: document.getElementById("functionFilters"),
  evidenceFilters: document.getElementById("evidenceFilters"),
  ghostTraitFilters: document.getElementById("ghostTraitFilters"),
  ghostCategoryFilters: document.getElementById("ghostCategoryFilters"),
  resetFilters: document.getElementById("resetFilters"),
  galleryGrid: document.getElementById("galleryGrid"),
  investigatorGrid: document.getElementById("investigatorGrid"),
  evidenceGrid: document.getElementById("evidenceGrid"),
  galleryCount: document.getElementById("galleryCount"),
  investigatorCount: document.getElementById("investigatorCount"),
  evidenceCount: document.getElementById("evidenceCount"),
  folderTabs: [...document.querySelectorAll(".colecoes-folder-tabs a")],
  ghostGrid: document.getElementById("ghostGrid"),
  ghostCount: document.getElementById("ghostCount"),
  toolsGrid: document.getElementById("toolsGrid"),
  toolsCount: document.getElementById("toolsCount"),
  adminToolForm: document.getElementById("adminToolForm"),
  toolName: document.getElementById("toolName"),
  toolAbout: document.getElementById("toolAbout"),
  toolHowToUse: document.getElementById("toolHowToUse"),
  toolEvidence: document.getElementById("toolEvidence"),
  toolFormTitle: document.getElementById("toolFormTitle"),
  cancelToolEdit: document.getElementById("cancelToolEdit"),
  adminToolList: document.getElementById("adminToolList"),
  toolAdminStatus: document.getElementById("toolAdminStatus"),
  adminEvidenceForm: document.getElementById("adminEvidenceForm"),
  newEvidenceName: document.getElementById("newEvidenceName"),
  adminGhostForm: document.getElementById("adminGhostForm"),
  ghostName: document.getElementById("ghostName"),
  ghostEvidence1: document.getElementById("ghostEvidence1"),
  ghostEvidence2: document.getElementById("ghostEvidence2"),
  ghostEvidence3: document.getElementById("ghostEvidence3"),
  ghostSpeed: document.getElementById("ghostSpeed"),
  ghostBehavior: document.getElementById("ghostBehavior"),
  ghostCategory: document.getElementById("ghostCategory"),
  ghostAbout: document.getElementById("ghostAbout"),
  ghostAppearance: document.getElementById("ghostAppearance"),
  ghostAdminStatus: document.getElementById("ghostAdminStatus"),
  ghostAdminPanel: document.querySelector(".ghost-admin-panel"),
  adminPanelToggle: document.getElementById("adminPanelToggle"),
  ghostAdminBody: document.getElementById("ghostAdminBody"),
  adminEvidenceList: document.getElementById("adminEvidenceList"),
  adminGhostList: document.getElementById("adminGhostList"),
  adminMenuToggles: [...document.querySelectorAll("[data-admin-menu-toggle]")],
  ghostEditModal: document.getElementById("ghostEditModal"),
  closeGhostEditModal: document.getElementById("closeGhostEditModal"),
  cancelGhostEdit: document.getElementById("cancelGhostEdit"),
  ghostEditForm: document.getElementById("ghostEditForm"),
  editGhostName: document.getElementById("editGhostName"),
  editGhostEvidence1: document.getElementById("editGhostEvidence1"),
  editGhostEvidence2: document.getElementById("editGhostEvidence2"),
  editGhostEvidence3: document.getElementById("editGhostEvidence3"),
  editGhostSpeed: document.getElementById("editGhostSpeed"),
  editGhostBehavior: document.getElementById("editGhostBehavior"),
  editGhostCategory: document.getElementById("editGhostCategory"),
  editGhostAbout: document.getElementById("editGhostAbout"),
  editGhostAppearance: document.getElementById("editGhostAppearance"),
};

const PAGE_FILTER_CONFIG = {
  evidencias: ["evidence"],
  investigadores: ["investigator", "function"],
  galeria: ["gallery"],
  fantasmas: ["evidence", "ghost_trait", "ghost_category"],
  ferramentas: ["tool"],
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

function renderTools(items) {
  if (!refs.toolsGrid || !refs.toolsCount) return;
  if (!items.length) {
    renderEmpty(refs.toolsGrid, "Nenhuma ferramenta encontrada com os filtros atuais.");
    refs.toolsCount.textContent = "0 exibidas";
    return;
  }

  refs.toolsGrid.innerHTML = items
    .map(
      (tool) => `
      <article class="card tool-card ${toolState.marks[tool.name] === "excluded" ? "tool-card-excluded" : ""} ${toolState.marks[tool.name] === "confirmed" ? "tool-card-confirmed" : ""} ${toolState.favorites.has(tool.name) ? "tool-card-favorite" : ""}">
        <div class="tool-card-head">${tool.name}</div>
        <div class="tool-card-actions" aria-label="Marcacao da ferramenta">
          <button
            type="button"
            class="tool-mark-btn tool-mark-confirm ${toolState.marks[tool.name] === "confirmed" ? "is-active" : ""}"
            data-action="confirm-tool"
            data-tool-name="${encodeURIComponent(tool.name)}"
            aria-label="Marcar ferramenta como valida"
            title="Marcar ferramenta como valida"
          >✓</button>
          <button
            type="button"
            class="tool-mark-btn tool-mark-exclude ${toolState.marks[tool.name] === "excluded" ? "is-active" : ""}"
            data-action="exclude-tool"
            data-tool-name="${encodeURIComponent(tool.name)}"
            aria-label="Marcar ferramenta como descartada"
            title="Marcar ferramenta como descartada"
          >✕</button>
          <button
            type="button"
            class="tool-mark-btn tool-mark-favorite ${toolState.favorites.has(tool.name) ? "is-active" : ""}"
            data-action="favorite-tool"
            data-tool-name="${encodeURIComponent(tool.name)}"
            aria-label="Favoritar ferramenta"
            title="Favoritar ferramenta"
          >★</button>
        </div>
        <div class="tool-card-body">
          <p><strong>Sobre:</strong> ${tool.about || "-"}</p>
          <p><strong>Como usar:</strong> ${tool.howToUse || "-"}</p>
          <p><strong>Evidencia:</strong> ${tool.evidence || "-"}</p>
        </div>
      </article>
    `
    )
    .join("");

  refs.toolsCount.textContent = `${items.length} exibidas`;
}

function setupToolCardActions() {
  refs.toolsGrid?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (!["confirm-tool", "exclude-tool", "favorite-tool"].includes(action)) return;

    const toolName = decodeURIComponent(button.dataset.toolName || "");
    if (!toolName) return;

    if (action === "favorite-tool") {
      await toggleToolFavorite(toolName);
      return;
    }

    const currentMark = toolState.marks[toolName] || "";
    const nextMark =
      action === "confirm-tool"
        ? (currentMark === "confirmed" ? "" : "confirmed")
        : (currentMark === "excluded" ? "" : "excluded");

    if (nextMark) {
      toolState.marks[toolName] = nextMark;
    } else {
      delete toolState.marks[toolName];
    }
    applyFilters();
  });
}

function applyFilters() {
  if (!refs.searchInput) return;
  const query = refs.searchInput.value.trim().toLowerCase();
  const selectedGallery = refs.galleryFilters ? getSelectedValues(refs.galleryFilters) : new Set();
  const selectedTools = refs.toolFilters ? getSelectedValues(refs.toolFilters) : new Set();
  const selectedInvestigators = refs.investigatorFilters ? getSelectedValues(refs.investigatorFilters) : new Set();
  const selectedFunctions = refs.functionFilters ? getSelectedValues(refs.functionFilters) : new Set();
  const selectedEvidences = refs.evidenceFilters ? getSelectedValues(refs.evidenceFilters) : new Set();
  const selectedTraits = refs.ghostTraitFilters ? getSelectedValues(refs.ghostTraitFilters) : new Set();
  const selectedCategories = refs.ghostCategoryFilters ? getSelectedValues(refs.ghostCategoryFilters) : new Set();

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

  const filteredTools = toolState.items.filter((tool) => {
    const byTool = selectedTools.size === 0 || selectedTools.has(tool.name);
    const searchable = `${tool.name} ${tool.about} ${tool.howToUse} ${tool.evidence}`.toLowerCase();
    return byTool && matchesSearch(searchable, query);
  });

  const filteredGhosts = ghostState.ghosts.filter((ghost) => {
    const byEvidence =
      selectedEvidences.size === 0 ||
      [...selectedEvidences].every((ev) => ghost.evidences.includes(ev));
    const ghostTraits = [ghost.speed, ghost.behavior].filter(Boolean);
    const byTrait =
      selectedTraits.size === 0 || [...selectedTraits].every((trait) => ghostTraits.includes(trait));
    const byCategory =
      selectedCategories.size === 0 || selectedCategories.has(ghost.category || "");
    const searchable = `${ghost.name} ${ghost.about} ${ghost.appearance}`.toLowerCase();
    return byEvidence && byTrait && byCategory && matchesSearch(searchable, query);
  });

  renderGallery(filteredGallery);
  renderTools(filteredTools);
  renderInvestigators(filteredInvestigators);
  renderEvidences(filteredEvidences);
  renderGhosts(filteredGhosts);
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
    { key: "tool", box: refs.toolFilters },
    { key: "gallery", box: refs.galleryFilters },
    { key: "investigator", box: refs.investigatorFilters },
    { key: "function", box: refs.functionFilters },
    { key: "evidence", box: refs.evidenceFilters },
    { key: "ghost_trait", box: refs.ghostTraitFilters },
    { key: "ghost_category", box: refs.ghostCategoryFilters },
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

function setupSupabaseClient() {
  if (supaState.client) return supaState.client;
  if (!window.supabase) return null;
  supaState.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supaState.client;
}

function isAdminByProfile(profile, userEmail) {
  const role = String(profile?.role || "").trim().toLowerCase();
  if (role === "admin") return true;
  const normalizedEmail = String(userEmail || "").trim().toLowerCase();
  return ADMIN_EMAIL_ALLOWLIST.includes(normalizedEmail);
}

async function fetchProfileByUser(sb, user) {
  if (!sb || !user) return null;
  const byId = await sb
    .from("profiles")
    .select("id, email, role")
    .eq("id", user.id)
    .maybeSingle();
  if (byId.data) return byId.data;

  if (!user.email) return null;
  const byEmail = await sb
    .from("profiles")
    .select("id, email, role")
    .ilike("email", user.email)
    .maybeSingle();
  return byEmail.data || null;
}

async function refreshGhostAuthState() {
  if (!["fantasmas", "ferramentas"].includes(document.body.dataset.page || "")) return;
  const sb = setupSupabaseClient();
  if (!sb) {
    if (refs.ghostAdminPanel) refs.ghostAdminPanel.hidden = true;
    return;
  }

  const applySession = async (session) => {
    supaState.user = session?.user || null;
    supaState.profile = null;
    supaState.isAdmin = false;

    if (supaState.user) {
      supaState.profile = await fetchProfileByUser(sb, supaState.user);
      supaState.isAdmin = isAdminByProfile(supaState.profile, supaState.user.email);
    }

    if (refs.ghostAdminPanel) refs.ghostAdminPanel.hidden = !supaState.isAdmin;
    if (document.body.dataset.page === "fantasmas") {
      await loadGhostFavorites();
    }
    if (document.body.dataset.page === "ferramentas") {
      await loadToolFavorites();
    }
    if (refs.ghostGrid || refs.toolsGrid) applyFilters();
  };

  const { data } = await sb.auth.getSession();
  await applySession(data.session);
  sb.auth.onAuthStateChange(async (_event, session) => {
    await applySession(session);
  });
}

async function loadGhostDataFromSupabase() {
  const sb = setupSupabaseClient();
  if (!sb) {
    return {
      evidences: defaultGhostData.evidences.map((name) => ({ id: null, name })),
      ghosts: structuredClone(defaultGhostData.ghosts),
    };
  }

  const [evidencesRes, ghostsRes] = await Promise.all([
    sb.from("ghost_evidences").select("id, name").order("name", { ascending: true }),
    sb
      .from("ghosts")
      .select("id, name, evidence_1, evidence_2, evidence_3, speed, behavior, category, about, appearance")
      .order("name", { ascending: true }),
  ]);

  if (evidencesRes.error || ghostsRes.error) {
    setGhostStatus("Falha ao carregar do Supabase. Verifique tabelas ghosts e ghost_evidences.", true);
    return structuredClone(defaultGhostData);
  }

  const evidences = evidencesRes.data.map((row) => ({ id: row.id, name: row.name })).filter((row) => row.name);
  const ghosts = ghostsRes.data.map((row) => ({
    id: row.id,
    name: row.name,
    evidences: [row.evidence_1, row.evidence_2, row.evidence_3].filter(Boolean),
    speed: row.speed || "Normal",
    behavior: row.behavior || "Instavel",
    category: row.category || "Introvertido",
    about: row.about || "",
    appearance: row.appearance || "",
  }));

  return {
    evidences: evidences.length ? evidences : defaultGhostData.evidences.map((name) => ({ id: null, name })),
    ghosts,
  };
}

async function loadToolDataFromSupabase() {
  const sb = setupSupabaseClient();
  if (!sb) return structuredClone(defaultToolData);

  const { data: rows, error } = await sb
    .from("investigation_tools")
    .select("id, name, about, how_to_use, evidence")
    .order("name", { ascending: true });

  if (error) {
    setToolStatus("Falha ao carregar ferramentas do Supabase. Usando dados locais.", true);
    return structuredClone(defaultToolData);
  }

  return (rows || []).map((row) => ({
    id: row.id,
    name: row.name,
    about: row.about || "",
    howToUse: row.how_to_use || "",
    evidence: row.evidence || "",
  }));
}

function populateGhostEvidenceSelects() {
  const selects = [refs.ghostEvidence1, refs.ghostEvidence2, refs.ghostEvidence3];
  selects.forEach((select) => {
    if (!select) return;
    select.innerHTML = "";
    ghostState.evidences.forEach((ev) => {
      const option = document.createElement("option");
      option.value = ev.name;
      option.textContent = ev.name;
      select.append(option);
    });
  });
}

function getUniqueGhostTraits() {
  const set = new Set();
  ghostState.ghosts.forEach((ghost) => {
    if (ghost.speed) set.add(ghost.speed);
    if (ghost.behavior) set.add(ghost.behavior);
  });
  return [...set];
}

function getUniqueGhostCategories() {
  const set = new Set();
  ghostState.ghosts.forEach((ghost) => {
    if (ghost.category) set.add(ghost.category);
  });
  return [...set];
}

function renderGhosts(items) {
  if (!refs.ghostGrid || !refs.ghostCount) return;
  if (!items.length) {
    renderEmpty(refs.ghostGrid, "Nenhum fantasma compativel com as evidencias marcadas.");
    refs.ghostCount.textContent = "0 exibidos";
    return;
  }

  refs.ghostGrid.innerHTML = items
    .map(
      (ghost) => `
      <article class="card ghost-card ${ghostState.marks[ghost.name] === "excluded" ? "ghost-card-excluded" : ""} ${ghostState.marks[ghost.name] === "confirmed" ? "ghost-card-confirmed" : ""} ${ghostState.favorites.has(ghost.name) ? "ghost-card-favorite" : ""}">
        <div class="ghost-card-head">${ghost.name}</div>
        <div class="ghost-card-actions" aria-label="Marcacao do fantasma">
          <button
            type="button"
            class="ghost-mark-btn ghost-mark-favorite ${ghostState.favorites.has(ghost.name) ? "is-active" : ""}"
            data-action="favorite-ghost"
            data-ghost-name="${encodeURIComponent(ghost.name)}"
            aria-label="Favoritar fantasma"
            title="Favoritar fantasma"
          >★</button>
          <button
            type="button"
            class="ghost-mark-btn ghost-mark-confirm ${ghostState.marks[ghost.name] === "confirmed" ? "is-active" : ""}"
            data-action="confirm-ghost"
            data-ghost-name="${encodeURIComponent(ghost.name)}"
            aria-label="Marcar como confirmado"
            title="Marcar como confirmado"
          >✓</button>
          <button
            type="button"
            class="ghost-mark-btn ghost-mark-exclude ${ghostState.marks[ghost.name] === "excluded" ? "is-active" : ""}"
            data-action="exclude-ghost"
            data-ghost-name="${encodeURIComponent(ghost.name)}"
            aria-label="Marcar como descartado"
            title="Marcar como descartado"
          >✕</button>
        </div>
        <div class="ghost-card-main">
          <div class="ghost-card-left">
            <div class="ghost-evidence-row">
              <span>${ghost.evidences[0] || "-"}</span>
              <span>${ghost.evidences[1] || "-"}</span>
              <span>${ghost.evidences[2] || "-"}</span>
            </div>
            <div class="ghost-info-row">
              <span>${ghost.behavior || "-"}</span>
              <span>${ghost.speed || "-"}</span>
            </div>
          </div>
          <aside class="ghost-card-side">
            <p><strong>Sobre:</strong> ${ghost.about || "-"}</p>
            <p><strong>Aparencia:</strong> ${ghost.appearance || "-"}</p>
          </aside>
        </div>
      </article>
    `
    )
    .join("");

  refs.ghostCount.textContent = `${items.length} exibidos`;
}

function setupGhostCardMarks() {
  refs.ghostGrid?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (action !== "confirm-ghost" && action !== "exclude-ghost" && action !== "favorite-ghost") return;

    const ghostName = decodeURIComponent(button.dataset.ghostName || "");
    if (!ghostName) return;

    if (action === "favorite-ghost") {
      await toggleGhostFavorite(ghostName);
      return;
    }

    const currentMark = ghostState.marks[ghostName] || "";
    const nextMark =
      action === "confirm-ghost"
        ? (currentMark === "confirmed" ? "" : "confirmed")
        : (currentMark === "excluded" ? "" : "excluded");

    if (nextMark) {
      ghostState.marks[ghostName] = nextMark;
    } else {
      delete ghostState.marks[ghostName];
    }
    applyFilters();
  });
}

function ghostFavoritesStorageKey() {
  return supaState.user?.id ? `ecosGhostFavorites:${supaState.user.id}` : "ecosGhostFavorites:guest";
}

function toolFavoritesStorageKey() {
  return supaState.user?.id ? `ecosToolFavorites:${supaState.user.id}` : "ecosToolFavorites:guest";
}

function loadGhostFavoritesFromLocal() {
  const key = ghostFavoritesStorageKey();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return new Set();
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return new Set();
    }
    return new Set(parsed.filter((name) => typeof name === "string" && name.trim()));
  } catch {
    return new Set();
  }
}

function saveGhostFavoritesToLocal() {
  const key = ghostFavoritesStorageKey();
  localStorage.setItem(key, JSON.stringify([...ghostState.favorites]));
}

function loadToolFavoritesFromLocal() {
  const key = toolFavoritesStorageKey();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((name) => typeof name === "string" && name.trim()));
  } catch {
    return new Set();
  }
}

function saveToolFavoritesToLocal() {
  const key = toolFavoritesStorageKey();
  localStorage.setItem(key, JSON.stringify([...toolState.favorites]));
}

function isMissingTableError(error) {
  return error?.code === "42P01";
}

async function loadGhostFavorites() {
  const localFavorites = loadGhostFavoritesFromLocal();
  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;

  if (!sb || !userId) {
    ghostState.favorites = localFavorites;
    return;
  }

  const { data: rows, error } = await sb
    .from("user_favorites")
    .select("item_key")
    .eq("user_id", userId)
    .eq("section", FAVORITES_SECTION_GHOSTS);

  if (!error) {
    ghostState.favorites = new Set(
      (rows || [])
        .map((row) => row.item_key)
        .filter((name) => typeof name === "string" && name.trim())
    );
    saveGhostFavoritesToLocal();
    return;
  }

  if (!isMissingTableError(error)) {
    ghostState.favorites = localFavorites;
    return;
  }

  const legacy = await sb
    .from("ghost_favorites")
    .select("ghost_name")
    .eq("user_id", userId);

  if (legacy.error) {
    ghostState.favorites = localFavorites;
    return;
  }

  ghostState.favorites = new Set(
    (legacy.data || [])
      .map((row) => row.ghost_name)
      .filter((name) => typeof name === "string" && name.trim())
  );
  saveGhostFavoritesToLocal();
}

async function loadToolFavorites() {
  const localFavorites = loadToolFavoritesFromLocal();
  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;

  if (!sb || !userId) {
    toolState.favorites = localFavorites;
    return;
  }

  const { data: rows, error } = await sb
    .from("user_favorites")
    .select("item_key")
    .eq("user_id", userId)
    .eq("section", FAVORITES_SECTION_TOOLS);

  if (!error) {
    toolState.favorites = new Set(
      (rows || [])
        .map((row) => row.item_key)
        .filter((name) => typeof name === "string" && name.trim())
    );
    saveToolFavoritesToLocal();
    return;
  }

  toolState.favorites = localFavorites;
}

async function toggleGhostFavorite(ghostName) {
  const wasFavorite = ghostState.favorites.has(ghostName);
  if (wasFavorite) {
    ghostState.favorites.delete(ghostName);
  } else {
    ghostState.favorites.add(ghostName);
  }
  applyFilters();

  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;
  if (!sb || !userId) {
    saveGhostFavoritesToLocal();
    return;
  }

  const upsertNewTable = async () => {
    if (wasFavorite) {
      return sb
        .from("user_favorites")
        .delete()
        .eq("user_id", userId)
        .eq("section", FAVORITES_SECTION_GHOSTS)
        .eq("item_key", ghostName);
    }
    return sb.from("user_favorites").insert({
      user_id: userId,
      section: FAVORITES_SECTION_GHOSTS,
      item_key: ghostName,
      item_label: ghostName,
      metadata: {},
    });
  };

  let { error } = await upsertNewTable();
  if (error && isMissingTableError(error)) {
    if (wasFavorite) {
      ({ error } = await sb
        .from("ghost_favorites")
        .delete()
        .eq("user_id", userId)
        .eq("ghost_name", ghostName));
    } else {
      ({ error } = await sb.from("ghost_favorites").insert({
        user_id: userId,
        ghost_name: ghostName,
      }));
    }
  }

  if (wasFavorite) {
    if (error) {
      ghostState.favorites.add(ghostName);
      applyFilters();
      setGhostStatus(`Erro ao remover favorito: ${error.message}`, true);
      return;
    }
  } else {
    if (error && error.code !== "23505") {
      ghostState.favorites.delete(ghostName);
      applyFilters();
      setGhostStatus(`Erro ao salvar favorito: ${error.message}`, true);
      return;
    }
  }
  saveGhostFavoritesToLocal();
}

async function toggleToolFavorite(toolName) {
  const wasFavorite = toolState.favorites.has(toolName);
  if (wasFavorite) {
    toolState.favorites.delete(toolName);
  } else {
    toolState.favorites.add(toolName);
  }
  applyFilters();

  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;
  if (!sb || !userId) {
    saveToolFavoritesToLocal();
    return;
  }

  if (wasFavorite) {
    const { error } = await sb
      .from("user_favorites")
      .delete()
      .eq("user_id", userId)
      .eq("section", FAVORITES_SECTION_TOOLS)
      .eq("item_key", toolName);
    if (error) {
      toolState.favorites.add(toolName);
      applyFilters();
      setToolStatus(`Erro ao remover favorito: ${error.message}`, true);
      return;
    }
  } else {
    const { error } = await sb.from("user_favorites").insert({
      user_id: userId,
      section: FAVORITES_SECTION_TOOLS,
      item_key: toolName,
      item_label: toolName,
      metadata: {},
    });
    if (error && error.code !== "23505") {
      toolState.favorites.delete(toolName);
      applyFilters();
      setToolStatus(`Erro ao salvar favorito: ${error.message}`, true);
      return;
    }
  }
  saveToolFavoritesToLocal();
}

function setGhostStatus(message, isError = false) {
  if (!refs.ghostAdminStatus) return;
  refs.ghostAdminStatus.textContent = message;
  refs.ghostAdminStatus.style.color = isError ? "#ffb3a4" : "";
}

function setToolStatus(message, isError = false) {
  if (!refs.toolAdminStatus) return;
  refs.toolAdminStatus.textContent = message;
  refs.toolAdminStatus.style.color = isError ? "#ffb3a4" : "";
}

function resetToolFormState() {
  toolState.editingId = null;
  toolState.editingName = "";
  if (refs.toolFormTitle) refs.toolFormTitle.textContent = "Adicionar Ferramenta";
  if (refs.cancelToolEdit) refs.cancelToolEdit.hidden = true;
}

function renderToolAdminList() {
  if (!refs.adminToolList) return;
  refs.adminToolList.innerHTML = "";

  toolState.items.forEach((tool) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${tool.name} - ${tool.evidence || "Sem evidencia"}`;

    const actions = document.createElement("div");
    actions.className = "ghost-admin-item-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "login-btn ghost-admin-mini-btn";
    editBtn.textContent = "Editar";
    editBtn.dataset.action = "edit-tool";
    editBtn.dataset.toolId = tool.id ?? "";
    editBtn.dataset.toolName = tool.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "login-btn ghost-admin-mini-btn ghost-admin-danger-btn";
    deleteBtn.textContent = "Excluir";
    deleteBtn.dataset.action = "delete-tool";
    deleteBtn.dataset.toolId = tool.id ?? "";
    deleteBtn.dataset.toolName = tool.name;

    actions.append(editBtn, deleteBtn);
    li.append(label, actions);
    refs.adminToolList.append(li);
  });
}

function refreshToolFiltersAndView() {
  createCheckList(refs.toolFilters, "tool", toolState.items.map((item) => item.name));
  renderToolAdminList();
  applyFilters();
}

async function reloadToolsAndView() {
  toolState.items = await loadToolDataFromSupabase();
  refreshToolFiltersAndView();
}

function findToolByIdOrName(toolId, toolName) {
  if (toolId) {
    const byId = toolState.items.find((tool) => String(tool.id) === String(toolId));
    if (byId) return byId;
  }
  return toolState.items.find((tool) => tool.name === toolName) || null;
}

function fillToolFormForEdit(tool) {
  if (!refs.adminToolForm) return;
  toolState.editingId = tool.id ?? null;
  toolState.editingName = tool.name;
  refs.toolName.value = tool.name || "";
  refs.toolAbout.value = tool.about || "";
  refs.toolHowToUse.value = tool.howToUse || "";
  refs.toolEvidence.value = tool.evidence || "";
  if (refs.toolFormTitle) refs.toolFormTitle.textContent = "Editar Ferramenta";
  if (refs.cancelToolEdit) refs.cancelToolEdit.hidden = false;
}

function setupToolAdmin() {
  if (document.body.dataset.page !== "ferramentas") return;

  refs.cancelToolEdit?.addEventListener("click", () => {
    refs.adminToolForm?.reset();
    resetToolFormState();
    setToolStatus("");
  });

  refs.adminToolForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supaState.isAdmin) {
      setToolStatus("Somente admin pode cadastrar/editar ferramentas.", true);
      return;
    }

    const name = refs.toolName?.value.trim();
    if (!name) return;
    const payload = {
      name,
      about: refs.toolAbout?.value.trim() || "",
      how_to_use: refs.toolHowToUse?.value.trim() || "",
      evidence: refs.toolEvidence?.value.trim() || "",
    };

    const sb = setupSupabaseClient();
    if (!sb) {
      setToolStatus("Supabase indisponivel.", true);
      return;
    }

    let query = sb.from("investigation_tools");
    let result;
    if (toolState.editingId || toolState.editingName) {
      query = query.update(payload);
      query = toolState.editingId ? query.eq("id", toolState.editingId) : query.eq("name", toolState.editingName);
      result = await query;
    } else {
      result = await query.insert(payload);
    }

    if (result.error) {
      setToolStatus(`Erro ao salvar ferramenta: ${result.error.message}`, true);
      return;
    }

    refs.adminToolForm.reset();
    resetToolFormState();
    await reloadToolsAndView();
    setToolStatus("Ferramenta salva.");
  });

  refs.adminToolList?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !supaState.isAdmin) return;
    const action = button.dataset.action;
    const toolId = button.dataset.toolId || "";
    const toolName = button.dataset.toolName || "";
    const tool = findToolByIdOrName(toolId, toolName);
    if (!tool) return;

    if (action === "edit-tool") {
      fillToolFormForEdit(tool);
      setToolStatus("Edicao carregada no formulario.");
      return;
    }

    if (action === "delete-tool") {
      if (!confirm(`Excluir ferramenta "${tool.name}"?`)) return;
      const sb = setupSupabaseClient();
      if (!sb) {
        setToolStatus("Supabase indisponivel.", true);
        return;
      }
      let query = sb.from("investigation_tools").delete();
      query = tool.id ? query.eq("id", tool.id) : query.eq("name", tool.name);
      const { error } = await query;
      if (error) {
        setToolStatus(`Erro ao excluir ferramenta: ${error.message}`, true);
        return;
      }
      await reloadToolsAndView();
      setToolStatus("Ferramenta removida.");
    }
  });
}

function upsertGhostState(loaded) {
  ghostState.evidences = [...loaded.evidences];
  ghostState.ghosts = [...loaded.ghosts];
  data.evidencias = ghostState.evidences.map((ev) => ev.name);
}

function refreshGhostFiltersAndView() {
  createCheckList(refs.evidenceFilters, "evidence", data.evidencias);
  createCheckList(refs.ghostTraitFilters, "ghost-trait", getUniqueGhostTraits());
  createCheckList(refs.ghostCategoryFilters, "ghost-category", getUniqueGhostCategories());
  populateGhostEvidenceSelects();
  renderAdminLists();
  applyFilters();
}

function populateGhostEditEvidenceSelects() {
  const selects = [refs.editGhostEvidence1, refs.editGhostEvidence2, refs.editGhostEvidence3];
  selects.forEach((select) => {
    if (!select) return;
    select.innerHTML = "";
    ghostState.evidences.forEach((ev) => {
      const option = document.createElement("option");
      option.value = ev.name;
      option.textContent = ev.name;
      select.append(option);
    });
  });
}

async function reloadGhostDataAndView() {
  const loaded = await loadGhostDataFromSupabase();
  upsertGhostState(loaded);
  refreshGhostFiltersAndView();
}

function findGhostByIdOrName(ghostId, ghostName) {
  if (ghostId) {
    const byId = ghostState.ghosts.find((ghost) => String(ghost.id) === String(ghostId));
    if (byId) return byId;
  }
  return ghostState.ghosts.find((ghost) => ghost.name === ghostName) || null;
}

function openGhostEditModal(ghost) {
  if (!refs.ghostEditModal || !refs.ghostEditForm) return;
  populateGhostEditEvidenceSelects();

  uiState.editingGhostId = ghost.id ?? null;
  uiState.editingGhostName = ghost.name;

  refs.editGhostName.value = ghost.name || "";
  refs.editGhostEvidence1.value = ghost.evidences[0] || "";
  refs.editGhostEvidence2.value = ghost.evidences[1] || "";
  refs.editGhostEvidence3.value = ghost.evidences[2] || "";
  refs.editGhostSpeed.value = ghost.speed || "";
  refs.editGhostBehavior.value = ghost.behavior || "";
  refs.editGhostCategory.value = ghost.category || "";
  refs.editGhostAbout.value = ghost.about || "";
  refs.editGhostAppearance.value = ghost.appearance || "";

  refs.ghostEditModal.hidden = false;
  refs.ghostEditModal.setAttribute("aria-hidden", "false");
  refs.editGhostName.focus();
}

function closeGhostEditModal() {
  if (!refs.ghostEditModal || !refs.ghostEditForm) return;
  refs.ghostEditModal.hidden = true;
  refs.ghostEditModal.setAttribute("aria-hidden", "true");
  refs.ghostEditForm.reset();
  uiState.editingGhostId = null;
  uiState.editingGhostName = "";
}

function renderAdminLists() {
  if (!refs.adminEvidenceList || !refs.adminGhostList) return;

  refs.adminEvidenceList.innerHTML = "";
  refs.adminGhostList.innerHTML = "";

  ghostState.evidences.forEach((evidence) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = evidence.name;

    const actions = document.createElement("div");
    actions.className = "ghost-admin-item-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "login-btn ghost-admin-mini-btn";
    editBtn.textContent = "Editar";
    editBtn.dataset.action = "edit-evidence";
    editBtn.dataset.evidenceName = evidence.name;
    editBtn.dataset.evidenceId = evidence.id ?? "";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "login-btn ghost-admin-mini-btn ghost-admin-danger-btn";
    deleteBtn.textContent = "Excluir";
    deleteBtn.dataset.action = "delete-evidence";
    deleteBtn.dataset.evidenceName = evidence.name;
    deleteBtn.dataset.evidenceId = evidence.id ?? "";

    actions.append(editBtn, deleteBtn);
    li.append(label, actions);
    refs.adminEvidenceList.append(li);
  });

  ghostState.ghosts.forEach((ghost) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${ghost.name} - ${ghost.evidences.join(", ")}`;

    const actions = document.createElement("div");
    actions.className = "ghost-admin-item-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "login-btn ghost-admin-mini-btn";
    editBtn.textContent = "Editar";
    editBtn.dataset.action = "edit-ghost";
    editBtn.dataset.ghostId = ghost.id ?? "";
    editBtn.dataset.ghostName = ghost.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "login-btn ghost-admin-mini-btn ghost-admin-danger-btn";
    deleteBtn.textContent = "Excluir";
    deleteBtn.dataset.action = "delete-ghost";
    deleteBtn.dataset.ghostId = ghost.id ?? "";
    deleteBtn.dataset.ghostName = ghost.name;

    actions.append(editBtn, deleteBtn);
    li.append(label, actions);
    refs.adminGhostList.append(li);
  });
}

async function renameEvidenceInSupabase(sb, evidenceId, oldName, newName) {
  let updateEvidence = sb.from("ghost_evidences").update({ name: newName });
  updateEvidence = evidenceId ? updateEvidence.eq("id", evidenceId) : updateEvidence.eq("name", oldName);
  const evidenceResult = await updateEvidence;
  if (evidenceResult.error) return evidenceResult.error;

  const updates = await Promise.all([
    sb.from("ghosts").update({ evidence_1: newName }).eq("evidence_1", oldName),
    sb.from("ghosts").update({ evidence_2: newName }).eq("evidence_2", oldName),
    sb.from("ghosts").update({ evidence_3: newName }).eq("evidence_3", oldName),
  ]);
  const failed = updates.find((res) => res.error);
  return failed?.error || null;
}

async function handleAdminEvidenceAction(button) {
  const action = button.dataset.action;
  const evidenceName = button.dataset.evidenceName || "";
  const evidenceId = button.dataset.evidenceId || null;
  const sb = setupSupabaseClient();

  if (!sb) {
    setGhostStatus("Supabase indisponivel.", true);
    return;
  }

  if (action === "edit-evidence") {
    const nextName = prompt("Novo nome da evidencia:", evidenceName)?.trim();
    if (!nextName || nextName === evidenceName) return;
    if (ghostState.evidences.some((ev) => ev.name.toLowerCase() === nextName.toLowerCase())) {
      setGhostStatus("Ja existe uma evidencia com esse nome.", true);
      return;
    }

    const error = await renameEvidenceInSupabase(sb, evidenceId, evidenceName, nextName);
    if (error) {
      setGhostStatus(`Erro ao editar evidencia: ${error.message}`, true);
      return;
    }
    await reloadGhostDataAndView();
    setGhostStatus("Evidencia atualizada.");
    return;
  }

  if (action === "delete-evidence") {
    const usedBy = ghostState.ghosts.filter((ghost) => ghost.evidences.includes(evidenceName));
    if (usedBy.length) {
      setGhostStatus("Nao e possivel excluir: ha fantasmas usando essa evidencia.", true);
      return;
    }
    if (!confirm(`Excluir evidencia "${evidenceName}"?`)) return;

    let query = sb.from("ghost_evidences").delete();
    query = evidenceId ? query.eq("id", evidenceId) : query.eq("name", evidenceName);
    const { error } = await query;
    if (error) {
      setGhostStatus(`Erro ao excluir evidencia: ${error.message}`, true);
      return;
    }
    await reloadGhostDataAndView();
    setGhostStatus("Evidencia removida.");
  }
}

async function handleAdminGhostAction(button) {
  const action = button.dataset.action;
  const ghostId = button.dataset.ghostId || "";
  const ghostName = button.dataset.ghostName || "";
  const sb = setupSupabaseClient();
  if (!sb) {
    setGhostStatus("Supabase indisponivel.", true);
    return;
  }

  const ghost = findGhostByIdOrName(ghostId, ghostName);
  if (!ghost) {
    setGhostStatus("Fantasma nao encontrado.", true);
    return;
  }

  if (action === "delete-ghost") {
    if (!confirm(`Excluir fantasma "${ghost.name}"?`)) return;
    let query = sb.from("ghosts").delete();
    query = ghost.id ? query.eq("id", ghost.id) : query.eq("name", ghost.name);
    const { error } = await query;
    if (error) {
      setGhostStatus(`Erro ao excluir fantasma: ${error.message}`, true);
      return;
    }
    await reloadGhostDataAndView();
    setGhostStatus("Fantasma removido.");
    return;
  }

  if (action === "edit-ghost") {
    openGhostEditModal(ghost);
  }
}

function setupGhostEditModalEvents() {
  if (!refs.ghostEditModal || !refs.ghostEditForm) return;

  refs.closeGhostEditModal?.addEventListener("click", closeGhostEditModal);
  refs.cancelGhostEdit?.addEventListener("click", closeGhostEditModal);
  refs.ghostEditModal.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-close-edit-modal='true']");
    if (closeTarget) closeGhostEditModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !refs.ghostEditModal.hidden) {
      closeGhostEditModal();
    }
  });

  refs.ghostEditForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supaState.isAdmin) {
      setGhostStatus("Somente admin pode editar.", true);
      return;
    }

    const nextName = refs.editGhostName?.value.trim() || "";
    const ev1 = refs.editGhostEvidence1?.value || "";
    const ev2 = refs.editGhostEvidence2?.value || "";
    const ev3 = refs.editGhostEvidence3?.value || "";
    const speed = refs.editGhostSpeed?.value.trim() || "Normal";
    const behavior = refs.editGhostBehavior?.value.trim() || "Instavel";
    const category = refs.editGhostCategory?.value.trim() || "Introvertido";
    const about = refs.editGhostAbout?.value?.trim() || "";
    const appearance = refs.editGhostAppearance?.value?.trim() || "";

    if (!nextName || !ev1 || !ev2 || !ev3) {
      setGhostStatus("Preencha nome e as 3 evidencias.", true);
      return;
    }
    const selectedSet = new Set([ev1, ev2, ev3]);
    if (selectedSet.size < 3) {
      setGhostStatus("Escolha 3 evidencias diferentes.", true);
      return;
    }

    const sb = setupSupabaseClient();
    if (!sb) {
      setGhostStatus("Supabase indisponivel.", true);
      return;
    }

    const payload = {
      name: nextName,
      evidence_1: ev1,
      evidence_2: ev2,
      evidence_3: ev3,
      speed,
      behavior,
      category,
      about,
      appearance,
    };

    let query = sb.from("ghosts").update(payload);
    query = uiState.editingGhostId
      ? query.eq("id", uiState.editingGhostId)
      : query.eq("name", uiState.editingGhostName);
    const { error } = await query;
    if (error) {
      setGhostStatus(`Erro ao editar fantasma: ${error.message}`, true);
      return;
    }

    closeGhostEditModal();
    await reloadGhostDataAndView();
    setGhostStatus("Fantasma atualizado.");
  });
}

function setupAdminManageEvents() {
  refs.adminEvidenceList?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !supaState.isAdmin) return;
    await handleAdminEvidenceAction(button);
  });

  refs.adminGhostList?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !supaState.isAdmin) return;
    await handleAdminGhostAction(button);
  });
}

function setAdminPanelExpanded(expanded) {
  if (!refs.adminPanelToggle || !refs.ghostAdminBody) return;
  refs.ghostAdminBody.hidden = !expanded;
  refs.adminPanelToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  refs.adminPanelToggle.textContent = expanded ? "Fechar painel" : "Abrir painel";
}

function setAdminMenuSectionExpanded(toggleButton, expanded) {
  if (!toggleButton) return;
  const contentId = toggleButton.dataset.adminMenuToggle;
  if (!contentId) return;
  const content = document.getElementById(contentId);
  if (!content) return;
  content.hidden = !expanded;
  toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
}

function setupAdminMenuSections() {
  if (!refs.adminMenuToggles.length) return;
  refs.adminMenuToggles.forEach((toggleButton) => {
    setAdminMenuSectionExpanded(toggleButton, false);
    toggleButton.addEventListener("click", () => {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
      setAdminMenuSectionExpanded(toggleButton, !isExpanded);
    });
  });
}

function setupGhostAdminPanelToggle() {
  if (!["fantasmas", "ferramentas"].includes(document.body.dataset.page || "")) return;
  if (!refs.adminPanelToggle || !refs.ghostAdminBody) return;
  setAdminPanelExpanded(false);
  refs.adminPanelToggle.addEventListener("click", () => {
    const isExpanded = refs.adminPanelToggle.getAttribute("aria-expanded") === "true";
    setAdminPanelExpanded(!isExpanded);
  });
}

function setupGhostAdmin() {
  if (document.body.dataset.page !== "fantasmas") return;
  setupAdminManageEvents();

  refs.adminEvidenceForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supaState.isAdmin) {
      setGhostStatus("Somente admin pode cadastrar.", true);
      return;
    }

    const name = refs.newEvidenceName?.value.trim();
    if (!name) return;
    if (ghostState.evidences.some((ev) => ev.name.toLowerCase() === name.toLowerCase())) {
      setGhostStatus("Essa evidencia ja existe.", true);
      return;
    }

    const sb = setupSupabaseClient();
    if (!sb) {
      setGhostStatus("Supabase indisponivel.", true);
      return;
    }
    const { error } = await sb.from("ghost_evidences").insert({ name });
    if (error) {
      setGhostStatus(`Erro ao salvar evidencia: ${error.message}`, true);
      return;
    }

    await reloadGhostDataAndView();
    refs.newEvidenceName.value = "";
    setGhostStatus("Evidencia adicionada.");
  });

  refs.adminGhostForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supaState.isAdmin) {
      setGhostStatus("Somente admin pode cadastrar.", true);
      return;
    }

    const name = refs.ghostName?.value.trim();
    if (!name) return;

    const ev1 = refs.ghostEvidence1?.value;
    const ev2 = refs.ghostEvidence2?.value;
    const ev3 = refs.ghostEvidence3?.value;
    const selected = [ev1, ev2, ev3];
    const unique = new Set(selected);
    if (unique.size < 3) {
      setGhostStatus("Escolha 3 evidencias diferentes.", true);
      return;
    }

    const ghostPayload = {
      name,
      evidence_1: selected[0],
      evidence_2: selected[1],
      evidence_3: selected[2],
      speed: refs.ghostSpeed?.value || "Normal",
      behavior: refs.ghostBehavior?.value || "Instavel",
      category: refs.ghostCategory?.value || "Introvertido",
      about: refs.ghostAbout?.value?.trim() || "",
      appearance: refs.ghostAppearance?.value?.trim() || "",
    };

    const sb = setupSupabaseClient();
    if (!sb) {
      setGhostStatus("Supabase indisponivel.", true);
      return;
    }
    const { error } = await sb.from("ghosts").insert(ghostPayload);
    if (error) {
      setGhostStatus(`Erro ao salvar fantasma: ${error.message}`, true);
      return;
    }

    await reloadGhostDataAndView();
    refs.adminGhostForm.reset();
    setGhostStatus("Fantasma adicionado.");
  });
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

async function init() {
  const page = document.body.dataset.page || "";
  if (page === "fantasmas") {
    const loaded = await loadGhostDataFromSupabase();
    upsertGhostState(loaded);
    await loadGhostFavorites();
  } else if (page === "ferramentas") {
    toolState.items = await loadToolDataFromSupabase();
    await loadToolFavorites();
  }

  setupThemeToggle();
  setupFolderTabs();
  setupGhostAdminPanelToggle();
  setupAdminMenuSections();
  setupPageScopedFilters();
  await refreshGhostAuthState();
  createCheckList(refs.toolFilters, "tool", toolState.items.map((item) => item.name));
  createCheckList(refs.galleryFilters, "gallery", data.categoriasGaleria);
  createCheckList(refs.investigatorFilters, "investigator", data.investigadores.map((item) => item.nome));
  createCheckList(refs.functionFilters, "function", data.funcoes);
  createCheckList(refs.evidenceFilters, "evidence", data.evidencias);
  createCheckList(refs.ghostTraitFilters, "ghost-trait", getUniqueGhostTraits());
  createCheckList(refs.ghostCategoryFilters, "ghost-category", getUniqueGhostCategories());
  populateGhostEvidenceSelects();
  populateGhostEditEvidenceSelects();
  renderAdminLists();
  renderToolAdminList();
  setupGhostAdmin();
  setupToolAdmin();
  setupGhostEditModalEvents();
  setupGhostCardMarks();
  setupToolCardActions();

  bindEvents();
  applyFilters();
}

init();
