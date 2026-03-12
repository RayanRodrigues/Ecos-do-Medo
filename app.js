const SUPABASE_URL = "https://bwkzbcfrgmckiruawlqt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a3piY2ZyZ21ja2lydWF3bHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzEzNzIsImV4cCI6MjA4ODUwNzM3Mn0.QlIZV9C5gezRKX2YmtHtZUzZHgVRUi5uOLl1Rmh2LSM";
const ADMIN_EMAIL_ALLOWLIST = ["rayandepaulagpt@gmail.com"];
const CATEGORY_STORAGE_KEY = "ecos-library-categories";
const CATEGORY_PAGE_SLUG = "library-categories";
const DEFAULT_LIBRARY_CATEGORIES = ["Livros", "Pergaminhos", "Cartas", "Guias", "Atlas", "Mapas"];

const state = {
  allItems: [],
  filteredItems: [],
  visibleCount: 9,
  filters: {
    query: "",
    type: "",
  },
  viewMode: "all",
  sb: null,
  user: null,
  profile: null,
  favorites: new Set(),
  adminBooks: [],
  expandedCards: new Set(),
  categories: DEFAULT_LIBRARY_CATEGORIES.slice(),
};

const refs = {
  searchInput: document.getElementById("searchInput"),
  typeFilter: document.getElementById("typeFilter"),
  cardsGrid: document.getElementById("cardsGrid"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
  resultCount: document.getElementById("resultCount"),
  newPostBtn: document.getElementById("newPostBtn"),
  viewAllBtn: document.getElementById("viewAllBtn"),
  viewFavoritesBtn: document.getElementById("viewFavoritesBtn"),
  cardTemplate: document.getElementById("cardTemplate"),
  title: document.getElementById("siteTitle"),
  categoryToggle: document.getElementById("categoryToggle"),
  categoryBox: document.getElementById("categoryBox"),
  categoryList: document.getElementById("categoryList"),
  filterQuickToggle: document.getElementById("filterQuickToggle"),
  quickFiltersPanel: document.getElementById("quickFiltersPanel"),
  themeToggle: document.getElementById("themeToggle"),
  siteMenuToggle: document.getElementById("siteMenuToggle"),
  siteMenuClose: document.getElementById("siteMenuClose"),
  siteMenuPanel: document.getElementById("siteMenuPanel"),
  siteMenuOverlay: document.getElementById("siteMenuOverlay"),
  authBtn: document.getElementById("authBtn"),
  adminBtn: document.getElementById("adminBtn"),
  authDialog: document.getElementById("authDialog"),
  authEmail: document.getElementById("authEmail"),
  authPassword: document.getElementById("authPassword"),
  authSignInBtn: document.getElementById("authSignInBtn"),
  authSignUpBtn: document.getElementById("authSignUpBtn"),
  authGoogleBtn: document.getElementById("authGoogleBtn"),
  authDiscordBtn: document.getElementById("authDiscordBtn"),
  authCloseBtn: document.getElementById("authCloseBtn"),
  authStatus: document.getElementById("authStatus"),
  adminDialog: document.getElementById("adminDialog"),
  adminTabCreate: document.getElementById("adminTabCreate"),
  adminTabEdit: document.getElementById("adminTabEdit"),
  adminTabDelete: document.getElementById("adminTabDelete"),
  adminPanelCreate: document.getElementById("adminPanelCreate"),
  adminPanelEdit: document.getElementById("adminPanelEdit"),
  adminPanelDelete: document.getElementById("adminPanelDelete"),
  adminCreateForm: document.getElementById("adminCreateForm"),
  createTitle: document.getElementById("createTitle"),
  createAuthor: document.getElementById("createAuthor"),
  createCategory: document.getElementById("createCategory"),
  createDescription: document.getElementById("createDescription"),
  createCoverUrl: document.getElementById("createCoverUrl"),
  createCoverFile: document.getElementById("createCoverFile"),
  createFile: document.getElementById("createFile"),
  adminCreateResetBtn: document.getElementById("adminCreateResetBtn"),
  editBookSelect: document.getElementById("editBookSelect"),
  adminEditForm: document.getElementById("adminEditForm"),
  editBookId: document.getElementById("editBookId"),
  editTitle: document.getElementById("editTitle"),
  editAuthor: document.getElementById("editAuthor"),
  editCategory: document.getElementById("editCategory"),
  editDescription: document.getElementById("editDescription"),
  editCoverUrl: document.getElementById("editCoverUrl"),
  editCoverFile: document.getElementById("editCoverFile"),
  editFile: document.getElementById("editFile"),
  adminEditResetBtn: document.getElementById("adminEditResetBtn"),
  adminCloseBtn: document.getElementById("adminCloseBtn"),
  adminStatus: document.getElementById("adminStatus"),
  adminDeleteList: document.getElementById("adminDeleteList"),
  adminCategoryInput: document.getElementById("adminCategoryInput"),
  adminCategoryAddBtn: document.getElementById("adminCategoryAddBtn"),
  adminCategoryList: document.getElementById("adminCategoryList"),
};

async function init() {
  setupThemeToggle();
  setupSupabase();
  bindEvents();
  bindSiteMenuEvents();
  setupQuickFilters();
  await refreshAuthState();
  await loadItems();
  await loadCategories();
  applyFilters();
  setGlitchPulse();
}

function setupSupabase() {
  if (!window.supabase) return;
  state.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function bindEvents() {
  refs.searchInput?.addEventListener("input", (event) => {
    state.filters.query = event.target.value.trim().toLowerCase();
    resetAndFilter();
  });

  refs.typeFilter?.addEventListener("change", (event) => {
    state.filters.type = event.target.value;
    renderCategoryMenu();
    resetAndFilter();
  });

  refs.loadMoreBtn?.addEventListener("click", () => {
    state.visibleCount += 9;
    render();
  });
  refs.viewAllBtn?.addEventListener("click", () => setViewMode("all"));
  refs.viewFavoritesBtn?.addEventListener("click", () => setViewMode("favorites"));

  refs.cardsGrid?.addEventListener("click", handleCardClick);
  refs.authBtn?.addEventListener("click", handleAuthButtonClick);
  refs.authSignInBtn?.addEventListener("click", signIn);
  refs.authSignUpBtn?.addEventListener("click", signUp);
  refs.authGoogleBtn?.addEventListener("click", () => signInWithOAuth("google"));
  refs.authDiscordBtn?.addEventListener("click", () => signInWithOAuth("discord"));
  refs.authCloseBtn?.addEventListener("click", () => refs.authDialog?.close());
  refs.adminBtn?.addEventListener("click", openAdminPanel);
  refs.newPostBtn?.addEventListener("click", openAdminPanel);
  refs.adminCloseBtn?.addEventListener("click", () => refs.adminDialog?.close());
  refs.adminTabCreate?.addEventListener("click", () => switchAdminTab("create"));
  refs.adminTabEdit?.addEventListener("click", () => switchAdminTab("edit"));
  refs.adminTabDelete?.addEventListener("click", () => switchAdminTab("delete"));
  refs.adminCreateForm?.addEventListener("submit", saveNewBook);
  refs.adminEditForm?.addEventListener("submit", saveEditedBook);
  refs.adminCreateResetBtn?.addEventListener("click", resetCreateForm);
  refs.adminEditResetBtn?.addEventListener("click", resetEditForm);
  refs.editBookSelect?.addEventListener("change", handleEditBookSelect);
  refs.adminDeleteList?.addEventListener("click", handleDeleteListClick);
  refs.categoryList?.addEventListener("click", handleCategoryListClick);
  refs.adminCategoryAddBtn?.addEventListener("click", handleAddCategory);
  refs.adminCategoryList?.addEventListener("click", handleAdminCategoryListClick);
  refs.adminCategoryInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    handleAddCategory();
  });
}

function setupQuickFilters() {
  if (refs.categoryToggle && refs.categoryBox) {
    refs.categoryToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isExpanded = refs.categoryToggle.getAttribute("aria-expanded") === "true";
      const next = !isExpanded;
      refs.categoryToggle.setAttribute("aria-expanded", String(next));
      refs.categoryBox.hidden = !next;
    });
  }

  if (!refs.filterQuickToggle || !refs.quickFiltersPanel) return;

  const openQuickFilters = () => {
    refs.filterQuickToggle.setAttribute("aria-expanded", "true");
    refs.quickFiltersPanel.hidden = false;
    refs.quickFiltersPanel.setAttribute("aria-hidden", "false");
    refs.quickFiltersPanel.classList.add("is-open");
  };

  const closeQuickFilters = () => {
    refs.filterQuickToggle.setAttribute("aria-expanded", "false");
    refs.quickFiltersPanel.classList.remove("is-open");
    refs.quickFiltersPanel.setAttribute("aria-hidden", "true");
    refs.quickFiltersPanel.hidden = true;
    if (refs.categoryToggle && refs.categoryBox) {
      refs.categoryToggle.setAttribute("aria-expanded", "false");
      refs.categoryBox.hidden = true;
    }
  };

  closeQuickFilters();

  refs.filterQuickToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isExpanded = refs.filterQuickToggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeQuickFilters();
      return;
    }
    openQuickFilters();
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (refs.quickFiltersPanel.contains(target) || refs.filterQuickToggle.contains(target)) return;
    closeQuickFilters();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeQuickFilters();
  });
}

async function refreshAuthState() {
  if (!state.sb) return;

  const { data } = await state.sb.auth.getSession();
  await applySession(data.session);

  state.sb.auth.onAuthStateChange(async (_event, session) => {
    await applySession(session);
  });
}

async function applySession(session) {
  state.user = session?.user || null;
  state.profile = null;
  state.favorites.clear();

  if (state.user && state.sb) {
    const { data } = await state.sb
      .from("profiles")
      .select("id, email, role")
      .eq("id", state.user.id)
      .maybeSingle();

    if (data) {
      state.profile = data;
    } else if (state.user.email) {
      const fallback = await state.sb
        .from("profiles")
        .select("id, email, role")
        .ilike("email", state.user.email)
        .maybeSingle();
      state.profile = fallback.data || null;
    }

    await loadFavorites();
  }

  updateAuthUI();
  render();
}

function updateAuthUI() {
  if (refs.authBtn) {
    refs.authBtn.textContent = state.user ? "Sair" : "Entrar";
  }

  if (refs.adminBtn) {
    refs.adminBtn.hidden = !isAdminUser();
  }

  if (refs.newPostBtn) {
    refs.newPostBtn.hidden = !isAdminUser();
  }
}

async function handleAuthButtonClick() {
  if (!state.sb) {
    setAuthStatus("Supabase nao inicializado.");
    return;
  }

  if (state.user) {
    await state.sb.auth.signOut();
    return;
  }

  refs.authDialog?.showModal();
}

async function signIn() {
  if (!state.sb || !refs.authEmail || !refs.authPassword) return;
  setAuthStatus("Entrando...");
  const email = refs.authEmail.value.trim();
  const password = refs.authPassword.value;

  const { error } = await state.sb.auth.signInWithPassword({ email, password });
  if (error) {
    setAuthStatus(error.message);
    return;
  }

  setAuthStatus("Login realizado.");
  refs.authDialog?.close();
}

async function signUp() {
  if (!state.sb || !refs.authEmail || !refs.authPassword) return;
  setAuthStatus("Criando conta...");
  const email = refs.authEmail.value.trim();
  const password = refs.authPassword.value;

  const { error } = await state.sb.auth.signUp({ email, password });
  if (error) {
    setAuthStatus(error.message);
    return;
  }

  setAuthStatus("Conta criada. Verifique seu email para confirmar.");
}

async function signInWithOAuth(provider) {
  if (!state.sb) return;
  setAuthStatus(`Redirecionando para ${provider}...`);

  const { error } = await state.sb.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    setAuthStatus(error.message);
  }
}

function setAuthStatus(text) {
  if (refs.authStatus) refs.authStatus.textContent = text;
}

async function loadItems() {
  let items = [];

  if (state.sb) {
    items = await loadSupabaseItems();
  }

  if (!items.length) {
    items = await loadLocalItems();
  }

  state.allItems = items.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function loadCategories() {
  const localCategories = readStoredCategories();
  let categories = localCategories.length ? localCategories : DEFAULT_LIBRARY_CATEGORIES.slice();

  if (state.sb) {
    const { data, error } = await state.sb
      .from("site_pages")
      .select("content")
      .eq("slug", CATEGORY_PAGE_SLUG)
      .maybeSingle();

    if (!error) {
      const remoteCategories = sanitizeCategories(data?.content?.categories);
      if (remoteCategories.length) {
        categories = remoteCategories;
        writeStoredCategories(categories);
      }
    }
  }

  state.categories = categories;
  renderCategoryControls();
}

function readStoredCategories() {
  try {
    const raw = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (!raw) return [];
    return sanitizeCategories(JSON.parse(raw));
  } catch {
    return [];
  }
}

function writeStoredCategories(categories) {
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(sanitizeCategories(categories)));
}

function sanitizeCategories(categories) {
  if (!Array.isArray(categories)) return [];

  const unique = new Map();
  categories.forEach((value) => {
    const label = String(value || "").trim();
    if (!label) return;
    const key = label.toLowerCase();
    if (!unique.has(key)) unique.set(key, label);
  });

  return Array.from(unique.values()).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function renderCategoryControls() {
  renderCategoryMenu();
  renderTypeFilterOptions();
  renderCategorySelect(refs.createCategory);
  renderCategorySelect(refs.editCategory);
  renderAdminCategoryList();
}

function renderCategoryMenu() {
  if (!refs.categoryList) return;

  const active = state.filters.type;
  const items = [
    `<li><button class="category-menu-item${!active ? " is-active" : ""}" type="button" data-category-value=""><span class="category-icon-slot" aria-hidden="true"></span><span>Todas</span></button></li>`,
    ...state.categories.map(
      (category) => `<li><button class="category-menu-item${normalizeText(active) === normalizeText(category) ? " is-active" : ""}" type="button" data-category-value="${escapeHtml(category)}"><span class="category-icon-slot" aria-hidden="true"></span><span>${escapeHtml(category)}</span></button></li>`
    ),
  ];

  refs.categoryList.innerHTML = items.join("");
}

function renderTypeFilterOptions() {
  if (!refs.typeFilter) return;

  const currentValue = refs.typeFilter.value;
  const options = [
    `<option value="">Todas as categorias</option>`,
    ...state.categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`),
  ];

  refs.typeFilter.innerHTML = options.join("");
  refs.typeFilter.value = state.categories.some((category) => category === currentValue) ? currentValue : "";
}

function renderCategorySelect(selectEl) {
  if (!selectEl) return;

  const currentValue = selectEl.value;
  const options = [`<option value="">Selecione...</option>`];
  const categories = state.categories.slice();

  if (currentValue && !categories.includes(currentValue)) {
    categories.push(currentValue);
  }

  categories.sort((a, b) => a.localeCompare(b, "pt-BR"));
  categories.forEach((category) => {
    options.push(`<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`);
  });

  selectEl.innerHTML = options.join("");
  if (currentValue) {
    selectEl.value = currentValue;
  }
}

function renderAdminCategoryList() {
  if (!refs.adminCategoryList) return;

  refs.adminCategoryList.innerHTML = state.categories
    .map(
      (category) => `
        <article class="admin-category-item">
          <span>${escapeHtml(category)}</span>
          <button type="button" class="login-btn" data-remove-category="${escapeHtml(category)}">Excluir</button>
        </article>
      `
    )
    .join("");
}

async function loadSupabaseItems() {
  const { data, error } = await state.sb.from("books").select("*").order("created_at", { ascending: false });
  if (error || !data?.length) return [];

  return data.map((book) => ({
    dbId: book.id,
    id: `SB-${String(book.id).slice(0, 6).toUpperCase()}`,
    slug: book.id,
    title: book.title,
    type: book.category || "Livro",
    author: book.author || "Desconhecido",
    classification: "-",
    risk: "Nao informado",
    excerpt: book.description || "Sem descricao.",
    description: book.description || "Sem descricao.",
    date: book.created_at || new Date().toISOString(),
    file_path: book.file_path || "",
    cover_url: book.cover_url || "",
    source: "supabase",
  }));
}

async function loadLocalItems() {
  const response = await fetch("./data/items.json");
  if (!response.ok) {
    throw new Error("Falha ao carregar os dados do acervo.");
  }
  const data = await response.json();
  return data.map((item) => ({ ...item, source: "local" }));
}

async function loadFavorites() {
  if (!state.sb || !state.user) return;

  const { data } = await state.sb.from("favorites").select("book_id").eq("user_id", state.user.id);
  state.favorites = new Set((data || []).map((row) => row.book_id));
}

function resetAndFilter() {
  state.visibleCount = 9;
  applyFilters();
}

function applyFilters() {
  const { query, type } = state.filters;

  state.filteredItems = state.allItems.filter((item) => {
    const matchesView =
      state.viewMode !== "favorites" ||
      (item.source === "supabase" && item.dbId && state.favorites.has(item.dbId));
    if (!matchesView) return false;

    const matchesType = !type || normalizeText(item.type) === normalizeText(type);
    const searchTarget = [item.title, item.author, item.excerpt, item.id, item.type].join(" ").toLowerCase();
    const matchesQuery = !query || searchTarget.includes(query);
    return matchesType && matchesQuery;
  });

  render();
}

function handleCategoryListClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest("[data-category-value]");
  if (!button) return;

  setCategoryFilter(button.dataset.categoryValue || "");
  refs.quickFiltersPanel?.classList.remove("is-open");
  if (refs.quickFiltersPanel) refs.quickFiltersPanel.hidden = true;
  refs.filterQuickToggle?.setAttribute("aria-expanded", "false");
  refs.quickFiltersPanel?.setAttribute("aria-hidden", "true");
  refs.categoryToggle?.setAttribute("aria-expanded", "false");
  if (refs.categoryBox) refs.categoryBox.hidden = true;
}

function setCategoryFilter(category) {
  state.filters.type = category;
  if (refs.typeFilter) refs.typeFilter.value = category;
  renderCategoryMenu();
  resetAndFilter();
}

function render() {
  if (!refs.cardsGrid || !refs.cardTemplate || !refs.resultCount || !refs.loadMoreBtn) return;

  refs.cardsGrid.innerHTML = "";

  if (!state.filteredItems.length) {
    if (state.viewMode === "favorites" && !state.user) {
      refs.resultCount.textContent = "Faca login para ver seus favoritos.";
    } else {
      refs.resultCount.textContent = "Nenhum arquivo encontrado para os filtros atuais.";
    }
    refs.loadMoreBtn.hidden = true;
    return;
  }

  const visibleItems = state.filteredItems.slice(0, state.visibleCount);
  const fragment = document.createDocumentFragment();

  visibleItems.forEach((item) => {
    const cardNode = refs.cardTemplate.content.firstElementChild.cloneNode(true);
    const cardKey = item.source === "supabase" ? `sb:${item.dbId}` : `local:${item.slug}`;
    const isExpanded = state.expandedCards.has(cardKey);

    cardNode.dataset.cardKey = cardKey;
    cardNode.classList.toggle("is-expanded", isExpanded);
    cardNode.querySelector(".doc-id").textContent = `ARQUIVO ${item.id}`;
    cardNode.querySelector("h2").textContent = item.title;
    cardNode.querySelector(".card-type").textContent = `${item.classification || "-"} / ${item.type}`;
    cardNode.querySelector(".excerpt").textContent = item.excerpt;

    const descriptionNode = cardNode.querySelector(".card-description");
    descriptionNode.textContent = item.description || item.excerpt || "Sem descricao.";
    descriptionNode.hidden = !isExpanded;

    const toggleBtn = cardNode.querySelector(".card-toggle");
    toggleBtn.setAttribute("aria-expanded", String(isExpanded));
    toggleBtn.textContent = isExpanded ? "Ocultar descricao" : "Ler sobre (descricao completa)";

    const coverImg = cardNode.querySelector(".card-cover-image");
    const coverPlaceholder = cardNode.querySelector(".card-cover-placeholder");
    const coverSrc = item.cover_url || item.cover || "";
    if (coverSrc) {
      coverImg.src = coverSrc;
      coverImg.alt = `Capa de ${item.title}`;
      coverImg.hidden = false;
      coverPlaceholder.hidden = true;
    } else {
      coverImg.hidden = true;
      coverImg.removeAttribute("src");
      coverImg.alt = "";
      coverPlaceholder.hidden = false;
    }

    const meta = cardNode.querySelector(".meta");
    meta.innerHTML = [
      `<li>Autor: ${item.author || "Desconhecido"}</li>`,
      `<li>Classificacao: ${item.classification || "-"}</li>`,
    ].join("");

    const openLink = cardNode.querySelector(".open-btn");
    const favBtn = cardNode.querySelector(".fav-btn");

    openLink.dataset.source = item.source;
    openLink.dataset.dbId = item.dbId || "";
    openLink.dataset.filePath = item.file_path || "";
    openLink.dataset.slug = item.slug || "";
    openLink.href = item.source === "local" ? `document.html?slug=${encodeURIComponent(item.slug)}` : "#";
    openLink.textContent = "Abrir arquivo";

    if (item.source === "supabase") {
      favBtn.dataset.bookId = item.dbId;
      const active = state.favorites.has(item.dbId);
      paintFavoriteButton(favBtn, active);
      favBtn.hidden = false;
    } else {
      favBtn.hidden = true;
    }

    fragment.appendChild(cardNode);
  });

  refs.cardsGrid.appendChild(fragment);
  refs.resultCount.textContent = `${state.filteredItems.length} arquivo(s) encontrado(s). Exibindo ${visibleItems.length}.`;
  refs.loadMoreBtn.hidden = visibleItems.length >= state.filteredItems.length;
}

async function handleCardClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const favBtn = target.closest(".fav-btn");
  if (favBtn) {
    const bookId = favBtn.dataset.bookId;
    if (!bookId || !state.sb) return;
    await toggleFavorite(bookId, favBtn);
    return;
  }

  const toggleBtn = target.closest(".card-toggle");
  if (toggleBtn) {
    const card = toggleBtn.closest(".card");
    const cardKey = card?.dataset.cardKey;
    if (!cardKey) return;

    if (state.expandedCards.has(cardKey)) {
      state.expandedCards.delete(cardKey);
    } else {
      state.expandedCards.add(cardKey);
    }

    render();
    return;
  }

  const openBtn = target.closest(".open-btn");
  if (!openBtn) return;
  if (openBtn.dataset.source !== "supabase") return;

  event.preventDefault();
  const filePath = openBtn.dataset.filePath;
  if (!filePath || !state.sb) return;

  if (/^https?:\/\//i.test(filePath)) {
    window.open(filePath, "_blank", "noopener");
    return;
  }

  const { data, error } = await state.sb.storage.from("books").createSignedUrl(filePath, 120);
  if (error || !data?.signedUrl) {
    setAuthStatus("Nao foi possivel abrir o arquivo.");
    return;
  }

  window.open(data.signedUrl, "_blank", "noopener");
}

async function toggleFavorite(bookId, buttonEl) {
  if (!state.user || !state.sb) {
    refs.authDialog?.showModal();
    return;
  }

  const isFavorite = state.favorites.has(bookId);
  const nextFavorite = !isFavorite;

  state.favorites[nextFavorite ? "add" : "delete"](bookId);
  if (buttonEl) paintFavoriteButton(buttonEl, nextFavorite);

  let error = null;
  if (isFavorite) {
    const result = await state.sb.from("favorites").delete().eq("user_id", state.user.id).eq("book_id", bookId);
    error = result.error;
  } else {
    const result = await state.sb.from("favorites").insert({ user_id: state.user.id, book_id: bookId });
    error = result.error;
  }

  if (error) {
    state.favorites[isFavorite ? "add" : "delete"](bookId);
    if (buttonEl) paintFavoriteButton(buttonEl, isFavorite);
    setAuthStatus(`Falha ao favoritar: ${error.message}`);
    return;
  }

  render();
}

function paintFavoriteButton(button, active) {
  if (!button) return;
  button.textContent = active ? "\u2605" : "\u2606";
  button.setAttribute("aria-pressed", String(active));
}

async function openAdminPanel() {
  if (!isAdminUser()) return;
  refs.adminDialog?.showModal();
  switchAdminTab("create");
  await loadAdminBooks();
}

async function loadAdminBooks() {
  if (!state.sb) return;
  const { data, error } = await state.sb
    .from("books")
    .select("id, title, author, category, description, file_path, cover_url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    setAdminStatus(error.message);
    return;
  }

  state.adminBooks = data || [];
  renderEditBookSelect();
  renderDeleteBookList();
}

function renderEditBookSelect() {
  if (!refs.editBookSelect) return;
  const options = state.adminBooks
    .map((book) => `<option value="${book.id}">${escapeHtml(book.title)}</option>`)
    .join("");
  refs.editBookSelect.innerHTML = `<option value="">Selecione...</option>${options}`;
}

function renderDeleteBookList() {
  if (!refs.adminDeleteList) return;
  refs.adminDeleteList.innerHTML = state.adminBooks
    .map(
      (book) => `
      <article class="admin-item">
        <p><strong>${escapeHtml(book.title)}</strong> ${book.author ? `- ${escapeHtml(book.author)}` : ""}</p>
        <div class="admin-item-actions">
          <button type="button" class="login-btn" data-admin-action="delete" data-book-id="${book.id}">Excluir</button>
        </div>
      </article>
    `
    )
    .join("");
}

function switchAdminTab(tab) {
  const tabs = [
    { button: refs.adminTabCreate, panel: refs.adminPanelCreate, key: "create" },
    { button: refs.adminTabEdit, panel: refs.adminPanelEdit, key: "edit" },
    { button: refs.adminTabDelete, panel: refs.adminPanelDelete, key: "delete" },
  ];

  tabs.forEach((item) => {
    const active = item.key === tab;
    item.button?.classList.toggle("active-tab", active);
    item.button?.setAttribute("aria-selected", String(active));
    if (item.panel) item.panel.hidden = !active;
  });
}

function handleEditBookSelect() {
  const id = refs.editBookSelect?.value;
  if (!id) {
    resetEditForm();
    return;
  }

  const book = state.adminBooks.find((item) => item.id === id);
  if (!book) return;
  refs.editBookId.value = book.id;
  refs.editTitle.value = book.title || "";
  refs.editAuthor.value = book.author || "";
  if (refs.editCategory && book.category && !Array.from(refs.editCategory.options).some((option) => option.value === book.category)) {
    refs.editCategory.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(book.category)}">${escapeHtml(book.category)}</option>`);
  }
  refs.editCategory.value = book.category || "";
  refs.editDescription.value = book.description || "";
  refs.editCoverUrl.value = book.cover_url || "";
  setAdminStatus("Conteudo carregado para edicao.");
}

async function handleAddCategory() {
  if (!isAdminUser()) return;

  const value = refs.adminCategoryInput?.value.trim();
  if (!value) {
    setAdminStatus("Informe o nome da categoria.");
    return;
  }

  if (state.categories.some((category) => normalizeText(category) === normalizeText(value))) {
    setAdminStatus("Essa categoria ja existe.");
    return;
  }

  const nextCategories = sanitizeCategories([...state.categories, value]);
  const success = await persistCategories(nextCategories);
  if (!success) return;

  if (refs.adminCategoryInput) refs.adminCategoryInput.value = "";
  setAdminStatus("Categoria adicionada.");
}

async function handleAdminCategoryListClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest("[data-remove-category]");
  if (!button || !isAdminUser()) return;

  const category = button.dataset.removeCategory || "";
  if (!category) return;

  const categoryInUse = state.adminBooks.some((book) => normalizeText(book.category) === normalizeText(category));
  if (categoryInUse) {
    setAdminStatus("Nao e possivel excluir uma categoria que ainda esta em uso.");
    return;
  }

  const nextCategories = state.categories.filter((item) => normalizeText(item) !== normalizeText(category));
  const success = await persistCategories(nextCategories);
  if (!success) return;

  if (normalizeText(state.filters.type) === normalizeText(category)) {
    setCategoryFilter("");
  } else {
    renderCategoryControls();
  }

  setAdminStatus("Categoria excluida.");
}

async function persistCategories(categories) {
  const normalized = sanitizeCategories(categories);
  const nextCategories = normalized.length ? normalized : DEFAULT_LIBRARY_CATEGORIES.slice();

  if (state.sb && isAdminUser()) {
    const { error } = await state.sb.from("site_pages").upsert(
      {
        slug: CATEGORY_PAGE_SLUG,
        title: "Categorias da Biblioteca",
        content: { categories: nextCategories },
        updated_by: state.user?.id || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );

    if (error) {
      setAdminStatus(error.message);
      return false;
    }
  }

  state.categories = nextCategories;
  writeStoredCategories(state.categories);
  renderCategoryControls();
  return true;
}

async function saveNewBook(event) {
  event.preventDefault();
  if (!state.sb || !state.user) return;

  const title = refs.createTitle.value.trim();
  if (!title) {
    setAdminStatus("Informe o titulo.");
    return;
  }

  let filePath = null;
  const file = refs.createFile.files?.[0];
  if (file) {
    filePath = await uploadBookFile(file);
    if (!filePath) return;
  }

  let coverUrl = refs.createCoverUrl.value.trim() || null;
  const coverFile = refs.createCoverFile.files?.[0];
  if (coverFile) {
    coverUrl = await uploadBookCover(coverFile);
    if (!coverUrl) return;
  }

  const payload = {
    title,
    author: refs.createAuthor.value.trim() || null,
    category: refs.createCategory.value.trim() || null,
    description: refs.createDescription.value.trim() || null,
    cover_url: coverUrl,
    created_by: state.user.id,
  };

  if (filePath) {
    payload.file_path = filePath;
  }

  const { error } = await state.sb.from("books").insert(payload);

  if (error) {
    setAdminStatus(error.message);
    return;
  }

  setAdminStatus("Conteudo criado com sucesso.");
  resetCreateForm();
  await loadAdminBooks();
  await loadItems();
  applyFilters();
}

async function saveEditedBook(event) {
  event.preventDefault();
  if (!state.sb || !state.user) return;

  const id = refs.editBookId.value;
  if (!id) {
    setAdminStatus("Selecione um conteudo para editar.");
    return;
  }

  const title = refs.editTitle.value.trim();
  if (!title) {
    setAdminStatus("Informe o titulo.");
    return;
  }

  let filePath = null;
  const file = refs.editFile.files?.[0];
  if (file) {
    filePath = await uploadBookFile(file);
    if (!filePath) return;
  }

  let coverUrl = refs.editCoverUrl.value.trim() || null;
  const coverFile = refs.editCoverFile.files?.[0];
  if (coverFile) {
    coverUrl = await uploadBookCover(coverFile);
    if (!coverUrl) return;
  }

  const payload = {
    title,
    author: refs.editAuthor.value.trim() || null,
    category: refs.editCategory.value.trim() || null,
    description: refs.editDescription.value.trim() || null,
    cover_url: coverUrl,
  };
  if (filePath) payload.file_path = filePath;

  const { error } = await state.sb.from("books").update(payload).eq("id", id);
  if (error) {
    setAdminStatus(error.message);
    return;
  }

  setAdminStatus("Conteudo atualizado.");
  await loadAdminBooks();
  await loadItems();
  applyFilters();
}

async function uploadBookFile(file) {
  if (!state.sb || !state.user) return null;
  const safeName = file.name.replace(/[^\w.-]+/g, "-");
  const path = `${state.user.id}/${Date.now()}-${safeName}`;
  const upload = await state.sb.storage.from("books").upload(path, file);
  if (upload.error) {
    setAdminStatus(upload.error.message);
    return null;
  }
  return path;
}

async function uploadBookCover(file) {
  if (!state.sb || !state.user) return null;
  const safeName = file.name.replace(/[^\w.-]+/g, "-");
  const path = `${state.user.id}/${Date.now()}-${safeName}`;
  const upload = await state.sb.storage.from("book-covers").upload(path, file, {
    upsert: false,
  });

  if (upload.error) {
    setAdminStatus(upload.error.message);
    return null;
  }

  const { data } = state.sb.storage.from("book-covers").getPublicUrl(path);
  return data?.publicUrl || null;
}

async function deleteBook(bookId) {
  if (!state.sb) return;
  const confirmed = window.confirm("Deseja excluir este conteudo?");
  if (!confirmed) return;

  const { error } = await state.sb.from("books").delete().eq("id", bookId);
  if (error) {
    setAdminStatus(error.message);
    return;
  }

  setAdminStatus("Conteudo removido.");
  await loadAdminBooks();
  await loadItems();
  applyFilters();
}

function handleDeleteListClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest("[data-admin-action='delete']");
  if (!button) return;
  const bookId = button.dataset.bookId;
  if (!bookId) return;
  deleteBook(bookId);
}

function resetCreateForm() {
  refs.adminCreateForm?.reset();
}

function resetEditForm() {
  refs.adminEditForm?.reset();
  if (refs.editBookId) refs.editBookId.value = "";
  setAdminStatus("");
}

function setAdminStatus(text) {
  if (refs.adminStatus) refs.adminStatus.textContent = text;
}

function setViewMode(mode) {
  state.viewMode = mode;

  if (refs.viewAllBtn) {
    const active = mode === "all";
    refs.viewAllBtn.classList.toggle("active-view", active);
    refs.viewAllBtn.setAttribute("aria-pressed", String(active));
  }

  if (refs.viewFavoritesBtn) {
    const active = mode === "favorites";
    refs.viewFavoritesBtn.classList.toggle("active-view", active);
    refs.viewFavoritesBtn.setAttribute("aria-pressed", String(active));
  }

  resetAndFilter();
}

function isAdminUser() {
  const role = String(state.profile?.role || "").trim().toLowerCase();
  if (role === "admin") return true;

  const userEmail = String(state.user?.email || "").trim().toLowerCase();
  return ADMIN_EMAIL_ALLOWLIST.includes(userEmail);
}

function setupThemeToggle() {
  const storageKey = "ecos-theme";
  const root = document.body;
  const savedTheme = localStorage.getItem(storageKey);
  const preferredTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "dark";
  root.setAttribute("data-theme", preferredTheme);

  if (!refs.themeToggle) return;
  updateThemeButtonLabel(preferredTheme);

  refs.themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem(storageKey, nextTheme);
    updateThemeButtonLabel(nextTheme);
  });
}

function updateThemeButtonLabel(theme) {
  if (!refs.themeToggle) return;
  refs.themeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro");
  refs.themeToggle.setAttribute("data-active-theme", theme);
}

function bindSiteMenuEvents() {
  if (!refs.siteMenuToggle || !refs.siteMenuPanel || !refs.siteMenuOverlay) return;

  const openMenu = () => {
    refs.siteMenuPanel.classList.add("is-open");
    refs.siteMenuPanel.setAttribute("aria-hidden", "false");
    refs.siteMenuOverlay.hidden = false;
    refs.siteMenuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    refs.siteMenuPanel.classList.remove("is-open");
    refs.siteMenuPanel.setAttribute("aria-hidden", "true");
    refs.siteMenuOverlay.hidden = true;
    refs.siteMenuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  refs.siteMenuToggle.addEventListener("click", () => {
    const isOpen = refs.siteMenuPanel.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  refs.siteMenuClose?.addEventListener("click", closeMenu);
  refs.siteMenuOverlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
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
    const shouldGlitch = Math.random() < 0.12;
    if (!shouldGlitch) return;
    refs.title.classList.add("glitch");
    setTimeout(() => refs.title.classList.remove("glitch"), 140);
  }, 5200);
}

function escapeHtml(text = "") {
  return text.replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[char] || char;
  });
}

init().catch((error) => {
  if (refs.resultCount) refs.resultCount.textContent = "Falha ao inicializar.";
  if (refs.cardsGrid) refs.cardsGrid.innerHTML = `<p>${error.message}</p>`;
});

