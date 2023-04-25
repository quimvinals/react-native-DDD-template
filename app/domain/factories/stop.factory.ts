import { IStop, Stop } from '~/domain/entities';
import { definitions } from '~/infrastructure/api/schema';

export function stopFactory(data: definitions['stop']): IStop {
  const stopId = data.stop_id;

  return new Stop(stopId);
}
