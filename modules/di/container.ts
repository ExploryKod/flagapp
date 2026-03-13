import { createContainer } from '@evyweb/ioctopus';

import { DI_RETURN_TYPES, DI_SYMBOLS } from '@modules/di/types';

import { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';

import { createCountryModule } from '@modules/countries/countries.module';

const noopInstrumentation: IInstrumentationService = {
  startSpan(_options, callback) {
    return callback();
  },
  async instrumentServerAction(_name, _options, callback) {
    return callback();
  },
};

const ApplicationContainer = createContainer();
ApplicationContainer.bind(DI_SYMBOLS.IInstrumentationService).toValue(noopInstrumentation);
ApplicationContainer.load(Symbol('CountryModule'), createCountryModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  const instrumentationService =
    ApplicationContainer.get<IInstrumentationService>(
      DI_SYMBOLS.IInstrumentationService
    );

  return instrumentationService.startSpan(
    {
      name: '(di) getInjection',
      op: 'function',
      attributes: { symbol: symbol.toString() },
    },
    () => ApplicationContainer.get(DI_SYMBOLS[symbol])
  );
}
