# RosaGuia — Outubro Rosa

Aplicativo educativo para atividade extensionista. Interface estática hospedável no GitHub Pages e registro opcional no Google Sheets via Apps Script.

## Arquivos
- `index.html`: interface, questionário, prioridade de encaminhamento, perfil educativo qualitativo de fatores associados e recomendações.
- `Code.gs`: endpoint de gravação no Google Sheets.

## Duas saídas do aplicativo
1. **Prioridade de encaminhamento**: orientação prática baseada em sinais de alerta e critérios para avaliação profissional; sintomas atuais recebem orientação para avaliação clínica, não uma pontuação de risco.
2. **Perfil educativo de fatores associados**: lista qualitativa de faixa etária, histórico pessoal/familiar, hábitos e situação da mamografia. Não soma fatores nem estima probabilidade individual.

## Atenção científica
A aplicação apresenta duas saídas separadas: (1) prioridade de encaminhamento baseada em sintomas, histórico pessoal/familiar e situação de rastreamento; (2) perfil educativo qualitativo de fatores associados, sem pontuação ou estimativa de probabilidade individual. Não é ferramenta clínica validada e não deve ser usada para diagnóstico, triagem clínica automatizada ou decisão terapêutica. Validar conteúdo com profissionais responsáveis antes de uso público.

## Configurar Google Sheets
1. Crie uma planilha nova e copie o ID da URL entre `/d/` e `/edit`.
2. Abra Extensões → Apps Script e cole `Code.gs`.
3. Substitua `COLE_AQUI_O_ID_DA_PLANILHA` pelo ID.
4. Execute `prepararPlanilha` no editor e autorize o acesso.
5. Implantar → Nova implantação → Aplicativo da Web. Escolha executar como sua conta. Defina quem pode acessar conforme as regras institucionais; acesso público permite que qualquer pessoa com o URL tente enviar dados.
6. Copie a URL terminada em `/exec`.
7. Em `index.html`, substitua `COLE_AQUI_A_URL_DO_WEB_APP` pela URL.
8. Teste com dados fictícios e confira a planilha antes do evento.

## Publicar no GitHub Pages
1. Crie um repositório público chamado `rosaguia-outubro-rosa`.
2. Envie `index.html` para a raiz do repositório.
3. Vá a Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
4. Aguarde a URL de Pages e teste em celular e computador.

## Privacidade e governança
- Não pedir nome, CPF, telefone, e-mail, endereço ou data de nascimento.
- Respostas sobre saúde continuam sendo dados pessoais sensíveis mesmo sem nome; um código aleatório não garante anonimização completa.
- Obtenha consentimento informado, restrinja acesso à planilha, defina prazo de retenção e exclusão e obtenha autorização institucional/ética quando aplicável.
- Não publique a planilha nem compartilhe seu link com participantes.
- O modo `no-cors` não permite ao navegador confirmar que o registro foi gravado. Verifique os registros na planilha durante o teste.
- Não usar dados reais até a revisão do responsável institucional pela privacidade e segurança.

## Referências
- INCA — versão para população: https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama/versao-para-populacao
- INCA — fatores de risco: https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/fatores-de-risco
- Ministério da Saúde: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/cancer-de-mama/cancer-de-mama/
