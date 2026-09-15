/**
 * Módulo Editor da Polaroid
 * Gerencia a personalização visual (filtros, fontes, mensagens, autor) da foto antes do envio.
 */

export function initEditorControls(elements, onPublish) {
  const {
    polaroidCard,
    polaroidImg,
    captionInput,
    polaroidCaptionText,
    authorInput,
    polaroidAuthor,
    filterChips,
    fontChips,
    retakeBtn,
    publishBtn,
    onRetake
  } = elements;

  let currentImageDataUrl = '';
  let activeFilter = 'filter-normal';
  let activeFont = 'font-playfair';

  // Atualização em tempo real do autor e mensagem na polaroid
  if (authorInput && polaroidAuthor) {
    authorInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      polaroidAuthor.textContent = val ? val : 'Convidado';
    });
  }

  if (captionInput && polaroidCaptionText) {
    captionInput.addEventListener('input', (e) => {
      polaroidCaptionText.textContent = e.target.value;
    });
  }

  // Alternância de Filtros
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterClass = chip.getAttribute('data-filter');

      // Remover filtros antigos da polaroidCard
      ['filter-normal', 'filter-bw', 'filter-sepia', 'filter-vintage'].forEach(f => {
        polaroidCard.classList.remove(f);
      });

      polaroidCard.classList.add(filterClass);
      activeFilter = filterClass;
    });
  });

  // Alternância de Fontes
  fontChips.forEach(chip => {
    chip.addEventListener('click', () => {
      fontChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const fontClass = chip.getAttribute('data-font');

      // Remover fontes antigas dos elementos de legenda
      ['font-playfair', 'font-dancing', 'font-caveat'].forEach(f => {
        polaroidCaptionText.classList.remove(f);
      });

      polaroidCaptionText.classList.add(fontClass);
      activeFont = fontClass;
    });
  });

  // Ação Refazer Foto
  if (retakeBtn && onRetake) {
    retakeBtn.addEventListener('click', () => {
      onRetake();
    });
  }

  // Ação Publicar Foto
  if (publishBtn) {
    publishBtn.addEventListener('click', async () => {
      if (!currentImageDataUrl) return;

      publishBtn.disabled = true;
      publishBtn.innerText = 'Revelando...';

      const photoPayload = {
        imageDataUrl: currentImageDataUrl,
        caption: captionInput.value.trim(),
        author: authorInput.value.trim() || 'Convidado',
        filter: activeFilter,
        font: activeFont,
        timestamp: Date.now()
      };

      await onPublish(photoPayload);

      publishBtn.disabled = false;
      publishBtn.innerHTML = '<span class="material-symbols-outlined">publish</span> Revelar & Publicar';
    });
  }

  return {
    loadImage: (dataUrl) => {
      currentImageDataUrl = dataUrl;
      polaroidImg.src = dataUrl;
    },
    resetEditor: () => {
      currentImageDataUrl = '';
      if (captionInput) captionInput.value = '';
      if (authorInput) authorInput.value = '';
      if (polaroidCaptionText) polaroidCaptionText.textContent = '';
      if (polaroidAuthor) polaroidAuthor.textContent = 'Convidado';
    }
  };
}
