/**
 * Módulo do Painel do Casal (Admin)
 * Gerencia autenticação simples por senha, exclusão de fotos indesejadas
 * e download em lote de todas as fotos em formato ZIP usando JSZip.
 */

import { deletePhoto } from './db.js';
import { showToast } from './app.js';

const DEFAULT_ADMIN_PASS = 'casamento2026';

export function initAdminPanel(elements, getMuralPhotosCallback) {
  const {
    adminBtn,
    adminModal,
    closeAdminModalBtn,
    adminAuthSection,
    adminDashboardSection,
    adminPasswordInput,
    adminAuthError,
    adminLoginBtn,
    adminPhotoCount,
    downloadZipBtn,
    adminPhotoGrid
  } = elements;

  let isAuthenticated = false;

  // Abrir Modal Admin
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      adminModal.classList.remove('hidden');
      if (isAuthenticated) {
        showDashboard();
      } else {
        showAuthForm();
      }
    });
  }

  // Fechar Modal
  if (closeAdminModalBtn) {
    closeAdminModalBtn.addEventListener('click', () => {
      adminModal.classList.add('hidden');
    });
  }

  // Login do Admin
  if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', handleLogin);
  }

  if (adminPasswordInput) {
    adminPasswordInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
  }

  function handleLogin() {
    const inputPass = adminPasswordInput.value.trim();
    if (inputPass === DEFAULT_ADMIN_PASS) {
      isAuthenticated = true;
      adminAuthError.classList.add('hidden');
      adminPasswordInput.value = '';
      showDashboard();
    } else {
      adminAuthError.classList.remove('hidden');
    }
  }

  function showAuthForm() {
    adminAuthSection.classList.remove('hidden');
    adminDashboardSection.classList.add('hidden');
  }

  function showDashboard() {
    adminAuthSection.classList.add('hidden');
    adminDashboardSection.classList.remove('hidden');
    renderAdminPhotos();
  }

  function renderAdminPhotos() {
    const photos = getMuralPhotosCallback() || [];
    adminPhotoCount.textContent = `${photos.length} foto(s) cadastradas`;
    adminPhotoGrid.innerHTML = '';

    if (photos.length === 0) {
      adminPhotoGrid.innerHTML = '<p class="text-secondary" style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhuma foto cadastrada no evento ainda.</p>';
      return;
    }

    photos.forEach((photo) => {
      const thumb = document.createElement('div');
      thumb.className = 'admin-thumb-card';
      thumb.innerHTML = `
        <img src="${photo.imageUrl}" alt="Foto Admin">
        <button class="admin-thumb-delete" title="Excluir Foto" aria-label="Excluir Foto">
          <span class="material-symbols-outlined">delete</span>
        </button>
      `;

      const deleteBtn = thumb.querySelector('.admin-thumb-delete');
      deleteBtn.addEventListener('click', async () => {
        if (confirm('Tem certeza que deseja excluir esta foto do mural?')) {
          await deletePhoto(photo);
          showToast('Foto excluída com sucesso.', 'info');
          renderAdminPhotos();
        }
      });

      adminPhotoGrid.appendChild(thumb);
    });
  }

  // Download de Fotos em Lote (ZIP)
  if (downloadZipBtn) {
    downloadZipBtn.addEventListener('click', async () => {
      const photos = getMuralPhotosCallback() || [];
      if (photos.length === 0) {
        alert('Não há fotos disponíveis para download.');
        return;
      }

      if (typeof window.JSZip === 'undefined') {
        alert('Biblioteca JSZip carregando, tente novamente em alguns segundos.');
        return;
      }

      downloadZipBtn.disabled = true;
      downloadZipBtn.innerHTML = '<span class="material-symbols-outlined spin">progress_activity</span> Gerando ZIP...';

      try {
        const zip = new window.JSZip();
        const imgFolder = zip.folder('polaroids_iuri_e_renata');

        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const authorSanitized = (photo.author || 'Convidado').replace(/[^a-z0-9]/gi, '_');
          const fileName = `polaroid_${i + 1}_${authorSanitized}.jpg`;

          if (photo.imageUrl.startsWith('data:image')) {
            // Imagem em formato Base64
            const base64Data = photo.imageUrl.split(',')[1];
            imgFolder.file(fileName, base64Data, { base64: true });
          } else {
            // Imagem armazenada via URL externa (Firebase Storage)
            try {
              const response = await fetch(photo.imageUrl);
              const blob = await response.blob();
              imgFolder.file(fileName, blob);
            } catch (err) {
              console.warn(`Erro ao baixar imagem ${photo.imageUrl}:`, err);
            }
          }
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const downloadUrl = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Fotos_Polaroid_Iuri_e_Renata.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Download do arquivo ZIP iniciado!', 'info');
      } catch (error) {
        console.error('Erro ao gerar arquivo ZIP:', error);
        alert('Ocorreu um erro ao gerar o arquivo ZIP com as fotos.');
      } finally {
        downloadZipBtn.disabled = false;
        downloadZipBtn.innerHTML = '<span class="material-symbols-outlined">download_for_offline</span> Baixar Fotos (ZIP)';
      }
    });
  }
}
