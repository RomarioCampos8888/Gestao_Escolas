# Merenda Fácil

Aplicação web simples para ajudar escolas a acompanhar o estoque da merenda, os dias de alimentação disponíveis, os alertas de validade e as compras do próximo mês.

## Executar no navegador

Abra `index.html` em um navegador moderno. Não é necessário instalar dependências nem configurar um servidor. O sistema vem com duas escolas e dados de demonstração; use o seletor no topo para alternar entre elas.

Os cadastros e as movimentações ficam salvos no armazenamento local do navegador. Entradas e saídas atualizam o estoque na hora. Ao abrir o sistema em uma nova data, o consumo diário estimado é baixado automaticamente para cada alimento, usando o número de alunos e o consumo médio por aluno.

## App Android e iOS com Capacitor

O projeto está configurado com Capacitor 8 e contém os projetos nativos `android/` e `ios/`. O identificador nativo inicial é `br.com.merendafacil.app`; escolha e confirme o identificador definitivo antes de publicar nas lojas, pois alterá-lo depois cria outro aplicativo.

Pré-requisitos para desenvolvimento local:

- Node.js 22 ou superior.
- Android: Android Studio, Android SDK e JDK compatível com a versão do Gradle do projeto.
- iOS: macOS com Xcode instalado.

Comandos usuais:

```bash
npm install
npm run build
npx cap sync
npx cap open android
npx cap open ios
```

O comando `build` copia os arquivos web necessários para `www/`. A saída é gerada localmente e não precisa ser versionada. `cap sync` copia essa saída para os projetos nativos e os atualiza; execute-o após alterações no app antes de compilar localmente.

## Ionic Appflow

O projeto está preparado para os [native builds do Appflow para Capacitor](https://ionic.io/docs/appflow/package/builds). Para conectar e compilar:

1. Envie a branch deste projeto ao seu Git remoto e importe o repositório no Appflow como um app **Capacitor**, conectado ao Git provider.
2. No Appflow, selecione a branch e o commit enviado. Os builds Capacitor do Appflow instalam dependências, executam `npm run build` e `npx cap sync` para a plataforma selecionada.
3. Gere um build Android de depuração para validação. Para distribuir Android Release ou criar builds iOS, configure os certificados de assinatura correspondentes no Appflow.

Não é necessário um arquivo `appflow.yaml` para este fluxo de native builds: o Appflow detecta o runtime Capacitor e usa os scripts do `package.json`. O Appflow gera os binários na nuvem; a validação de compilação local de iOS requer um Mac com Xcode.

## Nome da conta Google

Para mostrar no cabeçalho o nome da conta Google conectada:

1. Crie um OAuth Client ID do tipo **Aplicativo da Web** no Google Cloud Console e configure as origens JavaScript autorizadas para o endereço em que a aplicação será aberta (por exemplo, `http://localhost:8000`).
2. No `index.html`, substitua o valor de `google-signin-client_id` pelo Client ID público terminado em `.apps.googleusercontent.com`.
3. Abra ou atualize a aplicação e use **Conectar Google**.

O nome e o e-mail do perfil conectado são usados apenas para exibição nesta sessão do navegador. A aplicação não guarda o token de identidade e não tem um backend que valide login ou proteja os dados; o seletor Google, sozinho, não deve ser usado como mecanismo de controle de acesso.

O Google Identity Services configurado acima é o fluxo web. Para oferecer login Google dentro do app Capacitor nativo, é necessário configurar credenciais OAuth para Android e iOS e integrar um fluxo de autenticação nativa; esse passo depende das credenciais e configurações da conta Google do projeto.

## Cálculos

- **Consumo diário por alimento:** alunos da escola × consumo por aluno/dia.
- **Dias de merenda disponíveis:** menor número de dias restantes entre os alimentos com consumo informado, destacando o item que pode limitar o cardápio.
- **Previsão de compras:** consumo diário × dias letivos do próximo mês; do total previsto é subtraído o estoque disponível.
- **Alertas:** estoque abaixo do mínimo, validade vencida ou em até 30 dias, menos de 7 dias de estoque e ausência de movimentação por mais de 60 dias.

O slogan do produto é: “Merenda Fácil — Saiba em segundos quantos dias de alimentação sua escola ainda possui.”
