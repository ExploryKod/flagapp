import { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';
import { ICountryRepository } from '@flagapp/modules/countries/core/application/repositories/countries.repository.interface';
import { IGetCountriesUseCase } from '@flagapp/modules/countries/core/application/use-cases/get-countries.usecase';
import { IGetCountriesOutputPort } from '@flagapp/modules/countries/interface-adapters/presenters/get-countries.output-port';
import { IGetCountriesController } from '@flagapp/modules/countries/interface-adapters/controllers/get-countries.controller';

export const DI_SYMBOLS = {
  // Services
  IInstrumentationService: Symbol.for('IInstrumentationService'),

  // Repositories
  ICountryRepository: Symbol.for('ICountryRepository'),

  // Use-cases
  IGetCountriesUseCase: Symbol.for('IGetCountriesUseCase'),

  // Interface adapters (output port = presenter contract)
  IGetCountriesOutputPort: Symbol.for('IGetCountriesOutputPort'),

  // Controllers
  IGetCountriesController: Symbol.for('IGetCountriesController'),
};

export interface DI_RETURN_TYPES {
  // Services
  IInstrumentationService: IInstrumentationService;

  // Repositories
  ICountryRepository: ICountryRepository;

  // Use-cases
  IGetCountriesUseCase: IGetCountriesUseCase;

  // Interface adapters
  IGetCountriesOutputPort: IGetCountriesOutputPort;

  // Controllers
  IGetCountriesController: IGetCountriesController;
}
