const validResponse = {
  state: 'SP',
  cities: [
    'EMBU',
    'VÁRZEA PAULISTA',
    'VARGEM GRANDE PAULISTA',
    'VARGEM',
    'TUIUTI',
    'TABOÃO DA SERRA',
    'SUZANO',
    'SÃO ROQUE',
    'SÃO PAULO',
    'SÃO LOURENÇO DA SERRA',
    'SÃO CAETANO DO SUL',
    'SÃO BERNARDO DO CAMPO',
    'SANTO ANDRÉ',
    'SANTANA DE PARNAÍBA',
    'SANTA ISABEL',
    'SALTO',
    'SALESÓPOLIS',
    'RIO GRANDE DA SERRA',
    'RIBEIRÃO PIRES',
    'POÁ',
    'PIRAPORA DO BOM JESUS',
    'PIRACAIA',
    'PINHALZINHO',
    'PEDRA BELA',
    'OSASCO',
    'NAZARÉ PAULISTA',
    'MORUNGABA',
    'MOGI DAS CRUZES',
    'MAUÁ',
    'MAIRIPORÃ',
    'MAIRINQUE',
    'JUQUITIBA',
    'JUNDIAÍ',
    'JOANÓPOLIS',
    'JARINU',
    'JANDIRA',
    'ITUPEVA',
    'ITU',
    'ITATIBA',
    'ITAQUAQUECETUBA',
    'ITAPEVI',
    'ITAPECERICA DA SERRA',
    'IGARATÁ',
    'GUARULHOS',
    'GUARAREMA',
    'FRANCO DA ROCHA',
    'FRANCISCO MORATO',
    'FERRAZ DE VASCONCELOS',
    'EMBU-GUAÇU',
    'DIADEMA',
    'COTIA',
    'CARAPICUÍBA',
    'CAMPO LIMPO PAULISTA',
    'CAJAMAR',
    'CAIEIRAS',
    'CABREÚVA',
    'BRAGANÇA PAULISTA',
    'BOM JESUS DOS PERDÕES',
    'BIRITIBA-MIRIM',
    'BARUERI',
    'ATIBAIA',
    'ARUJÁ',
    'ARAÇARIGUAMA',
    'ALUMÍNIO',
  ],
};

const invalidResponseInvalid = {
  type: 'ddd_error',
  message: 'DDD deve conter apenas 2 dígitos',
  name: 'DDD_INVALID',
};

module.exports = {
  validResponse,
  invalidResponseInvalid,
};
