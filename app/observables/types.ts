import { IRequestSubject } from './request-subject';

export type RequestSubjectsMap<T extends string> = {
  [key in T]: IRequestSubject<any>;
};
