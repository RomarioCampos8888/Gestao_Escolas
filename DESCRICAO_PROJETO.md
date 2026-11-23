# Descrição completa do projeto Merenda Fácil

## Resumo executivo

O **Merenda Fácil** é uma aplicação de gestão de merenda escolar destinada a acompanhar o estoque de alimentos, movimentações de entrada e saída, validade, previsões de consumo e compra, além do planejamento de cardápios.

O produto permite alternar entre escolas cadastradas e visualizar os dados de cada unidade separadamente. O principal objetivo apresentado pelo sistema é informar rapidamente quantos dias de alimentação permanecem disponíveis.

Slogan atual:

> “Merenda Fácil — Saiba em segundos quantos dias de alimentação sua escola ainda possui.”

O projeto é uma aplicação web responsiva empacotada com **Ionic Capacitor 8** para Android e iOS. Não existe backend nesta versão: todos os dados são persistidos no navegador/dispositivo por meio de `localStorage`.

## Estado atual

- Aplicação funcional em navegador por meio de `index.html`.
- Aplicação PWA instalável com manifest, Service Worker e ícones 192/512 px.
- Backup completo em JSON e restauração controlada na tela de Cadastros.
- Interface responsiva para desktop e mobile.
- Dados fictícios de demonstração para duas escolas.
- Cadastro e seleção de escolas.
- Cadastro de categorias e alimentos.
- Controle de entradas e saídas com atualização automática do saldo.
- Painel com alertas, dias restantes e consumo recente.
- Previsão de compras do próximo mês.
- Relatórios e exportação CSV.
- Planejamento de preparações e cardápios escolares.
- Projetos nativos Android e iOS configurados.
- Build web copiável para a pasta `www/`.
- Código da branch atual: `feat/mobile-capacitor-appflow`.
- Área de trabalho encontrada limpa no momento da descrição, sem alterações pendentes.
- Login Google foi removido da implementação atual.
- Não há autenticação real, sincronização em nuvem ou API neste estado.

## Público e propósito

O sistema é voltado para gestores e responsáveis pela alimentação escolar. Os principais problemas atendidos são:

- saber a quantidade disponível de cada alimento;
- perceber faltas ou estoques baixos;
- acompanhar validade;
- estimar o consumo diário com base no número de alunos;
- calcular quanto precisa ser comprado no próximo mês;
- registrar entradas e saídas;
- planejar preparações e refeições por data e turno;
- estimar o impacto do cardápio no estoque.

## Arquitetura técnica

### Tecnologias

- HTML5.
- CSS responsivo.
- JavaScript puro, sem frameworks frontend.
- `localStorage` para persistência.
- Capacitor 8.
- Capacitor Android.
- Capacitor iOS.
- Node.js 22 ou superior para build e integrações Capacitor.
- Gradle para Android.
- Xcode para geração nativa iOS.

### Estrutura principal

- `index.html`: estrutura da interface, navegação desktop/mobile e áreas externas para modais e notificações.
- `styles.css`: toda a identidade visual e responsividade.
- `app.js`: dados, estado, cálculos, renderização, formulários, persistência e eventos.
- `package.json`: scripts de build e dependências Capacitor.
- `scripts/build.mjs`: copia os três arquivos web para `www/`.
- `capacitor.config.json`: configuração do app Capacitor.
- `www/`: saída web usada pelo Capacitor e ignorada pelo Git.
- `manifest.json`: metadados da PWA instalável.
- `service-worker.js`: cache offline com estratégia Cache First.
- `icons/icon-192.png` e `icons/icon-512.png`: ícones PWA.
- `android/`: projeto Android nativo.
- `ios/`: projeto iOS nativo.
- `README.md`: instruções operacionais do projeto.
- `.nvmrc`: define Node.js 22.

### Modelo de funcionamento

A interface é uma SPA controlada por JavaScript. A página ativa fica na variável `activePage`. O conteúdo é regenerado por funções `render*()` e escrito em `#page-content`.

Não há componentes de frameworks nem roteador. A navegação usa atributos `data-page` e delegação de eventos. Os formulários são exibidos em modais gerados dinamicamente.

## Persistência e dados

A chave usada no `localStorage` é:

```text
merenda-facil-data-v1
```

O objeto principal contém:

- `schools`: escolas cadastradas.
- `categories`: categorias de alimentos.
- `products`: alimentos e estoque.
- `movements`: entradas e saídas.
- `preparations`: preparações/receitas.
- `menuPlans`: refeições planejadas.
- `selectedSchoolId`: escola atualmente selecionada.

Os dados são carregados na inicialização. Um normalizador valida o formato salvo, remove registros inválidos, aplica valores padrão e migra dados incompletos. Se o conteúdo estiver malformado ou não puder ser lido, o sistema volta aos dados fictícios.

### Dados fictícios

A versão inicial possui:

- Escola Municipal Sol Nascente, com 320 alunos.
- EMEF Estrela do Amanhã, com 185 alunos.
- Categorias de Grãos, Carnes, Hortifrúti, Laticínios, Bebidas e Congelados.
- Exemplos de arroz, feijão, frango, leite, cenoura, macarrão, banana e óleo.
- Movimentações iniciais de demonstração.
- Preparações e planejamentos vazios inicialmente.

### Limitações importantes

- Os dados não são sincronizados entre dispositivos.
- Não existe isolamento por usuário ou conta real.
- Não existe backend, banco de dados remoto ou API.
- O `localStorage` pode ser apagado pelo navegador ou pelo usuário.
- A exclusão ou limpeza de dados do navegador afeta o estado do app.
- O app não envia ou recebe dados entre usuários.

## Escolas

Cada escola possui:

- ID;
- nome;
- cidade;
- estado;
- número de alunos;
- quantidade de dias letivos por mês;
- nome do responsável.

A escola selecionada determina:

- alimentos exibidos;
- cálculos de consumo;
- previsões de compra;
- alertas;
- preparações;
- planejamentos do cardápio;
- responsável exibido no cabeçalho.

O fluxo permite adicionar ou editar escolas e selecionar outra unidade no cabeçalho ou na tela de cadastros.

## Alimentos

Cada alimento possui:

- nome;
- categoria;
- unidade;
- estoque mínimo;
- consumo médio por aluno por dia;
- validade;
- fornecedor;
- escola vinculada;
- estoque atual;
- preço unitário;
- data de criação, quando cadastrada.

Unidades disponíveis:

- Kg;
- Litro;
- Unidade;
- Pacote.

Para o cardápio, o sistema também aceita ingredientes em `g` e `mL`, convertendo-os para `Kg` e `Litro` respectivamente.

## Movimentações

Existem dois tipos de movimentação:

- Entrada: soma quantidade ao estoque e pode atualizar o preço unitário.
- Saída: subtrai quantidade do estoque, após validar saldo suficiente.

Uma movimentação registra:

- data;
- alimento;
- quantidade;
- tipo;
- motivo;
- fornecedor;
- preço unitário, quando aplicável;
- observação.

Ao excluir uma movimentação, o app desfaz seu efeito no estoque:

- entrada excluída reduz o estoque;
- saída excluída devolve a quantidade ao estoque.

A tela de movimentações permite filtrar por tipo, alimento e intervalo de datas. Os registros são organizados por data, do mais recente para o mais antigo.

## Cálculos principais

### Consumo diário

```text
consumo diário = consumo por aluno por dia × número de alunos da escola
```

### Dias de estoque restantes

```text
dias restantes = estoque atual ÷ consumo diário
```

Se o alimento não tiver consumo informado, a cobertura pode ser exibida como indefinida.

### Dias disponíveis da escola

O painel calcula o menor número de dias restantes entre todos os alimentos que possuem consumo informado.

A situação geral é:

- crítico: menos de 7 dias;
- atenção: até 30 dias;
- estável: mais de 30 dias.

### Previsão de compra mensal

```text
consumo previsto = consumo diário × dias letivos da escola
necessidade = consumo previsto - estoque disponível
compra = maior valor entre zero e necessidade
```

### Consumo dos últimos 30 dias

No painel, o consumo realizado considera apenas movimentações do tipo saída dentro dos últimos 30 dias. Essa quantidade é comparada com a previsão mensal calculada para cada alimento.

## Alertas e status

Um alimento pode apresentar:

- vencido;
- validade em até 30 dias;
- estoque abaixo do mínimo;
- menos de 7 dias de cobertura;
- sem movimentação por mais de 60 dias;
- crítico;
- atenção;
- seguro.

Regras usadas:

- validade vencida gera situação crítica;
- estoque abaixo do mínimo gera situação crítica;
- cobertura abaixo de 7 dias gera situação crítica;
- cobertura entre 7 e 30 dias gera atenção;
- validade em até 30 dias gera atenção;
- sem movimentação há mais de 60 dias gera aviso.

## Telas implementadas

### Painel

Apresenta:

- situação geral da escola;
- dias de alimentação disponíveis;
- próximo alimento a acabar;
- quantidade de itens;
- movimentações do dia;
- refeições previstas no mês;
- produtos em atenção;
- consumo dos últimos 30 dias;
- últimas movimentações.

### Alimentos

Permite:

- buscar por nome ou categoria;
- filtrar por categoria;
- cadastrar alimento;
- editar alimento;
- registrar movimentação diretamente pela linha do alimento;
- visualizar estoque, mínimo, dias restantes, validade e status.

### Movimentações

Permite registrar entradas e saídas e consultar o histórico com filtros.

### O Que Comprar?

Calcula a previsão de compra do próximo mês e o investimento estimado com base no preço unitário dos alimentos.

Também permite exportar a lista em CSV.

### Cardápio Escolar

Este módulo permite:

- cadastrar preparações/receitas;
- editar ou desativar preparações;
- informar quantidade de porções;
- vincular ingredientes aos alimentos da escola;
- planejar refeições por data e turno;
- visualizar calendário mensal, semanal ou em lista;
- calcular consumo previsto;
- calcular cobertura e necessidade de compra;
- remover ou editar refeições planejadas.

Os turnos disponíveis são:

- Manhã;
- Tarde;
- Integral.

A proporção de consumo usa:

```text
quantidade do ingrediente na receita × número de alunos ÷ porções da preparação
```

Esse consumo é uma previsão. Planejar ou alterar o cardápio não altera automaticamente o estoque e não cria movimentações.

Conversões suportadas:

- Kg para g;
- g para Kg;
- Litro para mL;
- mL para Litro.

Se uma unidade de ingrediente não for compatível com o alimento, o sistema impede o cadastro da preparação.

O módulo possui quatro seções:

- Planejamento de Cardápio;
- Calendário Alimentar;
- Consumo Previsto;
- Necessidade de Compras.

### Relatórios

Permite consultar:

- produtos vencendo em 7, 15 ou 30 dias;
- produtos críticos;
- consumo diário, semanal e mensal;
- alertas automáticos;
- exportação de estoque;
- exportação de movimentações.

### Cadastros

Permite administrar:

- dados da escola selecionada;
- múltiplas escolas;
- categorias;
- unidades de medida disponíveis;
- quantidade de alimentos por cadastro.

## Exportações

A aplicação gera arquivos CSV localmente pelo navegador. Os arquivos implementados são:

- `estoque-merenda-facil.csv`;
- `compras-proximo-mes.csv`;
- `movimentacoes-merenda-facil.csv`.

Os CSVs usam separador `;`, codificação UTF-8 com BOM e escapam aspas.

## Interface e experiência

- Cores predominantes em verde, branco e cinza.
- Navegação superior em desktop.
- Barra inferior de navegação em mobile.
- Modais para cadastros e movimentações.
- Notificações visualizadas como alertas/toasts temporários.
- Ícones SVG incorporados no próprio JavaScript.
- Fontes externas DM Sans e Manrope carregadas via Google Fonts.
- Tabelas responsivas.
- Estados vazios explícitos.

Há regras CSS responsivas a partir de 1250 px, 1080 px, 900 px, 800 px, 620 px e 680 px, dependendo da área da interface.

## Capacitor e aplicativos nativos

### Identificador atual

```text
br.com.merendafacil.app
```

O identificador é o identificador Android/Capacitor atual. Para publicar em uma conta ou loja diferente, ele precisa ser confirmado antes da distribuição definitiva, pois alterações posteriores podem criar outro aplicativo para o sistema de publicação.

### Android

O projeto contém os recursos nativos Android, incluindo:

- SDK/Gradle configurado;
- ícone provisório;
- tela de abertura provisória;
- configuração de build;
- assets web sincronizados.

O APK de depuração pode ser gerado por:

```bash
npm install
npm run cap:sync:android
cd android
./gradlew assembleDebug
```

Saída esperada:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Pré-requisitos: Android Studio, SDK Platform 36, Build Tools compatíveis e JDK 21.

### iOS

O projeto contém o workspace e os recursos nativos iOS. O build local requer macOS e Xcode.

Comandos disponíveis:

```bash
npm run cap:sync:ios
npm run cap:open:ios
```

### Ionic Appflow

O projeto está preparado para native builds no Ionic Appflow. O Appflow pode executar:

```bash
npm run build
npx cap sync
```

É necessário conectar o repositório Git e configurar certificados para builds iOS ou Android Release.

## Comandos disponíveis

### Executar no navegador

Abrir `index.html` diretamente em navegador moderno ou servir a raiz com um servidor estático.

Exemplo já preparado no workspace:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

### Dependências e build

```bash
npm install
npm run build
```

### Sincronizar com plataformas

```bash
npm run cap:sync
npm run cap:sync:android
npm run cap:sync:ios
```

### Abrir IDEs nativas

```bash
npm run cap:open:android
npm run cap:open:ios
```

## Backup, restauração e PWA

Na tela de Cadastros existe uma área dedicada a **Backup e restauração**.

O backup exporta o objeto completo armazenado na chave `merenda-facil-data-v1` com JSON indentado e nome `merenda-facil-backup-AAAA-MM-DD.json`. A importação usa `FileReader`, valida JSON e exige as coleções mínimas `schools`, `categories`, `products` e `movements`. Antes da substituição, exibe a confirmação: “ATENÇÃO: A importação substituirá todos os dados atuais. Deseja continuar?”.

Após uma importação válida, o conteúdo é normalizado por `normalizeSavedData()`, salvo no `localStorage` e aplicado ao estado global `data`, seguido de atualização automática da interface.

A PWA registra `service-worker.js` no carregamento. O manifest usa nome, nome curto, modo standalone, cores e ícones. O Service Worker mantém os arquivos principais em Cache First e usa uma página inicial em cache como fallback de navegação offline. O `CACHE_NAME` deve ser alterado em novas versões para renovar o cache antigo.

## Próximos pontos naturais de evolução

Para transformar o protótipo em uma solução multiusuário e distribuível em escala, os próximos trabalhos provavelmente incluem:

1. criar backend e API;
2. adicionar banco de dados;
3. implementar autenticação e níveis de acesso;
4. sincronizar dados entre dispositivos;
5. criar isolamento por escola, secretaria ou município;
6. implementar auditoria de alterações;
7. adicionar backup e restauração;
8. implementar atualizações automáticas de estoque com o cardápio, se essa regra for desejada;
9. substituir dados fictícios por fluxo inicial vazio ou onboarding;
10. revisar a atualização automática de consumo descrita em documentação antiga;
11. criar testes unitários e de integração;
12. substituir o ícone e a tela de abertura provisórios;
13. revisar políticas de privacidade e termos;
14. configurar assinatura Android/iOS e publicação nas lojas;
15. adicionar histórico, auditoria e permissões por perfil;
16. melhorar acessibilidade e internacionalização, caso necessário.

## Observações técnicas para futuras alterações

- A lógica principal está concentrada em `app.js`. Alterações em comportamento devem começar por funções próximas à área afetada.
- O estado global é o objeto `data`.
- Sempre persistir alterações com `saveData()`.
- Ao alterar o modelo salvo, atualizar `normalizeSavedData()` para manter compatibilidade com dados antigos.
- Alterações no cardápio podem exigir revisão conjunta de `menuConsumption()`, as funções de renderização e os cálculos da tela de consumo.
- A função `convertIngredientQuantity()` controla compatibilidade de unidades.
- A exclusão de movimentações precisa desfazer o efeito no estoque manualmente.
- Após alterações nos arquivos web, executar `npm run build` e `npx cap sync` antes de compilar os projetos nativos.
- A pasta `www/` é gerada pelo script de build e não deve ser tratada como fonte principal.
- Os arquivos de código existentes são artefatos-fonte principais: `index.html`, `styles.css` e `app.js`.

## Ponto central para qualquer IA continuar o projeto

O Merenda Fácil é um app de gerenciamento local de merenda escolar. Ele usa uma SPA em JavaScript puro, dados em `localStorage`, cálculo baseado no número de alunos e dias letivos, e um módulo de cardápio que projeta consumo sem alterar o estoque.

As principais entidades são `escolas`, `categorias`, `alimentos`, `movimentações`, `preparações` e `planejamentos de refeição`. Qualquer implementação nova deve respeitar a separação desses dados por escola e manter o app sem depender de backend, a menos que uma etapa posterior de arquitetura seja explicitamente solicitada.
