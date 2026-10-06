# Atividade de Química Biológica — GitHub Pages + Google Sheets

## Arquitetura

- `index.html`: aplicativo que os alunos acessam pelo GitHub Pages.
- `Code.gs`: backend Google Apps Script.
- Google Sheets: armazenamento dos resultados.

O Canva deixa de ser responsável pelo armazenamento dos resultados.

## 1. Criar a planilha

Crie uma planilha no Google Sheets.

Copie o ID da URL:

`https://docs.google.com/spreadsheets/d/ESTE_E_O_ID/edit`

Abra `Code.gs` e substitua:

`COLE_AQUI_O_ID_DA_PLANILHA`

pelo ID real.

Não coloque a URL inteira, somente o ID.

## 2. Criar o Apps Script

Acesse:

https://script.google.com/

Crie um novo projeto.

Apague o código existente e cole o conteúdo de `Code.gs`.

Salve.

## 3. Implantar como Web App

No Apps Script:

Deploy → New deployment → Web app

Configuração recomendada:

- Execute as: Me
- Who has access: Anyone

Faça a implantação e copie a URL que termina em:

`/exec`

IMPORTANTE: use a URL `/exec`, não a URL `/dev`.

Cole essa URL em `index.html`:

`const GOOGLE_SCRIPT_URL = "SUA_URL/exec";`

O Apps Script precisa ser implantado como web app para receber `doPost`.

## 4. Testar o backend

Abra a URL `/exec` no navegador.

Deve aparecer um JSON semelhante a:

`{"ok":true,"service":"Química Biológica — coleta de resultados",...}`

Depois abra o aplicativo.

## 5. Publicar no GitHub Pages

Crie um repositório.

Envie `index.html`.

Em Settings → Pages:

- Source: Deploy from a branch
- Branch: main
- Folder: /root

O GitHub Pages publica arquivos estáticos diretamente do repositório.

## 6. Como os dados são guardados

Há duas abas:

### Resultados

Uma linha por dupla.

A linha é criada/atualizada com:

- nomes;
- status;
- tentativas de localização;
- resposta de cada questão;
- correto/incorreto;
- tempo de cada questão;
- número de acertos;
- erros;
- tempo total;
- score.

### Eventos

Registra cada evento individual:

- início;
- localização correta;
- localização incorreta;
- resposta;
- abertura de questão.

Isso permite verificar o que aconteceu mesmo quando uma dupla não termina.

## 7. Score

A classificação prioriza:

1. maior número de acertos;
2. menor tempo total.

Fórmula usada:

`score = (acertos × 100000) − tempo_total_em_segundos`

Assim, o tempo diferencia duplas com o mesmo número de acertos, mas nunca permite que uma dupla com menos acertos ultrapasse outra com mais acertos.

Exemplo:

6 acertos em 120 s:
`599880`

6 acertos em 240 s:
`599760`

5 acertos em 60 s:
`499940`

Portanto:

6 acertos sempre ficam acima de 5 acertos.

## 8. Salvamento

O aplicativo salva o estado no `localStorage` do navegador.

Além disso, cada evento é enviado ao Google Apps Script.

Se a internet cair:

- o progresso local permanece;
- o aplicativo continua funcionando;
- novos dados ficam preservados localmente.

Quando houver conexão novamente, os próximos envios são realizados.

## IMPORTANTE

O aplicativo não coleta matrícula, e-mail ou outros dados pessoais. Somente os dois nomes informados pela dupla.

Não coloque informações pessoais no código do GitHub.
