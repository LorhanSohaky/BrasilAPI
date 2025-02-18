import app from '@/app';
import BadRequestError from '@/errors/BadRequestError';
import { getCurrencyExchange } from '@/services/cambio/cotacao';
import {
  formatDate,
  getNow,
  isValidDate,
  parseToDate,
  subBusinessDays,
} from '@/services/date';
import { getCurrency } from '@/services/cambio/moedas';
import BaseError from '@/errors/BaseError';
import InternalError from '@/errors/InternalError';

const MAX_DATES = 7;

const Action = async (request, response) => {
  const { data, moeda: coin } = request.query;

  try {
    const today = getNow().toDate();
    const minDate = parseToDate('1984-11-28', 'YYYY-MM-DD');
    let date = parseToDate(data, 'YYYY-MM-DD');

    if (!isValidDate(date)) {
      throw new BadRequestError({
        message: 'Formato de data inválida, utilize: YYYY-MM-DD',
        type: 'format_error',
        name: 'DATE_FORMAT_INCORRECT_PATTERN',
      });
    }

    if (data === formatDate(today, 'YYYY-MM-DD')) {
      throw new BadRequestError({
        message:
          'Não é possível consultar a cotação do dia de hoje devido a política de cache',
        type: 'today_date_error',
        name: 'NO_TODAY_DATE',
      });
    }

    if (date > today) {
      throw new BadRequestError({
        message: 'Datas futuras não são permitidas',
        type: 'future_date_error',
        name: 'NO_FUTURE_DATE',
      });
    }

    if (date < minDate) {
      throw new BadRequestError({
        message: 'Dados a partir do dia 1984-11-28',
        type: 'data_available_error',
        name: 'NO_DATA_AVAILABLE',
      });
    }

    const coins = await getCurrency();

    if (!coins.has(coin)) {
      throw new BadRequestError({
        message: `Tipo de moeda inválida, os tipos disponíveis são: ${Array.from(
          coins.keys()
        ).join(', ')}`,
        type: 'currency_error',
        name: 'INVALID_CURRENCY_VALUE',
      });
    }

    let output = [];
    let count = 0;
    const initialDate = date;
    do {
      date = subBusinessDays(initialDate, count);
      output = await getCurrencyExchange(date, coin);
      count += 1;
    } while (output.length === 0 && count < MAX_DATES);

    if (output.length === 0) {
      throw new BadRequestError({
        message: 'Não foi possível encontrar cotação para a data informada',
        type: 'no_data_error',
        name: 'NO_DATA_FOUND',
      });
    }

    return response.status(200).json({
      cotacoes: output,
      moeda: coin,
      data: formatDate(date, 'YYYY-MM-DD'),
    });
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    }

    throw new InternalError({
      message: 'Erro ao buscar cambio',
      type: 'cambio_error',
      name: 'CAMBIO_ERROR',
    });
  }
};

export default app().get(Action);
