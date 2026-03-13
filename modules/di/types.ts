import { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';
import { ICountryRepository } from '@flagapp/modules/countries/core/application/repositories/countries.repository.interface';


export const DI_SYMBOLS = {
  // Services
  IInstrumentationService: Symbol.for('IInstrumentationService'),

  // Repositories
  ICountryRepository: Symbol.for('ICountryRepository'),
};

export interface DI_RETURN_TYPES {
  // Services
  IInstrumentationService: IInstrumentationService;

  // Repositories
  ICountryRepository: ICountryRepository;

  // Controllers
}
