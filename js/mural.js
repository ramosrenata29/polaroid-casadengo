/**
 * Módulo do Mural de Fotos
 * Renderiza o feed acumulativo de fotos em formato Polaroid com leve rotação artesanal.
 */

import { subscribeToMural } from './db.js';

export function initMural(gridElement, refreshBtnElement) {
  let currentPhotos = [];

  function renderPhotos(photos) {
    currentPhotos = photos;
    gridElement.innerHTML = '';

    if (!photos || photos.length === 0) {
      gridElement.innerHTML = `
        <div class="mural-empty">
          <span class="material-symbols-outlined placeholder-icon">photo_library</span>
          <p>Nenhuma foto no mural ainda.</p>
          <p>Seja o primeiro a registrar esse momento especial!</p>
        </div>
      `;
      return;
    }

    photos.forEach((photo, index) => {
      const card = createPolaroidCard(photo, index);
      gridElement.appendChild(card);
    });
  }

  // Iniciar escuta do banco
  subscribeToMural((photos) => {
    renderPhotos(photos);
  });

  if (refreshBtnElement) {
    refreshBtnElement.addEventListener('click', () => {
      subscribeToMural((photos) => {
        renderPhotos(photos);
      });
    });
  }

  return {
    getPhotos: () => currentPhotos,
    refresh: () => {
      subscribeToMural((photos) => {
        renderPhotos(photos);
      });
    }
  };
}

function createPolaroidCard(photo, index) {
  const card = document.createElement('div');
  const filterClass = photo.filter || 'filter-normal';
  card.className = `polaroid-frame ${filterClass}`;

  // Pequena rotação orgânica aleatória estilo foto física em mesa (-1.5deg a +1.5deg)
  const rotationDegrees = ((index % 5) - 2) * 0.8;
  card.style.transform = `rotate(${rotationDegrees}deg)`;

  const dateStr = photo.timestamp
    ? new Date(photo.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
    : '10/10/26';

  const fontClass = photo.font || 'font-playfair';

  card.innerHTML = `
    <div class="polaroid-photo-wrapper">
      <img src="${photo.imageUrl}" alt="Foto Polaroid do Casamento" loading="lazy">
    </div>
    <div class="polaroid-chin">
      <div class="polaroid-title font-playfair">${photo.title || 'Iuri & Renata - 10.10.26'}</div>
      <div class="polaroid-caption ${fontClass}">${escapeHtml(photo.caption || '')}</div>
      <div class="polaroid-footer-meta">
        <span class="polaroid-author">${escapeHtml(photo.author || 'Convidado')}</span>
        <span class="polaroid-date">${dateStr}</span>
      </div>
    </div>
  `;

  return card;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
