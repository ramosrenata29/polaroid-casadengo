/**
 * Módulo de Persistência e Sincronização de Dados (Mural & Fotos)
 * Abstrai Firebase DB/Storage e fornece Fallback em LocalStorage quando não configurado/offline.
 */

import {
  db,
  storage,
  isConfigured,
  dbRef,
  push,
  set,
  onValue,
  remove,
  get,
  storageRef,
  uploadString,
  getDownloadURL,
  deleteObject
} from './firebase-config.js';

const LOCAL_STORAGE_PHOTOS_KEY = 'polaroid_casal_photos';

/**
 * Salva uma nova foto no mural (Firebase ou LocalStorage)
 * @param {Object} photoData { imageDataUrl, caption, author, filter, font, timestamp }
 */
export async function savePhoto(photoData) {
  const photoId = 'photo_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const timestamp = photoData.timestamp || Date.now();

  const record = {
    id: photoId,
    title: "Iuri & Renata - 10.10.26",
    caption: photoData.caption || "",
    author: photoData.author || "Convidado",
    filter: photoData.filter || "filter-normal",
    font: photoData.font || "font-playfair",
    timestamp: timestamp,
    imageUrl: photoData.imageDataUrl // Padrão se não enviado pro storage
  };

  if (isConfigured && window.navigator.onLine) {
    try {
      // 1. Upload da imagem Base64 para o Firebase Storage
      const imgPath = `photos/${photoId}.jpg`;
      const fileRef = storageRef(storage, imgPath);
      await uploadString(fileRef, photoData.imageDataUrl, 'data_url');
      const downloadURL = await getDownloadURL(fileRef);

      record.imageUrl = downloadURL;
      record.storagePath = imgPath;

      // 2. Salvar metadados no Firebase Realtime Database
      const newPhotoRef = push(dbRef(db, 'photos'));
      record.id = newPhotoRef.key;
      await set(newPhotoRef, record);

      return { success: true, record, storage: 'firebase' };
    } catch (err) {
      console.warn("Falha ao salvar no Firebase, utilizando backup local:", err);
      // Fallback local se o upload online falhar
      saveToLocalStorage(record);
      return { success: true, record, storage: 'local_fallback', offline: true };
    }
  } else {
    // Modo offline ou sem credenciais Firebase ativas
    saveToLocalStorage(record);
    return { success: true, record, storage: 'local', offline: true };
  }
}

/**
 * Escuta atualizações no mural de fotos
 * @param {Function} callback Recebe a lista de fotos ordenada por data decrescente
 */
export function subscribeToMural(callback) {
  if (isConfigured && window.navigator.onLine) {
    const photosQuery = dbRef(db, 'photos');
    onValue(photosQuery, (snapshot) => {
      const data = snapshot.val();
      const photosList = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          photosList.push({ ...data[key], id: key });
        });
      }

      // Mescla fotos locais pendentes
      const localPhotos = getFromLocalStorage();
      const combined = mergePhotos(photosList, localPhotos);
      combined.sort((a, b) => b.timestamp - a.timestamp);
      callback(combined);
    }, (error) => {
      console.warn("Erro ao ler do Realtime Database:", error);
      callback(getSortedLocalPhotos());
    });
  } else {
    // Notifica usando armazenamento local
    callback(getSortedLocalPhotos());
  }
}

/**
 * Deleta uma foto pelo ID (e limpa do Storage se aplicável)
 */
export async function deletePhoto(photo) {
  if (isConfigured && window.navigator.onLine && photo.id) {
    try {
      // Deleta da Database
      await remove(dbRef(db, `photos/${photo.id}`));

      // Deleta do Storage se tiver o caminho salvo
      if (photo.storagePath) {
        const fileRef = storageRef(storage, photo.storagePath);
        await deleteObject(fileRef).catch(e => console.warn("Erro limpando storage:", e));
      }
    } catch (err) {
      console.error("Erro ao deletar do Firebase:", err);
    }
  }

  // Deleta do LocalStorage
  deleteFromLocalStorage(photo.id);
}

// Auxiliares LocalStorage
function saveToLocalStorage(record) {
  const list = getFromLocalStorage();
  list.unshift(record);
  localStorage.setItem(LOCAL_STORAGE_PHOTOS_KEY, JSON.stringify(list));
}

function getFromLocalStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PHOTOS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function deleteFromLocalStorage(id) {
  const list = getFromLocalStorage().filter(p => p.id !== id);
  localStorage.setItem(LOCAL_STORAGE_PHOTOS_KEY, JSON.stringify(list));
}

function getSortedLocalPhotos() {
  const list = getFromLocalStorage();
  return list.sort((a, b) => b.timestamp - a.timestamp);
}

function mergePhotos(remote, local) {
  const map = new Map();
  remote.forEach(p => map.set(p.id, p));
  local.forEach(p => map.set(p.id, p));
  return Array.from(map.values());
}
