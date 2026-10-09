/**
 * RosaGuia — endpoint para registrar resultados educativos no Google Sheets.
 * Não armazene nome, CPF, telefone, e-mail ou outros identificadores.
 * Publique como Web App e configure acesso de acordo com a política institucional.
 */
const SPREADSHEET_ID = "COLE_AQUI_O_ID_DA_PLANILHA";
const SHEET_NAME = "Respostas";

const HEADERS = [
  "data_hora_servidor","codigo_anonimo","faixa_etaria","idade_codigo",
  "historico_pessoal","historico_familiar_mama","historico_familiar_ovario_ou_mama_homem",
  "sintomas_atuais","mamografia","alcool","atividade_fisica",
  "prioridade_encaminhamento","recomendacao","perfil_fatores_associados","proximos_passos","consentimento"
];

function doGet() {
  return ContentService.createTextOutput("RosaGuia endpoint ativo. Envie os dados por POST.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ok:false, error:"Corpo da requisição ausente."});
    }
    const p = JSON.parse(e.postData.contents);

    // Validação mínima e lista permitida de campos.
    if (p.consent !== true) return json_({ok:false,error:"Consentimento ausente."});
    if (!p.id || !/^RG-[a-z0-9]+-[A-Z0-9]+$/i.test(String(p.id))) {
      return json_({ok:false,error:"Código anônimo inválido."});
    }
    const allowed = {
      age:["lt40","40_49","50_74","gt74"],
      personal:["yes","no","unknown"],
      familyBreast:["none","older","young","multiple","unknown"],
      familyOther:["yes","no","unknown"],
      symptoms:["yes","no","unsure"],
      mammo:["recent","old","never","na"],
      alcohol:["yes","no","prefer"],
      activity:["yes","no","prefer"]
    };
    Object.keys(allowed).forEach(k => {
      if (!allowed[k].includes(String(p[k] || ""))) throw new Error("Valor inválido: " + k);
    });
    if (!p.referralPriority || !p.recommendation) throw new Error("Orientação ausente.");

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) sh = ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
    }

    // Sanitiza texto para impedir injeção de fórmulas na planilha.
    const safe = v => {
      const s = String(v == null ? "" : v).slice(0, 1500);
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };
    const row = [
      new Date(), safe(p.id), safe(p.ageBand), safe(p.age),
      safe(p.personal), safe(p.familyBreast), safe(p.familyOther),
      safe(p.symptoms), safe(p.mammo), safe(p.alcohol), safe(p.activity),
      safe(p.referralPriority), safe(p.recommendation), safe(p.associatedFactors), safe(p.nextSteps), "sim"
    ];
    sh.appendRow(row);
    return json_({ok:true});
  } catch (err) {
    console.error(err);
    return json_({ok:false,error:"Não foi possível registrar o resultado."});
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Execute manualmente uma única vez no editor para preparar a planilha. */
function prepararPlanilha() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
}