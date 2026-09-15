# App Polaroid de Casamento

## Contexto

Criar uma aplicação SPA com stack HTML, CSS, JS puro, sem build nem npm, para hospedar no GitHub Page.  
A aplicação será um aplicativo para tirar e armazenar fotos de uma festa de casamento.

## Stack Técnica

-   ****Frontend:**** HTML, CSS e JavaScript puro (sem frameworks, sem bundler, sem npm).
-   ****Backend:**** Firebase via CDN (Realtime Database + Storage + Hosting opcional).
-   Realtime Database: metadados das fotos.
-   Firebase Storage: arquivos de imagem.
-   Autenticação anônima para escrita no mural.
-   ****Ícones:**** Google Icons (Material Symbols via CDN).
-   ****Hospedagem:**** GitHub Pages.

## Recursos do App

1.  O aplicativo SPA irá carregar, já na primeira tela, o formato da polaroid. O nome na polaroid deve ser ****"Iuri & Renata - 10.10.26"****. A tela deve conter opções para troca de cores da foto e troca de fontes.
2.  O app deve salvar as fotos em um mural ****acumulativo****, compartilhado entre quem acessar o app (não é necessário real-time; atualização periódica ou por demanda é suficiente).
3.  ****Tirar foto:**** priorizar `getUserMedia` com fallback para `<input type="file" accept="image/*" capture="environment">` (câmera nativa do celular).
4.  ****Compressão:**** redimensionar para ~1200px e exportar JPEG (~0.8) antes do upload, para economizar banda e quota do Storage.
5.  ****Acesso:**** mural público, sem senha, distribuído via QR code no evento.
6.  ****Público:**** ~50 convidados, sem limite de fotos por convidado (volume estimado: 100–150 fotos).
7.  ****Admin do casal:**** tela protegida por senha simples para:

-   Visualizar todas as fotos em miniatura.
-   Excluir fotos indesejadas (conteúdo impróprio).
-   Baixar todas as fotos após o evento (download em lote, idealmente em ZIP).

## UI/UX

1.  Utilize a paleta de cores em tons de `#d08841`  `#fffaef`  `#71a674`  `#ecb147`.
2.  ****Não use emojis****. Utilize Google Icons.
3.  Interface minimalista.
4.  Opção ****modo noturno**** (CSS custom properties para alternar tema).

## Decisões de Arquitetura

-   Mural sem real-time: polling a cada 15–30s ou atualização por demanda.
-   Firebase plano gratuito é suficiente (estimativa: 30–50 MB de storage).
-   Tratamento de falha de rede: manter foto salva localmente (LocalStorage/IndexedDB) e tentar reenvio, pois o Wi-Fi do evento pode ser instável.

## Fora de Escopo

-   Exibição de fotos em TV/telão durante o evento.
-   Sistema de comentários ou curtidas no mural.
-   Limite de fotos por convidado.
