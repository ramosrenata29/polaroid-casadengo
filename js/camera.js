/**
 * Módulo da Câmera
 * Gerencia acesso via getUserMedia, troca de câmeras e fallback para upload de arquivos.
 */

let currentStream = null;
let currentFacingMode = 'environment'; // Padrão: Câmera traseira do celular

export function initCameraControls(elements, onPhotoCaptured) {
  const {
    videoEl,
    canvasEl,
    placeholderEl,
    shutterBtn,
    switchCameraBtn,
    fileInput,
    fileInputAlt
  } = elements;

  // Iniciar tentativa de inicialização da Câmera Nativa no Viewfinder
  startCamera();

  async function startCamera() {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        currentStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: currentFacingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });

        videoEl.srcObject = currentStream;
        videoEl.classList.remove('hidden');
        placeholderEl.classList.add('hidden');
        shutterBtn.classList.remove('hidden');

        // Mostrar botão de alternar câmera se o navegador/dispositivo indicar suporte
        if (switchCameraBtn) {
          switchCameraBtn.classList.remove('hidden');
        }
      } catch (err) {
        console.warn("Câmera não permitida ou indisponível:", err);
        showCameraFallback();
      }
    } else {
      showCameraFallback();
    }
  }

  function showCameraFallback() {
    videoEl.classList.add('hidden');
    placeholderEl.classList.remove('hidden');
    shutterBtn.classList.add('hidden');
    if (switchCameraBtn) switchCameraBtn.classList.add('hidden');
  }

  // Alternar entre câmera frontal e traseira
  if (switchCameraBtn) {
    switchCameraBtn.addEventListener('click', () => {
      currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
      startCamera();
    });
  }

  // Disparo do Obturador (Tirar Foto)
  if (shutterBtn) {
    shutterBtn.addEventListener('click', () => {
      if (!videoEl || videoEl.classList.contains('hidden')) return;

      const width = videoEl.videoWidth || 1200;
      const height = videoEl.videoHeight || 1200;

      // Corte/Ajuste para quadrado ou proporção ideal
      const minDim = Math.min(width, height);
      canvasEl.width = minDim;
      canvasEl.height = minDim;

      const ctx = canvasEl.getContext('2d');
      const startX = (width - minDim) / 2;
      const startY = (height - minDim) / 2;

      ctx.drawImage(videoEl, startX, startY, minDim, minDim, 0, 0, minDim, minDim);

      // Redimensiona e comprime foto para ~1200px / JPEG qualidade 0.8
      const compressedDataUrl = compressCanvas(canvasEl, 1200, 0.8);
      onPhotoCaptured(compressedDataUrl);
    });
  }

  // Fallback / Leitura de Arquivo
  const handleFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const tempCanvas = document.createElement('canvas');
        const minDim = Math.min(img.width, img.height);
        tempCanvas.width = minDim;
        tempCanvas.height = minDim;

        const ctx = tempCanvas.getContext('2d');
        const startX = (img.width - minDim) / 2;
        const startY = (img.height - minDim) / 2;

        ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, minDim, minDim);

        const compressedDataUrl = compressCanvas(tempCanvas, 1200, 0.8);
        onPhotoCaptured(compressedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  if (fileInput) fileInput.addEventListener('change', handleFileSelect);
  if (fileInputAlt) fileInputAlt.addEventListener('change', handleFileSelect);

  return {
    stopCamera: () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    },
    restartCamera: startCamera
  };
}

/**
 * Redimensiona a imagem do canvas para no máximo maxDimension px e exporta em JPEG qualidade 0.8
 */
function compressCanvas(sourceCanvas, maxDimension = 1200, quality = 0.8) {
  let width = sourceCanvas.width;
  let height = sourceCanvas.height;

  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      height = Math.round((height * maxDimension) / width);
      width = maxDimension;
    } else {
      width = Math.round((width * maxDimension) / height);
      height = maxDimension;
    }
  }

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;

  const ctx = outputCanvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, 0, 0, width, height);

  return outputCanvas.toDataURL('image/jpeg', quality);
}
