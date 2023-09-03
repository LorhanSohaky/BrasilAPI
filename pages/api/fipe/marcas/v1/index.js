import app from '@/app';
import BadRequestError from '@/errors/BadRequestError';

import {
  listTruckAutomakers,
  listCarAutomakers,
  listMotorcycleAutomakers,
} from '@/services/fipe/automakers';
import { listReferenceTables } from '@/services/fipe/referenceTable';

async function FipeTruckAutomakers(request, response) {
  const referenceTableCode = request.query.tabela_referencia;
  const referenceTable = referenceTableCode
    ? parseInt(referenceTableCode, 10)
    : undefined;

  console.debug('Query:', request.query);
  if (referenceTableCode) {
    const referenceTables = await listReferenceTables();

    const hasReferenceTable = !!referenceTables.find(
      (table) => table.codigo === referenceTable
    );
    console.debug('Tem a tabela?', hasReferenceTable);

    if (!hasReferenceTable) {
      throw new BadRequestError({ message: 'Tabela de referência inválida' });
    }
  }

  const automakers = (
    await Promise.all([
      listCarAutomakers({ referenceTable }),
      listTruckAutomakers({ referenceTable }),
      listMotorcycleAutomakers({ referenceTable }),
    ])
  )
    .reduce((array, item) => array.concat(...item), [])
    .sort((a, b) => parseInt(a.valor, 10) - parseInt(b.valor, 10));
  return response.status(200).json(automakers);
}

export default app({ cache: 86400 }).get(FipeTruckAutomakers);
