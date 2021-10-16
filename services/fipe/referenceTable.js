import axios from 'axios';

import { BRASIL_API_URL, FIPE_URL } from './constants';

export async function listReferenceTables() {
  const { data } = await axios.post(
    `${FIPE_URL}/veiculos/ConsultarTabelaDeReferencia`,
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return data
    .map((item) => ({ codigo: item.Codigo, mes: item.Mes }))
    .sort((a, b) => b.codigo - a.codigo);
}

export async function listReferenceTablesFromBrasilAPI() {
  try {
    const { data } = await axios.get(`${BRASIL_API_URL}/fipe/tabelas/v1`);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getLatestReferenceTable() {
  const tables = await listReferenceTablesFromBrasilAPI();
  return tables[0].codigo;
}
