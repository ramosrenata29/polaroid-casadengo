/**
 * Módulo de Sincronização e Conectividade Offline
 * Monitora status da rede e tenta re-sincronizar envios em background.
 */

import { showToast } from './app.js';

export function initOfflineSync(onReconnected) {
  window.addEventListener('online', () => {
    showToast('Conexão restabelecida! Sincronizando fotos...', 'info');
    if (onReconnected) onReconnected();
  });

  window.addEventListener('offline', () => {
    showToast('Você está offline. Fotos serão salvas localmente e enviadas assim que a rede voltar.', 'warning');
  });
}
