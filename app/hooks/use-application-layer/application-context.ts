import { createContext, useContext } from 'react';

import { IApplication } from '~/application';

const ApplicationContext = createContext<IApplication>({} as IApplication);

export const ApplicationLayerProvider = ApplicationContext.Provider;

export const useApplicationLayer = () => useContext(ApplicationContext);
