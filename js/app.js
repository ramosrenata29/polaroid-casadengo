/**
 * Módulo Principal da Aplicação SPA (App Controller)
 * Conecta as views, controle de abas, modo noturno e inicialização.
 */

import { initCameraControls } from './camera.js';
import { initEditorControls } from './editor.js';
import { initMural } from './mural.js';
import { initAdminPanel } from './admin.js';
import { initOfflineSync } from './offline.js';
import { savePhoto } from './db.js';

document.addEventListener('DOMContentLoaded', () => {
  // Configuração do Tema Noturno (Dark Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('polaroid_theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('polaroid_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const iconSpan = themeToggleBtn.querySelector('.material-symbols-outlined');
    if (iconSpan) {
      iconSpan.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
  }

  // Controle de Navegação entre Abas (Mural vs Câmera)
  const navTabs = document.querySelectorAll('.nav-tab');
  const viewSections = document.querySelectorAll('.view-section');
  const fabCameraBtn = document.getElementById('fabCameraBtn');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      switchView(targetId);
    });
  });

  if (fabCameraBtn) {
    fabCameraBtn.addEventListener('click', () => {
      switchView('captureView');
    });
  }

  function switchView(targetId) {
    navTabs.forEach(tab => {
      if (tab.getAttribute('data-target') === targetId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    viewSections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    if (targetId === 'muralView') {
      if (fabCameraBtn) fabCameraBtn.classList.remove('hidden');
    } else {
      if (fabCameraBtn) fabCameraBtn.classList.add('hidden');
    }
  }

  // Inicialização do Mural
  const muralGrid = document.getElementById('muralGrid');
  const refreshMuralBtn = document.getElementById('refreshMuralBtn');
  const muralInstance = initMural(muralGrid, refreshMuralBtn);

  // Elementos do Editor
  const cameraContainer = document.getElementById('cameraContainer');
  const editorContainer = document.getElementById('editorContainer');

  const editorElements = {
    polaroidCard: document.getElementById('polaroidCard'),
    polaroidImg: document.getElementById('polaroidImg'),
    captionInput: document.getElementById('captionInput'),
    polaroidCaptionText: document.getElementById('polaroidCaptionText'),
    authorInput: document.getElementById('authorInput'),
    polaroidAuthor: document.getElementById('polaroidAuthor'),
    filterChips: document.querySelectorAll('[data-filter]'),
    fontChips: document.querySelectorAll('[data-font]'),
    retakeBtn: document.getElementById('retakeBtn'),
    publishBtn: document.getElementById('publishBtn'),
    onRetake: () => {
      editorContainer.classList.add('hidden');
      cameraContainer.classList.remove('hidden');
      if (cameraInstance) cameraInstance.restartCamera();
    }
  };

  const editorInstance = initEditorControls(editorElements, async (photoPayload) => {
    // Ação Publicar Foto
    const result = await savePhoto(photoPayload);
    showToast('Foto salva no mural com sucesso!', 'success');

    // Resetar editor e voltar para a visão de Câmera/Mural
    editorInstance.resetEditor();
    editorContainer.classList.add('hidden');
    cameraContainer.classList.remove('hidden');

    switchView('muralView');
    muralInstance.refresh();
  });

  // Elementos da Câmera
  const cameraElements = {
    videoEl: document.getElementById('cameraVideo'),
    canvasEl: document.getElementById('snapshotCanvas'),
    placeholderEl: document.getElementById('cameraPlaceholder'),
    shutterBtn: document.getElementById('shutterBtn'),
    switchCameraBtn: document.getElementById('switchCameraBtn'),
    fileInput: document.getElementById('fileInput'),
    fileInputAlt: document.getElementById('fileInputAlt')
  };

  const cameraInstance = initCameraControls(cameraElements, (imageDataUrl) => {
    // Quando uma foto é capturada ou selecionada
    editorInstance.loadImage(imageDataUrl);
    cameraContainer.classList.add('hidden');
    editorContainer.classList.remove('hidden');
    if (cameraInstance) cameraInstance.stopCamera();
  });

  // Painel Admin do Casal
  const adminElements = {
    adminBtn: document.getElementById('adminBtn'),
    adminModal: document.getElementById('adminModal'),
    closeAdminModalBtn: document.getElementById('closeAdminModalBtn'),
    adminAuthSection: document.getElementById('adminAuthSection'),
    adminDashboardSection: document.getElementById('adminDashboardSection'),
    adminPasswordInput: document.getElementById('adminPasswordInput'),
    adminAuthError: document.getElementById('adminAuthError'),
    adminLoginBtn: document.getElementById('adminLoginBtn'),
    adminPhotoCount: document.getElementById('adminPhotoCount'),
    downloadZipBtn: document.getElementById('downloadZipBtn'),
    adminPhotoGrid: document.getElementById('adminPhotoGrid')
  };

  initAdminPanel(adminElements, () => muralInstance.getPhotos());

  // Offline Sync
  initOfflineSync(() => {
    muralInstance.refresh();
  });
});

// Toast Helper Global
export function showToast(message, type = 'info') {
  const toast = document.getElementById('statusToast');
  const msgEl = document.getElementById('statusMessage');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}
