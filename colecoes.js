"use strict";

const SUPABASE_URL = "https://bwkzbcfrgmckiruawlqt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a3piY2ZyZ21ja2lydWF3bHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzEzNzIsImV4cCI6MjA4ODUwNzM3Mn0.QlIZV9C5gezRKX2YmtHtZUzZHgVRUi5uOLl1Rmh2LSM";
const ADMIN_EMAIL_ALLOWLIST = ["rayandepaulagpt@gmail.com"];
const FAVORITES_SECTION_GHOSTS = "fantasmas";
const FAVORITES_SECTION_TOOLS = "ferramentas";
const FAVORITES_SECTION_EVIDENCES = "evidencias";
const FAVORITES_SECTION_DIARY = "diario";
const DIARY_FILTERS_PAGE_SLUG = "reader-diary-filters";
const DIARY_IMAGES_BUCKET = "diary-images";
const DIARY_FILES_BUCKET = "diary-files";

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
  diarioTipos: ["Dicas", "Aprendizados", "Registros"],
  diarioMidias: ["Galeria de Fotos"],
  diario: [],
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

const defaultEvidenceData = [
  {
    name: "EMF Nivel 5",
    about: "Manifestacao eletromagnetica extrema ligada a presencas ativas.",
    equipment: "Leitor EMF",
    howToIdentify: "Oscilacao consistente no nivel 5 durante atividade.",
  },
  {
    name: "Spirit Box",
    about: "Resposta vocal da entidade por radio de frequencia.",
    equipment: "Spirit Box",
    howToIdentify: "Perguntas diretas com resposta audivel no equipamento.",
  },
  {
    name: "Escrita Fantasma",
    about: "Registro fisico deixado por entidade em caderno ritual.",
    equipment: "Livro de Escrita",
    howToIdentify: "Texto aparece no livro apos interacao paranormal.",
  },
  {
    name: "D.O.T.S",
    about: "Silhueta paranormal cruza grade de laser de deteccao.",
    equipment: "Projetor D.O.T.S",
    howToIdentify: "Forma luminosa atravessando o padrao do projetor.",
  },
  {
    name: "Orbes Fantasmagoricos",
    about: "Particulas espectrais visiveis em camera de video.",
    equipment: "Camera de Video",
    howToIdentify: "Orbes flutuantes captadas no monitor da investigacao.",
  },
  {
    name: "Temperatura Congelante",
    about: "Queda termica abrupta causada por presenca espiritual.",
    equipment: "Termometro",
    howToIdentify: "Leitura abaixo de zero em area assombrada.",
  },
];

const defaultDiaryData = [
  {
    title: "Dica 1",
    type: "Dicas",
    mediaTags: ["Galeria de Fotos"],
    content: "Sempre inicie pela varredura de temperatura e EMF nos cantos mais escuros do local.",
    imageUrl: "",
    imagePath: "",
    pdfUrl: "",
    pdfPath: "",
    pdfName: "",
  },
  {
    title: "Dica 2",
    type: "Aprendizados",
    mediaTags: ["Galeria de Fotos"],
    content: "Respostas de Spirit Box costumam aparecer com mais frequencia quando as luzes estao apagadas.",
    imageUrl: "",
    imagePath: "",
    pdfUrl: "",
    pdfPath: "",
    pdfName: "",
  },
  {
    title: "Dica 3",
    type: "Registros",
    mediaTags: ["Galeria de Fotos"],
    content: "Documente horarios, comodos e evidencias em sequencia para reduzir erros na identificacao.",
    imageUrl: "",
    imagePath: "",
    pdfUrl: "",
    pdfPath: "",
    pdfName: "",
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

const evidenceState = {
  items: [],
  editingId: null,
  editingName: "",
  marks: {},
  favorites: new Set(),
};

const diaryState = {
  items: [],
  editingId: null,
  editingTitle: "",
  favorites: new Set(),
  expandedEntries: new Set(),
  filterConfig: {
    types: [],
    media: [],
  },
};

const investigatorState = {
  editingId: null,
  editingName: "",
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
  diaryGrid: document.getElementById("diaryGrid"),
  diaryCount: document.getElementById("diaryCount"),
  openDiaryAdminFromHeader: document.getElementById("openDiaryAdminFromHeader"),
  diaryTypeFilters: document.getElementById("diaryTypeFilters"),
  diaryMediaFilters: document.getElementById("diaryMediaFilters"),
  adminDiaryForm: document.getElementById("adminDiaryForm"),
  diaryTitleField: document.getElementById("diaryTitleField"),
  diaryTypeField: document.getElementById("diaryTypeField"),
  diaryMediaField: document.getElementById("diaryMediaField"),
  diaryImageFileField: document.getElementById("diaryImageFileField"),
  diaryPdfFileField: document.getElementById("diaryPdfFileField"),
  diaryContentField: document.getElementById("diaryContentField"),
  diaryFormTitle: document.getElementById("diaryFormTitle"),
  cancelDiaryEdit: document.getElementById("cancelDiaryEdit"),
  adminDiaryList: document.getElementById("adminDiaryList"),
  diaryAdminStatus: document.getElementById("diaryAdminStatus"),
  diaryFilterTypeInput: document.getElementById("diaryFilterTypeInput"),
  diaryFilterTypeAddBtn: document.getElementById("diaryFilterTypeAddBtn"),
  adminDiaryTypeList: document.getElementById("adminDiaryTypeList"),
  diaryFilterMediaInput: document.getElementById("diaryFilterMediaInput"),
  diaryFilterMediaAddBtn: document.getElementById("diaryFilterMediaAddBtn"),
  adminDiaryMediaList: document.getElementById("adminDiaryMediaList"),
  adminInvestigatorForm: document.getElementById("adminInvestigatorForm"),
  investigatorNameField: document.getElementById("investigatorNameField"),
  investigatorLevelField: document.getElementById("investigatorLevelField"),
  investigatorDescriptionField: document.getElementById("investigatorDescriptionField"),
  investigatorFunctionsField: document.getElementById("investigatorFunctionsField"),
  investigatorFormTitle: document.getElementById("investigatorFormTitle"),
  cancelInvestigatorEdit: document.getElementById("cancelInvestigatorEdit"),
  adminInvestigatorList: document.getElementById("adminInvestigatorList"),
  investigatorAdminStatus: document.getElementById("investigatorAdminStatus"),
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
  adminEvidenceCardForm: document.getElementById("adminEvidenceCardForm"),
  evidenceNameField: document.getElementById("evidenceNameField"),
  evidenceAboutField: document.getElementById("evidenceAboutField"),
  evidenceEquipmentField: document.getElementById("evidenceEquipmentField"),
  evidenceIdentifyField: document.getElementById("evidenceIdentifyField"),
  evidenceFormTitle: document.getElementById("evidenceFormTitle"),
  cancelEvidenceEdit: document.getElementById("cancelEvidenceEdit"),
  adminEvidenceCardList: document.getElementById("adminEvidenceCardList"),
  evidenceAdminStatus: document.getElementById("evidenceAdminStatus"),
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
  diario: ["diary_type", "diary_media"],
};

function setupThemeToggle() {
  const root = document.body;
  const storageKey = "ecosTheme";
  const savedTheme = localStorage.getItem(storageKey);
  const preferredTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "dark";
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

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildStorageSafeName(fileName) {
  return String(fileName || "arquivo")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w.-]+/g, "-");
}

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function splitTextIntoChunks(text, maxChunks = 3) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return [];

  const sentences = trimmed.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length > 1) {
    const chunkSize = Math.ceil(sentences.length / maxChunks);
    const chunks = [];
    for (let index = 0; index < sentences.length; index += chunkSize) {
      chunks.push(sentences.slice(index, index + chunkSize).join(" ").trim());
    }
    return chunks.slice(0, maxChunks).filter(Boolean);
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  const chunkSize = Math.ceil(words.length / maxChunks);
  const chunks = [];
  for (let index = 0; index < words.length; index += chunkSize) {
    chunks.push(words.slice(index, index + chunkSize).join(" ").trim());
  }
  return chunks.slice(0, maxChunks).filter(Boolean);
}

function formatDiaryContent(content) {
  const normalized = String(content || "").replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const explicitParagraphs = normalized
    .split(/\n\s*\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (explicitParagraphs.length > 1) {
    return explicitParagraphs.slice(0, 3);
  }

  return splitTextIntoChunks(normalized, 3);
}

function getDiaryEntryKey(itemOrId, fallbackTitle = "") {
  if (typeof itemOrId === "object" && itemOrId) {
    return itemOrId.id ? `id:${itemOrId.id}` : `title:${itemOrId.title || ""}`;
  }
  return itemOrId ? `id:${itemOrId}` : `title:${fallbackTitle}`;
}

function shouldShowDiaryReadMore(item) {
  const paragraphs = formatDiaryContent(item.content);
  const combinedLength = paragraphs.join(" ").length;
  return paragraphs.length > 1 || combinedLength > 180;
}

function getDiaryPdfLabel(item) {
  const rawName = String(item?.pdfName || "").trim();
  if (rawName) return rawName;
  const title = String(item?.title || "Anotacao").trim() || "Anotacao";
  return `${title}.pdf`;
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
      <article class="card investigator-card investigator-panel-card">
        <div class="investigator-panel-actions" aria-hidden="true">
          <span class="investigator-panel-action">✕</span>
          <span class="investigator-panel-action">✓</span>
          <span class="investigator-panel-action">★</span>
        </div>
        <div class="investigator-panel-head">${item.nome}</div>
        <div class="investigator-panel-level">${item.nivel}</div>
        <div class="investigator-panel-body">
          <p>${item.descricao}</p>
          <p><strong>Descricao e Funcao:</strong> ${item.funcoes.join(" • ")}</p>
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
      <article class="card tool-card evidence-advanced-card ${evidenceState.marks[item.name] === "excluded" ? "tool-card-excluded" : ""} ${evidenceState.marks[item.name] === "confirmed" ? "tool-card-confirmed" : ""} ${evidenceState.favorites.has(item.name) ? "tool-card-favorite" : ""}">
        <div class="tool-card-head">${item.name}</div>
        <div class="tool-card-actions" aria-label="Marcacao da evidencia">
          <button
            type="button"
            class="tool-mark-btn tool-mark-confirm ${evidenceState.marks[item.name] === "confirmed" ? "is-active" : ""}"
            data-action="confirm-evidence"
            data-evidence-name="${encodeURIComponent(item.name)}"
            aria-label="Marcar evidencia como valida"
            title="Marcar evidencia como valida"
          >✓</button>
          <button
            type="button"
            class="tool-mark-btn tool-mark-exclude ${evidenceState.marks[item.name] === "excluded" ? "is-active" : ""}"
            data-action="exclude-evidence"
            data-evidence-name="${encodeURIComponent(item.name)}"
            aria-label="Marcar evidencia como descartada"
            title="Marcar evidencia como descartada"
          >✕</button>
          <button
            type="button"
            class="tool-mark-btn tool-mark-favorite ${evidenceState.favorites.has(item.name) ? "is-active" : ""}"
            data-action="favorite-evidence"
            data-evidence-name="${encodeURIComponent(item.name)}"
            aria-label="Favoritar evidencia"
            title="Favoritar evidencia"
          >★</button>
        </div>
        <div class="tool-card-body">
          <p><strong>Sobre:</strong> ${item.about || "-"}</p>
          <p><strong>Equipamento:</strong> ${item.equipment || "-"}</p>
          <p><strong>Como identificar:</strong> ${item.howToIdentify || "-"}</p>
        </div>
      </article>
    `
    )
    .join("");

  refs.evidenceCount.textContent = `${items.length} exibidas`;
}

function renderDiary(items) {
  if (!refs.diaryGrid || !refs.diaryCount) return;
  if (!items.length) {
    renderEmpty(refs.diaryGrid, "Nenhuma anotacao encontrada com os filtros atuais.");
    refs.diaryCount.textContent = "0 exibidas";
    return;
  }

  refs.diaryGrid.innerHTML = items
    .map(
      (item) => {
        const itemKey = getDiaryEntryKey(item);
        const isExpanded = diaryState.expandedEntries.has(itemKey);
        const canExpand = shouldShowDiaryReadMore(item);

        return `
      <article class="card diario-card">
        <header class="diario-card-head">
          <h3>${escapeHtml(item.title)}</h3>
          <div class="diario-card-actions">
            ${
              supaState.isAdmin
                ? `
                  <button type="button" class="login-btn ghost-admin-mini-btn" data-action="edit-diary" data-diary-id="${item.id ?? ""}" data-diary-title="${encodeURIComponent(item.title)}">Editar</button>
                  <button type="button" class="login-btn ghost-admin-mini-btn ghost-admin-danger-btn" data-action="delete-diary" data-diary-id="${item.id ?? ""}" data-diary-title="${encodeURIComponent(item.title)}">Excluir</button>
                `
                : ""
            }
            <button
              type="button"
              class="tool-mark-btn tool-mark-favorite diario-save-btn ${diaryState.favorites.has(item.title) ? "is-active" : ""}"
              data-action="favorite-diary"
              data-diary-title="${encodeURIComponent(item.title)}"
              aria-label="Salvar anotacao"
              title="Salvar anotacao"
            >★</button>
          </div>
        </header>
        <div class="diario-card-body">
          <div class="diario-card-meta">
            <span class="diario-card-chip">${escapeHtml(item.type || "Registros")}</span>
            ${(item.mediaTags || [])
              .map((tag) => `<span class="diario-card-chip">${escapeHtml(tag)}</span>`)
              .join("")}
          </div>
          ${
            item.imageUrl
              ? `
                <div class="diario-card-image-wrap">
                  <img class="diario-card-image" src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(`Imagem da anotacao ${item.title}`)}" loading="lazy" />
                  <button
                    type="button"
                    class="login-btn diary-image-inspect-btn"
                    data-action="view-diary-image"
                    data-diary-image="${escapeHtml(item.imageUrl)}"
                    data-diary-title="${encodeURIComponent(item.title)}"
                  >Inspecionar</button>
                </div>
              `
              : ""
          }
          ${
            item.pdfUrl
              ? `
                <div class="diario-card-file-wrap">
                  <div class="diario-card-file-meta">
                    <span class="diario-card-file-badge">PDF</span>
                    <p>${escapeHtml(getDiaryPdfLabel(item))}</p>
                  </div>
                  <button
                    type="button"
                    class="login-btn diario-file-open-btn"
                    data-action="view-diary-pdf"
                    data-diary-pdf="${escapeHtml(item.pdfUrl)}"
                    data-diary-title="${encodeURIComponent(item.title)}"
                  >Abrir PDF</button>
                </div>
              `
              : ""
          }
          <div class="diario-card-copy ${canExpand && !isExpanded ? "is-collapsed" : ""}">
            ${formatDiaryContent(item.content)
              .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
              .join("")}
          </div>
          ${
            canExpand
              ? `
                <button
                  type="button"
                  class="login-btn diario-read-more-btn"
                  data-action="toggle-diary-expand"
                  data-diary-id="${item.id ?? ""}"
                  data-diary-title="${encodeURIComponent(item.title)}"
                  aria-expanded="${isExpanded ? "true" : "false"}"
                >${isExpanded ? "Ler menos" : "Ler mais"}</button>
              `
              : ""
          }
        </div>
      </article>
    `;
      }
    )
    .join("");

  refs.diaryCount.textContent = `${items.length} exibidas`;
}

async function loadDiaryDataFromSupabase() {
  const sb = setupSupabaseClient();
  if (!sb) return structuredClone(defaultDiaryData);

  const { data: rows, error } = await sb
    .from("reader_diary_entries")
    .select("id, title, entry_type, media_tags, content, image_url, image_path, pdf_url, pdf_path, pdf_name")
    .order("created_at", { ascending: true });

  if (error) {
    setDiaryStatus("Falha ao carregar Diario do Supabase. Usando dados locais.", true);
    return structuredClone(defaultDiaryData);
  }

  const mapped = (rows || []).map((row) => ({
    id: row.id,
    title: row.title || "",
    type: row.entry_type || "Registros",
    mediaTags: Array.isArray(row.media_tags) ? row.media_tags : [],
    content: row.content || "",
    imageUrl: row.image_url || "",
    imagePath: row.image_path || "",
    pdfUrl: row.pdf_url || "",
    pdfPath: row.pdf_path || "",
    pdfName: row.pdf_name || "",
  }));
  return mapped.length ? mapped : structuredClone(defaultDiaryData);
}

function getUniqueDiaryTypes() {
  const set = new Set();
  diaryState.filterConfig.types.forEach((item) => {
    if (item) set.add(item);
  });
  diaryState.items.forEach((item) => {
    if (item.type) set.add(item.type);
  });
  return [...set];
}

function getUniqueDiaryMedia() {
  const set = new Set();
  diaryState.filterConfig.media.forEach((item) => {
    if (item) set.add(item);
  });
  diaryState.items.forEach((item) => {
    (item.mediaTags || []).forEach((tag) => {
      if (tag) set.add(tag);
    });
  });
  return [...set];
}

async function loadDiaryFilterConfigFromSupabase() {
  const sb = setupSupabaseClient();
  if (!sb) {
    return {
      types: [...data.diarioTipos],
      media: [...data.diarioMidias],
    };
  }

  const { data: row, error } = await sb
    .from("site_pages")
    .select("content")
    .eq("slug", DIARY_FILTERS_PAGE_SLUG)
    .maybeSingle();

  if (error) {
    return {
      types: [...data.diarioTipos],
      media: [...data.diarioMidias],
    };
  }

  return {
    types: sanitizeDiaryFilterValues(row?.content?.types, data.diarioTipos),
    media: sanitizeDiaryFilterValues(row?.content?.media, data.diarioMidias),
  };
}

function sanitizeDiaryFilterValues(values, fallback = []) {
  const source = Array.isArray(values) ? values : fallback;
  const unique = new Map();
  source.forEach((value) => {
    const label = String(value || "").trim();
    if (!label) return;
    const key = normalizeText(label);
    if (!unique.has(key)) unique.set(key, label);
  });
  return [...unique.values()];
}

async function loadInvestigatorsFromSupabase() {
  const sb = setupSupabaseClient();
  if (!sb) {
    return {
      investigators: structuredClone(data.investigadores),
      functions: [...data.funcoes],
    };
  }

  const [investigatorsRes, functionsRes, linksRes] = await Promise.all([
    sb
      .from("investigation_investigators")
      .select("id, name, level, description")
      .order("name", { ascending: true }),
    sb
      .from("investigation_functions")
      .select("id, name")
      .order("name", { ascending: true }),
    sb.from("investigator_functions").select("investigator_id, function_id"),
  ]);

  if (investigatorsRes.error || functionsRes.error || linksRes.error) {
    return {
      investigators: structuredClone(data.investigadores),
      functions: [...data.funcoes],
    };
  }

  const functionsById = new Map(
    (functionsRes.data || [])
      .filter((row) => row?.id && row?.name)
      .map((row) => [String(row.id), row.name])
  );

  const investigatorFunctionMap = new Map();
  (linksRes.data || []).forEach((row) => {
    const investigatorId = String(row.investigator_id || "");
    const functionName = functionsById.get(String(row.function_id || ""));
    if (!investigatorId || !functionName) return;
    if (!investigatorFunctionMap.has(investigatorId)) {
      investigatorFunctionMap.set(investigatorId, []);
    }
    investigatorFunctionMap.get(investigatorId).push(functionName);
  });

  const investigators = (investigatorsRes.data || []).map((row) => ({
    id: row.id,
    nome: row.name || "",
    nivel: row.level || "Nivel I",
    descricao: row.description || "",
    funcoes: investigatorFunctionMap.get(String(row.id)) || [],
  }));

  const functions = (functionsRes.data || []).map((row) => row.name).filter(Boolean);

  return {
    investigators: investigators.length ? investigators : structuredClone(data.investigadores),
    functions: functions.length ? functions : [...data.funcoes],
  };
}

async function loadEvidenceDataFromSupabase() {
  const sb = setupSupabaseClient();
  if (!sb) return structuredClone(defaultEvidenceData);

  const { data: rows, error } = await sb
    .from("investigation_evidences")
    .select("id, name, about, equipment, how_to_identify")
    .order("name", { ascending: true });

  if (error) {
    setEvidenceStatus("Falha ao carregar evidencias do Supabase. Usando dados locais.", true);
    return structuredClone(defaultEvidenceData);
  }

  const mapped = (rows || []).map((row) => ({
    id: row.id,
    name: row.name,
    about: row.about || "",
    equipment: row.equipment || "",
    howToIdentify: row.how_to_identify || "",
  }));
  return mapped.length ? mapped : structuredClone(defaultEvidenceData);
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
  const selectedDiaryTypes = refs.diaryTypeFilters ? getSelectedValues(refs.diaryTypeFilters) : new Set();
  const selectedDiaryMedia = refs.diaryMediaFilters ? getSelectedValues(refs.diaryMediaFilters) : new Set();

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

  const filteredEvidences = evidenceState.items.filter((item) => {
    const byEvidence = selectedEvidences.size === 0 || selectedEvidences.has(item.name);
    const searchable = `${item.name} ${item.about} ${item.equipment} ${item.howToIdentify}`.toLowerCase();
    return byEvidence && matchesSearch(searchable, query);
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

  const filteredDiary = diaryState.items.filter((item) => {
    const byType = selectedDiaryTypes.size === 0 || selectedDiaryTypes.has(item.type);
    const byMedia =
      selectedDiaryMedia.size === 0 ||
      [...selectedDiaryMedia].every((media) => (item.mediaTags || []).includes(media));
    const searchable = `${item.title} ${item.type} ${(item.mediaTags || []).join(" ")} ${item.content}`.toLowerCase();
    return byType && byMedia && matchesSearch(searchable, query);
  });

  renderGallery(filteredGallery);
  renderTools(filteredTools);
  renderInvestigators(filteredInvestigators);
  renderEvidences(filteredEvidences);
  renderGhosts(filteredGhosts);
  renderDiary(filteredDiary);
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
    { key: "diary_type", box: refs.diaryTypeFilters },
    { key: "diary_media", box: refs.diaryMediaFilters },
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

function hasAdminRole(value) {
  if (Array.isArray(value)) {
    return value.some((item) => String(item || "").trim().toLowerCase() === "admin");
  }
  return String(value || "").trim().toLowerCase() === "admin";
}

function isAdminByProfile(profile, user) {
  const role = String(profile?.role || "").trim().toLowerCase();
  if (role === "admin") return true;

  const userRole = user?.role;
  const userRoles = user?.roles;
  const appMetaRole = user?.app_metadata?.role;
  const appMetaRoles = user?.app_metadata?.roles;
  const userMetaRole = user?.user_metadata?.role;
  const userMetaRoles = user?.user_metadata?.roles;

  if (
    hasAdminRole(userRole) ||
    hasAdminRole(userRoles) ||
    hasAdminRole(appMetaRole) ||
    hasAdminRole(appMetaRoles) ||
    hasAdminRole(userMetaRole) ||
    hasAdminRole(userMetaRoles)
  ) {
    return true;
  }

  const normalizedEmail = String(user?.email || "").trim().toLowerCase();
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
  if (!["fantasmas", "ferramentas", "evidencias", "diario", "investigadores"].includes(document.body.dataset.page || "")) return;
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
      supaState.isAdmin = isAdminByProfile(supaState.profile, supaState.user);
    }

    if (refs.ghostAdminPanel) refs.ghostAdminPanel.hidden = !supaState.isAdmin;
    if (refs.openDiaryAdminFromHeader) refs.openDiaryAdminFromHeader.hidden = !(supaState.isAdmin && document.body.dataset.page === "diario");
    if (document.body.dataset.page === "fantasmas") {
      await loadGhostFavorites();
    }
    if (document.body.dataset.page === "ferramentas") {
      await loadToolFavorites();
    }
    if (document.body.dataset.page === "evidencias") {
      await loadEvidenceFavorites();
    }
    if (document.body.dataset.page === "diario") {
      await loadDiaryFavorites();
    }
    if (refs.ghostGrid || refs.toolsGrid || refs.evidenceGrid || refs.diaryGrid || refs.investigatorGrid) applyFilters();
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

  const mapped = (rows || []).map((row) => ({
    id: row.id,
    name: row.name,
    about: row.about || "",
    howToUse: row.how_to_use || "",
    evidence: row.evidence || "",
  }));
  return mapped.length ? mapped : structuredClone(defaultToolData);
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

function evidenceFavoritesStorageKey() {
  return supaState.user?.id ? `ecosEvidenceFavorites:${supaState.user.id}` : "ecosEvidenceFavorites:guest";
}

function loadEvidenceFavoritesFromLocal() {
  const key = evidenceFavoritesStorageKey();
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

function saveEvidenceFavoritesToLocal() {
  const key = evidenceFavoritesStorageKey();
  localStorage.setItem(key, JSON.stringify([...evidenceState.favorites]));
}

function diaryFavoritesStorageKey() {
  return supaState.user?.id ? `ecosDiaryFavorites:${supaState.user.id}` : "ecosDiaryFavorites:guest";
}

function loadDiaryFavoritesFromLocal() {
  const key = diaryFavoritesStorageKey();
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

function saveDiaryFavoritesToLocal() {
  const key = diaryFavoritesStorageKey();
  localStorage.setItem(key, JSON.stringify([...diaryState.favorites]));
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

async function loadEvidenceFavorites() {
  const localFavorites = loadEvidenceFavoritesFromLocal();
  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;

  if (!sb || !userId) {
    evidenceState.favorites = localFavorites;
    return;
  }

  const { data: rows, error } = await sb
    .from("user_favorites")
    .select("item_key")
    .eq("user_id", userId)
    .eq("section", FAVORITES_SECTION_EVIDENCES);

  if (!error) {
    evidenceState.favorites = new Set(
      (rows || [])
        .map((row) => row.item_key)
        .filter((name) => typeof name === "string" && name.trim())
    );
    saveEvidenceFavoritesToLocal();
    return;
  }

  evidenceState.favorites = localFavorites;
}

async function loadDiaryFavorites() {
  const localFavorites = loadDiaryFavoritesFromLocal();
  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;

  if (!sb || !userId) {
    diaryState.favorites = localFavorites;
    return;
  }

  const { data: rows, error } = await sb
    .from("user_favorites")
    .select("item_key")
    .eq("user_id", userId)
    .eq("section", FAVORITES_SECTION_DIARY);

  if (!error) {
    diaryState.favorites = new Set(
      (rows || [])
        .map((row) => row.item_key)
        .filter((name) => typeof name === "string" && name.trim())
    );
    saveDiaryFavoritesToLocal();
    return;
  }

  diaryState.favorites = localFavorites;
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

async function toggleEvidenceFavorite(evidenceName) {
  const wasFavorite = evidenceState.favorites.has(evidenceName);
  if (wasFavorite) {
    evidenceState.favorites.delete(evidenceName);
  } else {
    evidenceState.favorites.add(evidenceName);
  }
  applyFilters();

  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;
  if (!sb || !userId) {
    saveEvidenceFavoritesToLocal();
    return;
  }

  if (wasFavorite) {
    const { error } = await sb
      .from("user_favorites")
      .delete()
      .eq("user_id", userId)
      .eq("section", FAVORITES_SECTION_EVIDENCES)
      .eq("item_key", evidenceName);
    if (error) {
      evidenceState.favorites.add(evidenceName);
      applyFilters();
      setEvidenceStatus(`Erro ao remover favorito: ${error.message}`, true);
      return;
    }
  } else {
    const { error } = await sb.from("user_favorites").insert({
      user_id: userId,
      section: FAVORITES_SECTION_EVIDENCES,
      item_key: evidenceName,
      item_label: evidenceName,
      metadata: {},
    });
    if (error && error.code !== "23505") {
      evidenceState.favorites.delete(evidenceName);
      applyFilters();
      setEvidenceStatus(`Erro ao salvar favorito: ${error.message}`, true);
      return;
    }
  }
  saveEvidenceFavoritesToLocal();
}

async function toggleDiaryFavorite(title) {
  const wasFavorite = diaryState.favorites.has(title);
  if (wasFavorite) {
    diaryState.favorites.delete(title);
  } else {
    diaryState.favorites.add(title);
  }
  applyFilters();

  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;
  if (!sb || !userId) {
    saveDiaryFavoritesToLocal();
    return;
  }

  if (wasFavorite) {
    const { error } = await sb
      .from("user_favorites")
      .delete()
      .eq("user_id", userId)
      .eq("section", FAVORITES_SECTION_DIARY)
      .eq("item_key", title);
    if (error) {
      diaryState.favorites.add(title);
      applyFilters();
      setDiaryStatus(`Erro ao remover salvo: ${error.message}`, true);
      return;
    }
  } else {
    const { error } = await sb.from("user_favorites").insert({
      user_id: userId,
      section: FAVORITES_SECTION_DIARY,
      item_key: title,
      item_label: title,
      metadata: {},
    });
    if (error && error.code !== "23505") {
      diaryState.favorites.delete(title);
      applyFilters();
      setDiaryStatus(`Erro ao salvar anotacao: ${error.message}`, true);
      return;
    }
  }
  saveDiaryFavoritesToLocal();
}

function setupDiaryCardActions() {
  refs.diaryGrid?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const title = decodeURIComponent(button.dataset.diaryTitle || "");
    const diaryId = button.dataset.diaryId || "";

    if (action === "view-diary-image") {
      const imageUrl = button.dataset.diaryImage || "";
      if (imageUrl) {
        window.open(imageUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (action === "view-diary-pdf") {
      const pdfUrl = button.dataset.diaryPdf || "";
      if (pdfUrl) {
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (action === "toggle-diary-expand") {
      const itemKey = getDiaryEntryKey(diaryId, title);
      if (diaryState.expandedEntries.has(itemKey)) {
        diaryState.expandedEntries.delete(itemKey);
      } else {
        diaryState.expandedEntries.add(itemKey);
      }
      applyFilters();
      return;
    }

    if (action === "favorite-diary") {
      if (!title) return;
      await toggleDiaryFavorite(title);
      return;
    }

    if (!supaState.isAdmin) return;
    const item = findDiaryByIdOrTitle(diaryId, title);
    if (!item) return;

    if (action === "edit-diary") {
      fillDiaryFormForEdit(item);
      setAdminPanelExpanded(true);
      const toggle = refs.adminMenuToggles.find((entry) => entry.dataset.adminMenuToggle === "diaryCreateSection");
      setAdminMenuSectionExpanded(toggle, true);
      refs.diaryTitleField?.focus();
      setDiaryStatus("Edicao carregada no formulario.");
      return;
    }

    if (action === "delete-diary") {
      if (!confirm(`Excluir anotacao "${item.title}"?`)) return;
      const sb = setupSupabaseClient();
      if (!sb) {
        setDiaryStatus("Supabase indisponivel.", true);
        return;
      }
      let query = sb.from("reader_diary_entries").delete();
      query = item.id ? query.eq("id", item.id) : query.eq("title", item.title);
      const { error } = await query;
      if (error) {
        setDiaryStatus(`Erro ao excluir anotacao: ${error.message}`, true);
        return;
      }
      await reloadDiaryAndView();
      setDiaryStatus("Anotacao removida.");
    }
  });
}

function setupEvidenceCardActions() {
  refs.evidenceGrid?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (!["confirm-evidence", "exclude-evidence", "favorite-evidence"].includes(action)) return;

    const evidenceName = decodeURIComponent(button.dataset.evidenceName || "");
    if (!evidenceName) return;

    if (action === "favorite-evidence") {
      await toggleEvidenceFavorite(evidenceName);
      return;
    }

    const currentMark = evidenceState.marks[evidenceName] || "";
    const nextMark =
      action === "confirm-evidence"
        ? (currentMark === "confirmed" ? "" : "confirmed")
        : (currentMark === "excluded" ? "" : "excluded");

    if (nextMark) {
      evidenceState.marks[evidenceName] = nextMark;
    } else {
      delete evidenceState.marks[evidenceName];
    }
    applyFilters();
  });
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

function setEvidenceStatus(message, isError = false) {
  if (!refs.evidenceAdminStatus) return;
  refs.evidenceAdminStatus.textContent = message;
  refs.evidenceAdminStatus.style.color = isError ? "#ffb3a4" : "";
}

function resetEvidenceFormState() {
  evidenceState.editingId = null;
  evidenceState.editingName = "";
  if (refs.evidenceFormTitle) refs.evidenceFormTitle.textContent = "Adicionar Evidencia";
  if (refs.cancelEvidenceEdit) refs.cancelEvidenceEdit.hidden = true;
}

function renderEvidenceAdminList() {
  if (!refs.adminEvidenceCardList) return;
  refs.adminEvidenceCardList.innerHTML = "";

  evidenceState.items.forEach((item) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${item.name} - ${item.equipment || "Sem equipamento"}`;

    const actions = document.createElement("div");
    actions.className = "ghost-admin-item-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "login-btn ghost-admin-mini-btn";
    editBtn.textContent = "Editar";
    editBtn.dataset.action = "edit-evidence-card";
    editBtn.dataset.evidenceId = item.id ?? "";
    editBtn.dataset.evidenceName = item.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "login-btn ghost-admin-mini-btn ghost-admin-danger-btn";
    deleteBtn.textContent = "Excluir";
    deleteBtn.dataset.action = "delete-evidence-card";
    deleteBtn.dataset.evidenceId = item.id ?? "";
    deleteBtn.dataset.evidenceName = item.name;

    actions.append(editBtn, deleteBtn);
    li.append(label, actions);
    refs.adminEvidenceCardList.append(li);
  });
}

function refreshEvidenceFiltersAndView() {
  data.evidencias = evidenceState.items.map((item) => item.name);
  createCheckList(refs.evidenceFilters, "evidence", data.evidencias);
  renderEvidenceAdminList();
  applyFilters();
}

async function reloadEvidencesAndView() {
  evidenceState.items = await loadEvidenceDataFromSupabase();
  refreshEvidenceFiltersAndView();
}

function findEvidenceByIdOrName(evidenceId, evidenceName) {
  if (evidenceId) {
    const byId = evidenceState.items.find((item) => String(item.id) === String(evidenceId));
    if (byId) return byId;
  }
  return evidenceState.items.find((item) => item.name === evidenceName) || null;
}

function fillEvidenceFormForEdit(item) {
  evidenceState.editingId = item.id ?? null;
  evidenceState.editingName = item.name;
  refs.evidenceNameField.value = item.name || "";
  refs.evidenceAboutField.value = item.about || "";
  refs.evidenceEquipmentField.value = item.equipment || "";
  refs.evidenceIdentifyField.value = item.howToIdentify || "";
  if (refs.evidenceFormTitle) refs.evidenceFormTitle.textContent = "Editar Evidencia";
  if (refs.cancelEvidenceEdit) refs.cancelEvidenceEdit.hidden = false;
}

function setupEvidenceAdmin() {
  if (document.body.dataset.page !== "evidencias") return;

  refs.cancelEvidenceEdit?.addEventListener("click", () => {
    refs.adminEvidenceCardForm?.reset();
    resetEvidenceFormState();
    setEvidenceStatus("");
  });

  refs.adminEvidenceCardForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supaState.isAdmin) {
      setEvidenceStatus("Somente admin pode cadastrar/editar evidencias.", true);
      return;
    }

    const name = refs.evidenceNameField?.value.trim();
    if (!name) return;
    const payload = {
      name,
      about: refs.evidenceAboutField?.value.trim() || "",
      equipment: refs.evidenceEquipmentField?.value.trim() || "",
      how_to_identify: refs.evidenceIdentifyField?.value.trim() || "",
    };

    const sb = setupSupabaseClient();
    if (!sb) {
      setEvidenceStatus("Supabase indisponivel.", true);
      return;
    }

    let query = sb.from("investigation_evidences");
    let result;
    if (evidenceState.editingId || evidenceState.editingName) {
      query = query.update(payload);
      query = evidenceState.editingId ? query.eq("id", evidenceState.editingId) : query.eq("name", evidenceState.editingName);
      result = await query;
    } else {
      result = await query.insert(payload);
    }

    if (result.error) {
      setEvidenceStatus(`Erro ao salvar evidencia: ${result.error.message}`, true);
      return;
    }

    refs.adminEvidenceCardForm.reset();
    resetEvidenceFormState();
    await reloadEvidencesAndView();
    setEvidenceStatus("Evidencia salva.");
  });

  refs.adminEvidenceCardList?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !supaState.isAdmin) return;
    const action = button.dataset.action;
    const evidenceId = button.dataset.evidenceId || "";
    const evidenceName = button.dataset.evidenceName || "";
    const item = findEvidenceByIdOrName(evidenceId, evidenceName);
    if (!item) return;

    if (action === "edit-evidence-card") {
      fillEvidenceFormForEdit(item);
      setEvidenceStatus("Edicao carregada no formulario.");
      return;
    }

    if (action === "delete-evidence-card") {
      if (!confirm(`Excluir evidencia "${item.name}"?`)) return;
      const sb = setupSupabaseClient();
      if (!sb) {
        setEvidenceStatus("Supabase indisponivel.", true);
        return;
      }
      let query = sb.from("investigation_evidences").delete();
      query = item.id ? query.eq("id", item.id) : query.eq("name", item.name);
      const { error } = await query;
      if (error) {
        setEvidenceStatus(`Erro ao excluir evidencia: ${error.message}`, true);
        return;
      }
      await reloadEvidencesAndView();
      setEvidenceStatus("Evidencia removida.");
    }
  });
}

function setDiaryStatus(message, isError = false) {
  if (!refs.diaryAdminStatus) return;
  refs.diaryAdminStatus.textContent = message;
  refs.diaryAdminStatus.style.color = isError ? "#ffb3a4" : "";
}

function renderDiaryTypeOptions() {
  if (!refs.diaryTypeField) return;

  const options = getUniqueDiaryTypes();
  const currentValue = refs.diaryTypeField.value;
  refs.diaryTypeField.innerHTML = options
    .map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`)
    .join("");

  if (currentValue && options.includes(currentValue)) {
    refs.diaryTypeField.value = currentValue;
  } else if (options.length) {
    refs.diaryTypeField.value = options[0];
  }
}

function renderDiaryFilterAdminLists() {
  if (refs.adminDiaryTypeList) {
    refs.adminDiaryTypeList.innerHTML = diaryState.filterConfig.types
      .map(
        (item) => `
          <li>
            <span>${escapeHtml(item)}</span>
            <div class="ghost-admin-item-actions">
              <button type="button" class="login-btn ghost-admin-mini-btn" data-action="edit-diary-filter" data-filter-kind="type" data-filter-value="${escapeHtml(item)}">Editar</button>
              <button type="button" class="login-btn ghost-admin-mini-btn ghost-admin-danger-btn" data-action="delete-diary-filter" data-filter-kind="type" data-filter-value="${escapeHtml(item)}">Excluir</button>
            </div>
          </li>
        `
      )
      .join("");
  }

  if (refs.adminDiaryMediaList) {
    refs.adminDiaryMediaList.innerHTML = diaryState.filterConfig.media
      .map(
        (item) => `
          <li>
            <span>${escapeHtml(item)}</span>
            <div class="ghost-admin-item-actions">
              <button type="button" class="login-btn ghost-admin-mini-btn" data-action="edit-diary-filter" data-filter-kind="media" data-filter-value="${escapeHtml(item)}">Editar</button>
              <button type="button" class="login-btn ghost-admin-mini-btn ghost-admin-danger-btn" data-action="delete-diary-filter" data-filter-kind="media" data-filter-value="${escapeHtml(item)}">Excluir</button>
            </div>
          </li>
        `
      )
      .join("");
  }
}

function resetDiaryFormState() {
  diaryState.editingId = null;
  diaryState.editingTitle = "";
  if (refs.diaryFormTitle) refs.diaryFormTitle.textContent = "Adicionar Anotacao";
  if (refs.cancelDiaryEdit) refs.cancelDiaryEdit.hidden = true;
  if (refs.diaryImageFileField) refs.diaryImageFileField.value = "";
  if (refs.diaryPdfFileField) refs.diaryPdfFileField.value = "";
}

function renderDiaryAdminList() {
  if (!refs.adminDiaryList) return;
  refs.adminDiaryList.innerHTML = "";

  diaryState.items.forEach((item) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${item.title} - ${item.type || "Sem tipo"}`;

    const actions = document.createElement("div");
    actions.className = "ghost-admin-item-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "login-btn ghost-admin-mini-btn";
    editBtn.textContent = "Editar";
    editBtn.dataset.action = "edit-diary";
    editBtn.dataset.diaryId = item.id ?? "";
    editBtn.dataset.diaryTitle = item.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "login-btn ghost-admin-mini-btn ghost-admin-danger-btn";
    deleteBtn.textContent = "Excluir";
    deleteBtn.dataset.action = "delete-diary";
    deleteBtn.dataset.diaryId = item.id ?? "";
    deleteBtn.dataset.diaryTitle = item.title;

    actions.append(editBtn, deleteBtn);
    li.append(label, actions);
    refs.adminDiaryList.append(li);
  });
}

function refreshDiaryFiltersAndView() {
  createCheckList(refs.diaryTypeFilters, "diary-type", getUniqueDiaryTypes());
  createCheckList(refs.diaryMediaFilters, "diary-media", getUniqueDiaryMedia());
  renderDiaryTypeOptions();
  renderDiaryFilterAdminLists();
  renderDiaryAdminList();
  applyFilters();
}

async function reloadDiaryAndView() {
  diaryState.items = await loadDiaryDataFromSupabase();
  refreshDiaryFiltersAndView();
}

async function persistDiaryFilterConfig() {
  const sb = setupSupabaseClient();
  if (!sb) {
    setDiaryStatus("Supabase indisponivel.", true);
    return false;
  }

  const { error } = await sb.from("site_pages").upsert(
    {
      slug: DIARY_FILTERS_PAGE_SLUG,
      content: {
        types: sanitizeDiaryFilterValues(diaryState.filterConfig.types, []),
        media: sanitizeDiaryFilterValues(diaryState.filterConfig.media, []),
      },
    },
    { onConflict: "slug" }
  );

  if (error) {
    setDiaryStatus(`Erro ao salvar filtros: ${error.message}`, true);
    return false;
  }

  diaryState.filterConfig.types = sanitizeDiaryFilterValues(diaryState.filterConfig.types, []);
  diaryState.filterConfig.media = sanitizeDiaryFilterValues(diaryState.filterConfig.media, []);
  refreshDiaryFiltersAndView();
  return true;
}

async function addDiaryFilter(kind) {
  if (!supaState.isAdmin) {
    setDiaryStatus("Somente admin pode gerenciar filtros.", true);
    return;
  }

  const input = kind === "type" ? refs.diaryFilterTypeInput : refs.diaryFilterMediaInput;
  const nextValue = String(input?.value || "").trim();
  if (!nextValue) {
    setDiaryStatus("Informe um valor para o filtro.", true);
    return;
  }

  const key = kind === "type" ? "types" : "media";
  if (diaryState.filterConfig[key].some((item) => normalizeText(item) === normalizeText(nextValue))) {
    setDiaryStatus("Esse filtro ja existe.", true);
    return;
  }

  diaryState.filterConfig[key] = [...diaryState.filterConfig[key], nextValue];
  const success = await persistDiaryFilterConfig();
  if (!success) return;
  if (input) input.value = "";
  setDiaryStatus("Filtro adicionado.");
}

async function handleDiaryFilterListClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button || !supaState.isAdmin) return;

  const action = button.dataset.action;
  const kind = button.dataset.filterKind;
  const currentValue = button.dataset.filterValue || "";
  const key = kind === "media" ? "media" : "types";
  const currentIndex = diaryState.filterConfig[key].findIndex(
    (item) => normalizeText(item) === normalizeText(currentValue)
  );
  if (currentIndex < 0) return;

  if (action === "delete-diary-filter") {
    diaryState.filterConfig[key] = diaryState.filterConfig[key].filter(
      (item) => normalizeText(item) !== normalizeText(currentValue)
    );
    const success = await persistDiaryFilterConfig();
    if (success) setDiaryStatus("Filtro removido.");
    return;
  }

  if (action === "edit-diary-filter") {
    const nextValue = window.prompt("Novo nome do filtro:", currentValue);
    if (nextValue === null) return;

    const trimmed = nextValue.trim();
    if (!trimmed) {
      setDiaryStatus("O filtro nao pode ficar vazio.", true);
      return;
    }

    const duplicated = diaryState.filterConfig[key].some(
      (item, index) => index !== currentIndex && normalizeText(item) === normalizeText(trimmed)
    );
    if (duplicated) {
      setDiaryStatus("Ja existe um filtro com esse nome.", true);
      return;
    }

    diaryState.filterConfig[key][currentIndex] = trimmed;
    const success = await persistDiaryFilterConfig();
    if (success) setDiaryStatus("Filtro atualizado.");
  }
}

function findDiaryByIdOrTitle(diaryId, title) {
  if (diaryId) {
    const byId = diaryState.items.find((item) => String(item.id) === String(diaryId));
    if (byId) return byId;
  }
  return diaryState.items.find((item) => item.title === title) || null;
}

function fillDiaryFormForEdit(item) {
  diaryState.editingId = item.id ?? null;
  diaryState.editingTitle = item.title;
  refs.diaryTitleField.value = item.title || "";
  refs.diaryTypeField.value = item.type || "Registros";
  refs.diaryMediaField.value = (item.mediaTags || []).join(", ");
  refs.diaryContentField.value = item.content || "";
  if (refs.diaryImageFileField) refs.diaryImageFileField.value = "";
  if (refs.diaryPdfFileField) refs.diaryPdfFileField.value = "";
  if (refs.diaryFormTitle) refs.diaryFormTitle.textContent = "Editar Anotacao";
  if (refs.cancelDiaryEdit) refs.cancelDiaryEdit.hidden = false;
}

async function uploadDiaryImage(file) {
  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;
  if (!sb || !userId || !file) return null;

  const safeName = buildStorageSafeName(file.name);
  const path = `${userId}/${Date.now()}-${safeName}`;
  const upload = await sb.storage.from(DIARY_IMAGES_BUCKET).upload(path, file, { upsert: false });
  if (upload.error) {
    setDiaryStatus(`Erro ao enviar imagem: ${upload.error.message}`, true);
    return null;
  }

  const { data } = sb.storage.from(DIARY_IMAGES_BUCKET).getPublicUrl(path);
  return {
    path,
    publicUrl: data?.publicUrl || "",
  };
}

async function removeDiaryImage(path) {
  if (!path) return;
  const sb = setupSupabaseClient();
  if (!sb) return;
  await sb.storage.from(DIARY_IMAGES_BUCKET).remove([path]);
}

async function uploadDiaryPdf(file) {
  const sb = setupSupabaseClient();
  const userId = supaState.user?.id;
  if (!sb || !userId || !file) return null;

  const safeName = buildStorageSafeName(file.name);
  const path = `${userId}/${Date.now()}-${safeName}`;
  const upload = await sb.storage.from(DIARY_FILES_BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type || "application/pdf",
  });
  if (upload.error) {
    setDiaryStatus(`Erro ao enviar PDF: ${upload.error.message}`, true);
    return null;
  }

  const { data } = sb.storage.from(DIARY_FILES_BUCKET).getPublicUrl(path);
  return {
    path,
    publicUrl: data?.publicUrl || "",
    fileName: file.name || safeName,
  };
}

async function removeDiaryPdf(path) {
  if (!path) return;
  const sb = setupSupabaseClient();
  if (!sb) return;
  await sb.storage.from(DIARY_FILES_BUCKET).remove([path]);
}

function setupDiaryAdmin() {
  if (document.body.dataset.page !== "diario") return;

  refs.openDiaryAdminFromHeader?.addEventListener("click", () => {
    if (!supaState.isAdmin) return;
    setAdminPanelExpanded(true);
    const toggle = refs.adminMenuToggles.find((entry) => entry.dataset.adminMenuToggle === "diaryCreateSection");
    setAdminMenuSectionExpanded(toggle, true);
    refs.diaryTitleField?.focus();
  });

  refs.cancelDiaryEdit?.addEventListener("click", () => {
    refs.adminDiaryForm?.reset();
    resetDiaryFormState();
    setDiaryStatus("");
  });

  refs.diaryFilterTypeAddBtn?.addEventListener("click", () => addDiaryFilter("type"));
  refs.diaryFilterMediaAddBtn?.addEventListener("click", () => addDiaryFilter("media"));
  refs.diaryFilterTypeInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addDiaryFilter("type");
  });
  refs.diaryFilterMediaInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addDiaryFilter("media");
  });
  refs.adminDiaryTypeList?.addEventListener("click", handleDiaryFilterListClick);
  refs.adminDiaryMediaList?.addEventListener("click", handleDiaryFilterListClick);

  refs.adminDiaryForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supaState.isAdmin) {
      setDiaryStatus("Somente admin pode cadastrar/editar anotacoes.", true);
      return;
    }

    const title = refs.diaryTitleField?.value.trim();
    if (!title) return;
    const editingItem = diaryState.editingId || diaryState.editingTitle
      ? findDiaryByIdOrTitle(diaryState.editingId, diaryState.editingTitle)
      : null;
    const payload = {
      title,
      entry_type: refs.diaryTypeField?.value.trim() || "Registros",
      media_tags: (refs.diaryMediaField?.value || "")
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean),
      content: refs.diaryContentField?.value.trim() || "",
      image_url: editingItem?.imageUrl || null,
      image_path: editingItem?.imagePath || null,
      pdf_url: editingItem?.pdfUrl || null,
      pdf_path: editingItem?.pdfPath || null,
      pdf_name: editingItem?.pdfName || null,
    };

    const sb = setupSupabaseClient();
    if (!sb) {
      setDiaryStatus("Supabase indisponivel.", true);
      return;
    }

    const imageFile = refs.diaryImageFileField?.files?.[0];
    const pdfFile = refs.diaryPdfFileField?.files?.[0];
    if (imageFile) {
      const uploadedImage = await uploadDiaryImage(imageFile);
      if (!uploadedImage) return;
      payload.image_url = uploadedImage.publicUrl || null;
      payload.image_path = uploadedImage.path || null;
    }

    if (pdfFile) {
      const uploadedPdf = await uploadDiaryPdf(pdfFile);
      if (!uploadedPdf) {
        if (imageFile && payload.image_path && payload.image_path !== editingItem?.imagePath) {
          await removeDiaryImage(payload.image_path);
        }
        return;
      }
      payload.pdf_url = uploadedPdf.publicUrl || null;
      payload.pdf_path = uploadedPdf.path || null;
      payload.pdf_name = uploadedPdf.fileName || null;
    }

    let query = sb.from("reader_diary_entries");
    let result;
    if (diaryState.editingId || diaryState.editingTitle) {
      query = query.update(payload);
      query = diaryState.editingId ? query.eq("id", diaryState.editingId) : query.eq("title", diaryState.editingTitle);
      result = await query;
    } else {
      result = await query.insert(payload);
    }

    if (result.error) {
      if (imageFile && payload.image_path && payload.image_path !== editingItem?.imagePath) {
        await removeDiaryImage(payload.image_path);
      }
      if (pdfFile && payload.pdf_path && payload.pdf_path !== editingItem?.pdfPath) {
        await removeDiaryPdf(payload.pdf_path);
      }
      setDiaryStatus(`Erro ao salvar anotacao: ${result.error.message}`, true);
      return;
    }

    if (imageFile && editingItem?.imagePath && editingItem.imagePath !== payload.image_path) {
      await removeDiaryImage(editingItem.imagePath);
    }
    if (pdfFile && editingItem?.pdfPath && editingItem.pdfPath !== payload.pdf_path) {
      await removeDiaryPdf(editingItem.pdfPath);
    }

    refs.adminDiaryForm.reset();
    resetDiaryFormState();
    await reloadDiaryAndView();
    setDiaryStatus("Anotacao salva.");
  });

  refs.adminDiaryList?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !supaState.isAdmin) return;
    const action = button.dataset.action;
    const diaryId = button.dataset.diaryId || "";
    const diaryTitle = button.dataset.diaryTitle || "";
    const item = findDiaryByIdOrTitle(diaryId, diaryTitle);
    if (!item) return;

    if (action === "edit-diary") {
      fillDiaryFormForEdit(item);
      setDiaryStatus("Edicao carregada no formulario.");
      return;
    }

    if (action === "delete-diary") {
      if (!confirm(`Excluir anotacao "${item.title}"?`)) return;
      const sb = setupSupabaseClient();
      if (!sb) {
        setDiaryStatus("Supabase indisponivel.", true);
        return;
      }
      let query = sb.from("reader_diary_entries").delete();
      query = item.id ? query.eq("id", item.id) : query.eq("title", item.title);
      const { error } = await query;
      if (error) {
        setDiaryStatus(`Erro ao excluir anotacao: ${error.message}`, true);
        return;
      }
      await removeDiaryImage(item.imagePath || "");
      await removeDiaryPdf(item.pdfPath || "");
      await reloadDiaryAndView();
      setDiaryStatus("Anotacao removida.");
    }
  });
}

function setInvestigatorStatus(message, isError = false) {
  if (!refs.investigatorAdminStatus) return;
  refs.investigatorAdminStatus.textContent = message;
  refs.investigatorAdminStatus.style.color = isError ? "#ffb3a4" : "";
}

function resetInvestigatorFormState() {
  investigatorState.editingId = null;
  investigatorState.editingName = "";
  if (refs.investigatorFormTitle) refs.investigatorFormTitle.textContent = "Adicionar Investigador";
  if (refs.cancelInvestigatorEdit) refs.cancelInvestigatorEdit.hidden = true;
}

function renderInvestigatorAdminList() {
  if (!refs.adminInvestigatorList) return;
  refs.adminInvestigatorList.innerHTML = "";

  data.investigadores.forEach((item) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${item.nome} - ${item.nivel || "Nivel I"}`;

    const actions = document.createElement("div");
    actions.className = "ghost-admin-item-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "login-btn ghost-admin-mini-btn";
    editBtn.textContent = "Editar";
    editBtn.dataset.action = "edit-investigator";
    editBtn.dataset.investigatorId = item.id ?? "";
    editBtn.dataset.investigatorName = item.nome;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "login-btn ghost-admin-mini-btn ghost-admin-danger-btn";
    deleteBtn.textContent = "Excluir";
    deleteBtn.dataset.action = "delete-investigator";
    deleteBtn.dataset.investigatorId = item.id ?? "";
    deleteBtn.dataset.investigatorName = item.nome;

    actions.append(editBtn, deleteBtn);
    li.append(label, actions);
    refs.adminInvestigatorList.append(li);
  });
}

function parseFunctionNames(rawText) {
  return [...new Set(
    String(rawText || "")
      .replace(/\r?\n/g, ",")
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
  )];
}

function findInvestigatorByIdOrName(investigatorId, investigatorName) {
  if (investigatorId) {
    const byId = data.investigadores.find((item) => String(item.id) === String(investigatorId));
    if (byId) return byId;
  }
  return data.investigadores.find((item) => item.nome === investigatorName) || null;
}

function fillInvestigatorFormForEdit(item) {
  investigatorState.editingId = item.id ?? null;
  investigatorState.editingName = item.nome;
  refs.investigatorNameField.value = item.nome || "";
  refs.investigatorLevelField.value = item.nivel || "Nivel I";
  refs.investigatorDescriptionField.value = item.descricao || "";
  refs.investigatorFunctionsField.value = (item.funcoes || []).join(", ");
  if (refs.investigatorFormTitle) refs.investigatorFormTitle.textContent = "Editar Investigador";
  if (refs.cancelInvestigatorEdit) refs.cancelInvestigatorEdit.hidden = false;
}

async function ensureFunctionIds(sb, functionNames) {
  if (!functionNames.length) return [];

  for (const functionName of functionNames) {
    const { error } = await sb
      .from("investigation_functions")
      .upsert({ name: functionName }, { onConflict: "name" });
    if (error) return { ids: [], error };
  }

  const { data: rows, error } = await sb
    .from("investigation_functions")
    .select("id, name")
    .in("name", functionNames);
  if (error) return { ids: [], error };

  return {
    ids: (rows || []).map((row) => row.id).filter(Boolean),
    error: null,
  };
}

async function reloadInvestigatorsAndView() {
  const loaded = await loadInvestigatorsFromSupabase();
  data.investigadores = loaded.investigators;
  data.funcoes = loaded.functions;
  createCheckList(refs.investigatorFilters, "investigator", data.investigadores.map((item) => item.nome));
  createCheckList(refs.functionFilters, "function", data.funcoes);
  renderInvestigatorAdminList();
  applyFilters();
}

function setupInvestigatorsAdmin() {
  if (document.body.dataset.page !== "investigadores") return;

  refs.cancelInvestigatorEdit?.addEventListener("click", () => {
    refs.adminInvestigatorForm?.reset();
    resetInvestigatorFormState();
    setInvestigatorStatus("");
  });

  refs.adminInvestigatorForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supaState.isAdmin) {
      setInvestigatorStatus("Somente admin pode cadastrar/editar investigadores.", true);
      return;
    }

    const name = refs.investigatorNameField?.value.trim();
    const level = refs.investigatorLevelField?.value.trim() || "Nivel I";
    const description = refs.investigatorDescriptionField?.value.trim() || "";
    const functionNames = parseFunctionNames(refs.investigatorFunctionsField?.value || "");

    if (!name) return;

    const sb = setupSupabaseClient();
    if (!sb) {
      setInvestigatorStatus("Supabase indisponivel.", true);
      return;
    }

    const payload = { name, level, description };
    let investigatorId = investigatorState.editingId;

    if (investigatorState.editingId || investigatorState.editingName) {
      let query = sb.from("investigation_investigators").update(payload);
      query = investigatorState.editingId
        ? query.eq("id", investigatorState.editingId)
        : query.eq("name", investigatorState.editingName);
      const { error } = await query;
      if (error) {
        setInvestigatorStatus(`Erro ao salvar investigador: ${error.message}`, true);
        return;
      }

      if (!investigatorId) {
        const { data: row } = await sb
          .from("investigation_investigators")
          .select("id")
          .eq("name", name)
          .maybeSingle();
        investigatorId = row?.id || null;
      }
    } else {
      const { data: row, error } = await sb
        .from("investigation_investigators")
        .insert(payload)
        .select("id")
        .single();
      if (error) {
        setInvestigatorStatus(`Erro ao salvar investigador: ${error.message}`, true);
        return;
      }
      investigatorId = row.id;
    }

    if (!investigatorId) {
      setInvestigatorStatus("Nao foi possivel identificar o investigador salvo.", true);
      return;
    }

    const ensured = await ensureFunctionIds(sb, functionNames);
    if (ensured.error) {
      setInvestigatorStatus(`Erro ao salvar funcoes: ${ensured.error.message}`, true);
      return;
    }

    const { error: clearError } = await sb
      .from("investigator_functions")
      .delete()
      .eq("investigator_id", investigatorId);
    if (clearError) {
      setInvestigatorStatus(`Erro ao atualizar funcoes: ${clearError.message}`, true);
      return;
    }

    if (ensured.ids.length) {
      const links = ensured.ids.map((functionId) => ({
        investigator_id: investigatorId,
        function_id: functionId,
      }));
      const { error: linkError } = await sb.from("investigator_functions").insert(links);
      if (linkError) {
        setInvestigatorStatus(`Erro ao vincular funcoes: ${linkError.message}`, true);
        return;
      }
    }

    refs.adminInvestigatorForm.reset();
    resetInvestigatorFormState();
    await reloadInvestigatorsAndView();
    setInvestigatorStatus("Investigador salvo.");
  });

  refs.adminInvestigatorList?.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !supaState.isAdmin) return;
    const action = button.dataset.action;
    const investigatorId = button.dataset.investigatorId || "";
    const investigatorName = button.dataset.investigatorName || "";
    const item = findInvestigatorByIdOrName(investigatorId, investigatorName);
    if (!item) return;

    if (action === "edit-investigator") {
      fillInvestigatorFormForEdit(item);
      setInvestigatorStatus("Edicao carregada no formulario.");
      return;
    }

    if (action === "delete-investigator") {
      if (!confirm(`Excluir investigador "${item.nome}"?`)) return;
      const sb = setupSupabaseClient();
      if (!sb) {
        setInvestigatorStatus("Supabase indisponivel.", true);
        return;
      }
      let query = sb.from("investigation_investigators").delete();
      query = item.id ? query.eq("id", item.id) : query.eq("name", item.nome);
      const { error } = await query;
      if (error) {
        setInvestigatorStatus(`Erro ao excluir investigador: ${error.message}`, true);
        return;
      }
      await reloadInvestigatorsAndView();
      setInvestigatorStatus("Investigador removido.");
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
  createCheckList(refs.diaryTypeFilters, "diary-type", getUniqueDiaryTypes());
  createCheckList(refs.diaryMediaFilters, "diary-media", getUniqueDiaryMedia());
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
  if (!["fantasmas", "ferramentas", "evidencias", "diario", "investigadores"].includes(document.body.dataset.page || "")) return;
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
  } else if (page === "evidencias") {
    evidenceState.items = await loadEvidenceDataFromSupabase();
    data.evidencias = evidenceState.items.map((item) => item.name);
    await loadEvidenceFavorites();
  } else if (page === "diario") {
    diaryState.filterConfig = await loadDiaryFilterConfigFromSupabase();
    diaryState.items = await loadDiaryDataFromSupabase();
    await loadDiaryFavorites();
  } else if (page === "investigadores") {
    const loaded = await loadInvestigatorsFromSupabase();
    data.investigadores = loaded.investigators;
    data.funcoes = loaded.functions;
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
  createCheckList(refs.diaryTypeFilters, "diary-type", getUniqueDiaryTypes());
  createCheckList(refs.diaryMediaFilters, "diary-media", getUniqueDiaryMedia());
  populateGhostEvidenceSelects();
  populateGhostEditEvidenceSelects();
  renderAdminLists();
  renderToolAdminList();
  renderEvidenceAdminList();
  renderDiaryAdminList();
  renderInvestigatorAdminList();
  setupGhostAdmin();
  setupToolAdmin();
  setupEvidenceAdmin();
  setupDiaryAdmin();
  setupInvestigatorsAdmin();
  setupGhostEditModalEvents();
  setupGhostCardMarks();
  setupToolCardActions();
  setupEvidenceCardActions();
  setupDiaryCardActions();

  bindEvents();
  applyFilters();
}

init();
