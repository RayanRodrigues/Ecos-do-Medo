"use strict";

const SUPABASE_URL = "https://bwkzbcfrgmckiruawlqt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a3piY2ZyZ21ja2lydWF3bHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzEzNzIsImV4cCI6MjA4ODUwNzM3Mn0.QlIZV9C5gezRKX2YmtHtZUzZHgVRUi5uOLl1Rmh2LSM";
const ADMIN_EMAIL_ALLOWLIST = ["rayandepaulagpt@gmail.com"];
const ABOUT_STORAGE_KEY = "ecos-about-content";
const THEME_STORAGE_KEY = "ecos-theme";
const ABOUT_TABLE = "site_pages";
const ABOUT_PAGE_SLUG = "about";

const defaultContent = {
  heroTitle: "Sobre a Ecos do Medo",
  heroLead:
    "Ecos do Medo é um projeto voltado à criação de conteúdos para RPG e narrativas de terror. Seu objetivo é oferecer materiais que ajudem mestres e jogadores a construir histórias sombrias, misteriosas e imersivas, como documentos, livros, registros e recursos narrativos. A proposta é transformar o medo em experiência: investigações, rituais, relatos e fragmentos de conhecimento que ampliam o universo das mesas de RPG.",
  sectionOneTitle: "A Origem dos Ecos",
  sectionOneBody:
    "A ideia de Ecos do Medo nasceu da vontade de transformar o terror em algo explorável dentro do RPG. Em vez de apenas contar histórias assustadoras, o projeto surgiu para criar materiais que façam os jogadores descobrirem o medo pouco a pouco, como se estivessem investigando algo proibido. A inspiração vem da mistura entre mistério, investigação paranormal e narrativa imersiva. Livros antigos, documentos esquecidos, rituais anotados às pressas e registros de eventos inexplicáveis compõem a sensação de um mundo escondido por trás das páginas. Assim, Ecos do Medo surgiu como um projeto para construir esse universo: um lugar onde cada documento, registro ou arte parece ser um fragmento real de algo que deixou marcas.",
  sectionTwoTitle: "A Mente por Trás dos Ecos",
  sectionTwoBody:
    "Por trás de Ecos do Medo está Beatriz, mais conhecida como B!B!S. Uma mente criativa que vive entre dois mundos: o da arte e o do estranho. Estudante de artes, desenvolvedora de jogos, ilustradora digital e designer, B!B!S sempre teve uma relação intensa com a criação. Desenhar mundos, inventar histórias e construir atmosferas faz parte do mesmo impulso: transformar imaginação em algo que outras pessoas possam explorar. No centro disso está o fascínio pelo terror, pelo paranormal e pelo sobrenatural. Não aquele medo vazio que aparece só para assustar, mas o interesse pelo mistério, pelas perguntas sem resposta, pelos relatos estranhos e pelos símbolos que parecem guardar segredos.",
  sectionThreeTitle: "Arquivos da Equipe",
  sectionThreeBody:
    "Criadora: B!B!S. Criadora de Ecos do Medo, movida pelo fascínio por terror, paranormal e mistérios, transformando essas ideias em um universo narrativo investigativo. Programadores e Desenvolvedores: Rayan de Paula e Endy. Responsáveis pela parte técnica do projeto, desenvolvendo sistemas, páginas e ferramentas que estruturam o universo digital de Ecos do Medo. Ilustradores: Ayalovs. Cria as ilustrações que dão forma visual ao universo do projeto, representando símbolos, registros e elementos do mundo investigativo e sobrenatural. Designers: ty_haru e Katsuo. Responsáveis pela identidade visual, layouts e organização estética dos materiais e documentos do projeto. Escritores: Wavyymi. Ajuda a expandir a narrativa do universo com textos, registros e fragmentos de histórias que aprofundam os mistérios de Ecos do Medo.",
  closingQuote:
    "Em poucas palavras: Ecos do Medo existe para dar forma ao desconhecido dentro das histórias.",
};

const state = {
  sb: null,
  user: null,
  profile: null,
  content: cloneContent(defaultContent),
  lastRemoteError: "",
};

const refs = {
  aboutHeroTitle: document.getElementById("aboutHeroTitle"),
  aboutHeroLead: document.getElementById("aboutHeroLead"),
  aboutSectionOneTitle: document.getElementById("aboutSectionOneTitle"),
  aboutSectionOneBody: document.getElementById("aboutSectionOneBody"),
  aboutSectionTwoTitle: document.getElementById("aboutSectionTwoTitle"),
  aboutSectionTwoBody: document.getElementById("aboutSectionTwoBody"),
  aboutSectionThreeTitle: document.getElementById("aboutSectionThreeTitle"),
  aboutSectionThreeBody: document.getElementById("aboutSectionThreeBody"),
  aboutClosingQuote: document.getElementById("aboutClosingQuote"),
  themeToggle: document.getElementById("themeToggle"),
  siteMenuToggle: document.getElementById("siteMenuToggle"),
  siteMenuClose: document.getElementById("siteMenuClose"),
  siteMenuPanel: document.getElementById("siteMenuPanel"),
  siteMenuOverlay: document.getElementById("siteMenuOverlay"),
  authBtn: document.getElementById("authBtn"),
  siteMenuAuthBtn: document.getElementById("siteMenuAuthBtn"),
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
  aboutAdminForm: document.getElementById("aboutAdminForm"),
  adminHeroTitle: document.getElementById("adminHeroTitle"),
  adminHeroLead: document.getElementById("adminHeroLead"),
  adminSectionOneTitle: document.getElementById("adminSectionOneTitle"),
  adminSectionOneBody: document.getElementById("adminSectionOneBody"),
  adminSectionTwoTitle: document.getElementById("adminSectionTwoTitle"),
  adminSectionTwoBody: document.getElementById("adminSectionTwoBody"),
  adminSectionThreeTitle: document.getElementById("adminSectionThreeTitle"),
  adminSectionThreeBody: document.getElementById("adminSectionThreeBody"),
  adminClosingQuote: document.getElementById("adminClosingQuote"),
  adminResetBtn: document.getElementById("adminResetBtn"),
  adminSaveBtn: document.getElementById("adminSaveBtn"),
  adminCloseBtn: document.getElementById("adminCloseBtn"),
  adminStatus: document.getElementById("adminStatus"),
};

async function init() {
  setupThemeToggle();
  setupSupabase();
  await loadContent();
  renderContent();
  bindEvents();
  bindSiteMenuEvents();
  await refreshAuthState();
}

function cloneContent(content) {
  return JSON.parse(JSON.stringify(content));
}

function setupSupabase() {
  if (!window.supabase) return;
  state.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function bindEvents() {
  refs.authBtn?.addEventListener("click", handleAuthButtonClick);
  refs.siteMenuAuthBtn?.addEventListener("click", handleAuthButtonClick);
  refs.authSignInBtn?.addEventListener("click", signIn);
  refs.authSignUpBtn?.addEventListener("click", signUp);
  refs.authGoogleBtn?.addEventListener("click", () => signInWithOAuth("google"));
  refs.authDiscordBtn?.addEventListener("click", () => signInWithOAuth("discord"));
  refs.authCloseBtn?.addEventListener("click", () => refs.authDialog?.close());
  refs.adminBtn?.addEventListener("click", openAdminDialog);
  refs.aboutAdminForm?.addEventListener("submit", saveAboutContent);
  refs.adminResetBtn?.addEventListener("click", restoreDefaultContent);
  refs.adminCloseBtn?.addEventListener("click", () => refs.adminDialog?.close());
}

async function loadContent() {
  const remoteContent = await loadRemoteContent();
  if (remoteContent) {
    state.content = normalizeContent(remoteContent);
    persistLocalContent(state.content);
    return;
  }

  state.content = loadLocalContent();
}

function renderContent() {
  refs.aboutHeroTitle.textContent = state.content.heroTitle;
  renderRichText(refs.aboutHeroLead, state.content.heroLead);
  refs.aboutSectionOneTitle.textContent = state.content.sectionOneTitle;
  renderRichText(refs.aboutSectionOneBody, state.content.sectionOneBody);
  refs.aboutSectionTwoTitle.textContent = state.content.sectionTwoTitle;
  renderRichText(refs.aboutSectionTwoBody, state.content.sectionTwoBody);
  refs.aboutSectionThreeTitle.textContent = state.content.sectionThreeTitle;
  renderTeamContent(refs.aboutSectionThreeBody, state.content.sectionThreeBody);
  refs.aboutClosingQuote.textContent = state.content.closingQuote;
}

function renderRichText(container, text) {
  if (!container) return;
  container.innerHTML = "";

  const paragraphs = splitIntoParagraphs(text);
  paragraphs.forEach((paragraph) => {
    const element = document.createElement("p");
    element.textContent = paragraph;
    container.append(element);
  });
}

function splitIntoParagraphs(text = "") {
  const normalized = String(text).trim();
  if (!normalized) return [];

  if (normalized.includes("\n")) {
    return normalized
      .split(/\n\s*\n/g)
      .map((part) => part.replace(/\n/g, " ").trim())
      .filter(Boolean);
  }

  const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length <= 2) return [normalized];

  const paragraphs = [];
  for (let index = 0; index < sentences.length; index += 2) {
    paragraphs.push(sentences.slice(index, index + 2).join(" ").trim());
  }
  return paragraphs;
}

function renderTeamContent(container, text) {
  if (!container) return;
  container.innerHTML = "";

  const entries = parseTeamEntries(text);
  if (!entries.length) {
    renderRichText(container, text);
    return;
  }

  entries.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "about-team-item";

    const title = document.createElement("h4");
    title.textContent = entry.role;

    const name = document.createElement("p");
    name.className = "about-team-name";
    name.textContent = entry.name;

    const desc = document.createElement("p");
    desc.className = "about-team-desc";
    desc.textContent = entry.description;

    item.append(title, name, desc);
    container.append(item);
  });
}

function parseTeamEntries(text = "") {
  return String(text)
    .trim()
    .split(/\n\s*\n/g)
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const firstLine = lines[0] || "";
      const separatorIndex = firstLine.indexOf(":");
      if (separatorIndex === -1) return null;

      const role = firstLine.slice(0, separatorIndex).trim();
      const name = firstLine.slice(separatorIndex + 1).trim();
      const description = lines.slice(1).join(" ").trim();
      if (!role || !name || !description) return null;

      return { role, name, description };
    })
    .filter(Boolean);
}

async function refreshAuthState() {
  if (!state.sb) {
    updateAuthUI();
    return;
  }

  const { data } = await state.sb.auth.getSession();
  await applySession(data.session);

  state.sb.auth.onAuthStateChange(async (_event, session) => {
    await applySession(session);
  });
}

async function loadRemoteContent() {
  if (!state.sb) return null;

  const { data, error } = await state.sb
    .from(ABOUT_TABLE)
    .select("content")
    .eq("slug", ABOUT_PAGE_SLUG)
    .maybeSingle();

  if (error || !data?.content) return null;
  return data.content;
}

function loadLocalContent() {
  const raw = localStorage.getItem(ABOUT_STORAGE_KEY);
  if (!raw) return cloneContent(defaultContent);

  try {
    return normalizeContent(JSON.parse(raw));
  } catch {
    return cloneContent(defaultContent);
  }
}

function normalizeContent(parsed) {
  const normalized = {
    heroTitle: applyAccentFixes(parsed.heroTitle || defaultContent.heroTitle),
    heroLead: applyAccentFixes(parsed.heroLead || defaultContent.heroLead),
    sectionOneTitle: applyAccentFixes(parsed.sectionOneTitle || defaultContent.sectionOneTitle),
    sectionOneBody: applyAccentFixes(parsed.sectionOneBody || defaultContent.sectionOneBody),
    sectionTwoTitle: applyAccentFixes(parsed.sectionTwoTitle || defaultContent.sectionTwoTitle),
    sectionTwoBody: applyAccentFixes(parsed.sectionTwoBody || defaultContent.sectionTwoBody),
    sectionThreeTitle: applyAccentFixes(parsed.sectionThreeTitle || defaultContent.sectionThreeTitle),
    sectionThreeBody: applyAccentFixes(parsed.sectionThreeBody || defaultContent.sectionThreeBody),
    closingQuote: applyAccentFixes(parsed.closingQuote || defaultContent.closingQuote),
  };

  return isPlaceholderContent(normalized) ? cloneContent(defaultContent) : normalized;
}

function isPlaceholderContent(content) {
  return Object.values(content).join(" ").toLowerCase().includes("lorem ipsum");
}

function applyAccentFixes(text = "") {
  return String(text)
    .replaceAll("Pagina", "Página")
    .replaceAll("pagina", "página")
    .replaceAll("criacao", "criação")
    .replaceAll("conteudos", "conteúdos")
    .replaceAll("historias", "histórias")
    .replaceAll("experiencia", "experiência")
    .replaceAll("investigacoes", "investigações")
    .replaceAll("exploravel", "explorável")
    .replaceAll("facam", "façam")
    .replaceAll("inspiracao", "inspiração")
    .replaceAll("misterio", "mistério")
    .replaceAll("investigacao", "investigação")
    .replaceAll("as pressas", "às pressas")
    .replaceAll("inexplicaveis", "inexplicáveis")
    .replaceAll("compoem", "compõem")
    .replaceAll("sensacao", "sensação")
    .replaceAll("por tras", "por trás")
    .replaceAll("tras ", "trás ")
    .replaceAll("esta ", "está ")
    .replaceAll("relacao", "relação")
    .replaceAll("criacao", "criação")
    .replaceAll("imaginacao", "imaginação")
    .replaceAll("fascinio", "fascínio")
    .replaceAll("Nao", "Não")
    .replaceAll("so ", "só ")
    .replaceAll("simbolos", "símbolos")
    .replaceAll("misterios", "mistérios")
    .replaceAll("Responsaveis", "Responsáveis")
    .replaceAll("tecnica", "técnica")
    .replaceAll("paginas", "páginas")
    .replaceAll("ilustracoes", "ilustrações")
    .replaceAll("dao", "dão")
    .replaceAll("organizacao", "organização")
    .replaceAll("estetica", "estética")
    .replaceAll("historias", "histórias")
    .replaceAll("Titulo", "Título")
    .replaceAll("Citacao", "Citação")
    .replaceAll("alteracoes", "alterações")
    .replaceAll("Sessao", "Sessão")
    .replaceAll("Dossie", "Dossiê")
    .replaceAll("Conteudo", "Conteúdo")
    .replaceAll("Conteudo", "Conteúdo")
    .replaceAll("banco nao", "banco não")
    .replaceAll("Conteudo", "Conteúdo")
    .replaceAll("padrao", "padrão")
    .replaceAll("Somente admin pode editar esta pagina.", "Somente admin pode editar esta página.")
    .replaceAll("Pagina Sobre atualizada e salva no servidor.", "Página Sobre atualizada e salva no servidor.")
    .replaceAll("Pagina Sobre atualizada neste navegador. O banco nao respondeu.", "Página Sobre atualizada neste navegador. O banco não respondeu.")
    .replaceAll("Conteudo padrao restaurado.", "Conteúdo padrão restaurado.")
    .replaceAll("Conteudo padrao restaurado neste navegador.", "Conteúdo padrão restaurado neste navegador.");
}

async function applySession(session) {
  state.user = session?.user || null;
  state.profile = null;

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
  }

  updateAuthUI();
}

function updateAuthUI() {
  const authLabel = state.user ? "Sair" : "Entrar";
  if (refs.authBtn) refs.authBtn.textContent = authLabel;
  if (refs.siteMenuAuthBtn) refs.siteMenuAuthBtn.textContent = authLabel;
  if (refs.adminBtn) refs.adminBtn.hidden = !isAdminUser();
}

function isAdminUser() {
  const role = String(state.profile?.role || "").trim().toLowerCase();
  if (role === "admin") return true;

  const hasAdminRole = (value) => {
    if (Array.isArray(value)) {
      return value.some((item) => String(item || "").trim().toLowerCase() === "admin");
    }
    return String(value || "").trim().toLowerCase() === "admin";
  };

  if (
    hasAdminRole(state.user?.role) ||
    hasAdminRole(state.user?.roles) ||
    hasAdminRole(state.user?.app_metadata?.role) ||
    hasAdminRole(state.user?.app_metadata?.roles) ||
    hasAdminRole(state.user?.user_metadata?.role) ||
    hasAdminRole(state.user?.user_metadata?.roles)
  ) {
    return true;
  }

  const userEmail = String(state.user?.email || "").trim().toLowerCase();
  return ADMIN_EMAIL_ALLOWLIST.includes(userEmail);
}

async function handleAuthButtonClick() {
  if (!state.sb) {
    setAuthStatus("Supabase não inicializado.");
    return;
  }

  if (state.user) {
    await state.sb.auth.signOut();
    refs.authDialog?.close();
    refs.adminDialog?.close();
    return;
  }

  setAuthStatus("");
  refs.authDialog?.showModal();
}

async function signIn() {
  if (!state.sb || !refs.authEmail || !refs.authPassword) return;
  setAuthStatus("Entrando...");

  const { error } = await state.sb.auth.signInWithPassword({
    email: refs.authEmail.value.trim(),
    password: refs.authPassword.value,
  });

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

  const { error } = await state.sb.auth.signUp({
    email: refs.authEmail.value.trim(),
    password: refs.authPassword.value,
  });

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
      redirectTo: window.location.href,
    },
  });

  if (error) setAuthStatus(error.message);
}

function setAuthStatus(text) {
  if (refs.authStatus) refs.authStatus.textContent = text;
}

function openAdminDialog() {
  if (!isAdminUser()) {
    setAdminStatus("Somente admin pode editar esta página.");
    return;
  }

  fillAdminForm();
  setAdminStatus("");
  refs.adminDialog?.showModal();
}

function fillAdminForm() {
  refs.adminHeroTitle.value = state.content.heroTitle;
  refs.adminHeroLead.value = state.content.heroLead;
  refs.adminSectionOneTitle.value = state.content.sectionOneTitle;
  refs.adminSectionOneBody.value = state.content.sectionOneBody;
  refs.adminSectionTwoTitle.value = state.content.sectionTwoTitle;
  refs.adminSectionTwoBody.value = state.content.sectionTwoBody;
  refs.adminSectionThreeTitle.value = state.content.sectionThreeTitle;
  refs.adminSectionThreeBody.value = state.content.sectionThreeBody;
  refs.adminClosingQuote.value = state.content.closingQuote;
}

function collectFormContent() {
  return {
    heroTitle: refs.adminHeroTitle.value.trim(),
    heroLead: refs.adminHeroLead.value.trim(),
    sectionOneTitle: refs.adminSectionOneTitle.value.trim(),
    sectionOneBody: refs.adminSectionOneBody.value.trim(),
    sectionTwoTitle: refs.adminSectionTwoTitle.value.trim(),
    sectionTwoBody: refs.adminSectionTwoBody.value.trim(),
    sectionThreeTitle: refs.adminSectionThreeTitle.value.trim(),
    sectionThreeBody: refs.adminSectionThreeBody.value.trim(),
    closingQuote: refs.adminClosingQuote.value.trim(),
  };
}

async function saveAboutContent(event) {
  event.preventDefault();
  if (!isAdminUser()) {
    setAdminStatus("Somente admin pode editar esta página.");
    return;
  }

  const nextContent = collectFormContent();
  const hasEmptyField = Object.values(nextContent).some((value) => !value);
  if (hasEmptyField) {
    setAdminStatus("Preencha todos os campos.");
    return;
  }

  state.content = nextContent;
  persistLocalContent(state.content);
  renderContent();
  refs.adminSaveBtn?.setAttribute("disabled", "true");

  const remoteSaved = await saveRemoteContent(state.content);
  refs.adminSaveBtn?.removeAttribute("disabled");

  if (remoteSaved) {
    setAdminStatus("Página Sobre atualizada e salva no servidor.");
    return;
  }

  setAdminStatus(
    state.lastRemoteError
      ? `Página Sobre atualizada neste navegador. Erro ao salvar no servidor: ${state.lastRemoteError}`
      : "Página Sobre atualizada neste navegador. O banco não respondeu."
  );
}

async function restoreDefaultContent() {
  if (!isAdminUser()) {
    setAdminStatus("Somente admin pode editar esta página.");
    return;
  }

  state.content = cloneContent(defaultContent);
  persistLocalContent(state.content);
  fillAdminForm();
  renderContent();
  const remoteSaved = await saveRemoteContent(state.content);
  setAdminStatus(remoteSaved ? "Conteúdo padrão restaurado." : "Conteúdo padrão restaurado neste navegador.");
}

function setAdminStatus(text) {
  if (refs.adminStatus) refs.adminStatus.textContent = text;
}

function persistLocalContent(content) {
  localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(content));
}

async function saveRemoteContent(content) {
  state.lastRemoteError = "";

  if (!state.sb) {
    state.lastRemoteError = "Supabase não inicializado.";
    return false;
  }

  if (!state.user) {
    state.lastRemoteError = "Usuário não autenticado.";
    return false;
  }

  const payload = {
    slug: ABOUT_PAGE_SLUG,
    title: "Sobre",
    content,
    updated_by: state.user.id,
    updated_at: new Date().toISOString(),
  };

  try {
    const { error } = await state.sb.from(ABOUT_TABLE).upsert(payload, { onConflict: "slug" });
    if (error) {
      state.lastRemoteError = error.message;
      return false;
    }

    return true;
  } catch (error) {
    state.lastRemoteError = error instanceof Error ? error.message : String(error);
    return false;
  }
}

function setupThemeToggle() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const preferredTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "dark";
  document.body.setAttribute("data-theme", preferredTheme);
  updateThemeButtonLabel(preferredTheme);

  refs.themeToggle?.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
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

init();
