import { IInstrumentationService } from '@modules/core/application/services/intrumentation.service.interface';
import { ICountryRepository } from '@flagapp/modules/countries/core/application/repositories/countries-repository.interface';
import { IGetCountriesUseCase } from '@flagapp/modules/countries/core/application/use-cases/get-countries.usecase';
import { IGetCountryByNameUseCase } from '@flagapp/modules/countries/core/application/use-cases/get-country-by-name.usecase';
import { IGetCountriesOutputPort } from '@flagapp/modules/countries/interface-adapters/presenters/get-countries.output-port';
import { IGetCountriesController } from '@flagapp/modules/countries/interface-adapters/controllers/get-countries.controller';
import { IGetCountryByNameOutputPort } from '@modules/countries/interface-adapters/presenters/get-country-by-name.output-port';
import { IGetCountryByNameController } from '@modules/countries/interface-adapters/controllers/get-country-by-name.controller';

export const DI_SYMBOLS = {
  // Services
  IInstrumentationService: Symbol.for('IInstrumentationService'),

  // Repositories
  ICountryRepository: Symbol.for('ICountryRepository'),

  // Use-cases
  IGetCountriesUseCase: Symbol.for('IGetCountriesUseCase'),
  IGetCountryByNameUseCase: Symbol.for('IGetCountryByNameUseCase'),

  // Interface adapters (output port = presenter contract)
  IGetCountriesOutputPort: Symbol.for('IGetCountriesOutputPort'),
  IGetCountryByNameOutputPort: Symbol.for('IGetCountryByNameOutputPort'),

  // Controllers
  IGetCountriesController: Symbol.for('IGetCountriesController'),
  IGetCountryByNameController: Symbol.for('IGetCountryByNameController'),
};

export interface DI_RETURN_TYPES {
  // Services
  IInstrumentationService: IInstrumentationService;

  // Repositories
  ICountryRepository: ICountryRepository;

  // Use-cases
  IGetCountriesUseCase: IGetCountriesUseCase;
  IGetCountryByNameUseCase: IGetCountryByNameUseCase;

  // Interface adapters
  IGetCountriesOutputPort: IGetCountriesOutputPort;
  IGetCountryByNameOutputPort: IGetCountryByNameOutputPort;

  // Controllers
  IGetCountriesController: IGetCountriesController;
  IGetCountryByNameController: IGetCountryByNameController;
}
