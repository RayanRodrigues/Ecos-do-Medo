"use strict";

const SUPABASE_URL = "https://bwkzbcfrgmckiruawlqt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2J3a3piY2ZyZ21ja2lydWF3bHF0LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc3MjkzMTM3MiwiZXhwIjoyMDg4NTA3MzcyfQ.QlIZV9C5gezRKX2YmtHtZUzZHgVRUi5uOLl1Rmh2LSM";
const ADMIN_EMAIL_ALLOWLIST = ["rayandepaulagpt@gmail.com"];
const ABOUT_STORAGE_KEY = "ecos-about-content";
const THEME_STORAGE_KEY = "ecos-theme";

const defaultContent = {
  heroTitle: "Sobre o Ecos do Medo",
  heroLead:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, magna nec pulvinar feugiat, turpis mauris luctus nibh, a iaculis mi velit non magna. Sed vitae magna at sem tincidunt feugiat nec sed erat.",
  sectionOneTitle: "Origem do arquivo",
  sectionOneBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, urna eget volutpat viverra, dolor augue posuere augue, ac dictum metus mi non risus. Vivamus venenatis, est quis commodo aliquam, lectus leo congue dui, vitae congue lorem tellus non dui.",
  sectionTwoTitle: "Missao editorial",
  sectionTwoBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor turpis sed lorem convallis, et feugiat ligula accumsan. Morbi gravida tortor sed lectus suscipit, nec ultrices nisi posuere. In hac habitasse platea dictumst.",
  sectionThreeTitle: "O que vem depois",
  sectionThreeBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius metus ac arcu dictum, a ullamcorper sem blandit. Pellentesque non aliquet est. Ut viverra eu odio non faucibus. Mauris vulputate vulputate eros, vitae pulvinar elit laoreet in.",
  closingQuote:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sed nibh volutpat feugiat sed nec mauris.",
};

const state = {
  sb: null,
  user: null,
  profile: null,
  content: cloneContent(defaultContent),
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
  adminCloseBtn: document.getElementById("adminCloseBtn"),
  adminStatus: document.getElementById("adminStatus"),
};

async function init() {
  setupThemeToggle();
  setupSupabase();
  loadContent();
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

function loadContent() {
  const raw = localStorage.getItem(ABOUT_STORAGE_KEY);
  if (!raw) {
    state.content = cloneContent(defaultContent);
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    state.content = {
      heroTitle: parsed.heroTitle || defaultContent.heroTitle,
      heroLead: parsed.heroLead || defaultContent.heroLead,
      sectionOneTitle: parsed.sectionOneTitle || defaultContent.sectionOneTitle,
      sectionOneBody: parsed.sectionOneBody || defaultContent.sectionOneBody,
      sectionTwoTitle: parsed.sectionTwoTitle || defaultContent.sectionTwoTitle,
      sectionTwoBody: parsed.sectionTwoBody || defaultContent.sectionTwoBody,
      sectionThreeTitle: parsed.sectionThreeTitle || defaultContent.sectionThreeTitle,
      sectionThreeBody: parsed.sectionThreeBody || defaultContent.sectionThreeBody,
      closingQuote: parsed.closingQuote || defaultContent.closingQuote,
    };
  } catch {
    state.content = cloneContent(defaultContent);
  }
}

function renderContent() {
  refs.aboutHeroTitle.textContent = state.content.heroTitle;
  refs.aboutHeroLead.textContent = state.content.heroLead;
  refs.aboutSectionOneTitle.textContent = state.content.sectionOneTitle;
  refs.aboutSectionOneBody.textContent = state.content.sectionOneBody;
  refs.aboutSectionTwoTitle.textContent = state.content.sectionTwoTitle;
  refs.aboutSectionTwoBody.textContent = state.content.sectionTwoBody;
  refs.aboutSectionThreeTitle.textContent = state.content.sectionThreeTitle;
  refs.aboutSectionThreeBody.textContent = state.content.sectionThreeBody;
  refs.aboutClosingQuote.textContent = state.content.closingQuote;
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

  const userEmail = String(state.user?.email || "").trim().toLowerCase();
  return ADMIN_EMAIL_ALLOWLIST.includes(userEmail);
}

async function handleAuthButtonClick() {
  if (!state.sb) {
    setAuthStatus("Supabase nao inicializado.");
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
    setAdminStatus("Somente admin pode editar esta pagina.");
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

function saveAboutContent(event) {
  event.preventDefault();
  if (!isAdminUser()) {
    setAdminStatus("Somente admin pode editar esta pagina.");
    return;
  }

  const nextContent = collectFormContent();
  const hasEmptyField = Object.values(nextContent).some((value) => !value);
  if (hasEmptyField) {
    setAdminStatus("Preencha todos os campos.");
    return;
  }

  state.content = nextContent;
  localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(state.content));
  renderContent();
  setAdminStatus("Pagina Sobre atualizada.");
}

function restoreDefaultContent() {
  if (!isAdminUser()) {
    setAdminStatus("Somente admin pode editar esta pagina.");
    return;
  }

  state.content = cloneContent(defaultContent);
  localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(state.content));
  fillAdminForm();
  renderContent();
  setAdminStatus("Conteudo padrao restaurado.");
}

function setAdminStatus(text) {
  if (refs.adminStatus) refs.adminStatus.textContent = text;
}

function setupThemeToggle() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const preferredTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
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
