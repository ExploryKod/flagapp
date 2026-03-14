# Use-cases in clean architecture (flagapp vs nextjs-clean-architecture vs quizzam)

## Role of use-cases

- **Single application action**: One use-case = one intent (e.g. "get all countries", "get todos for user"). It encapsulates *what* the app does, not *how* the UI or HTTP works.
- **Orchestrate ports only**: Use-cases depend on **ports** (repository interfaces, services), not on frameworks or infrastructure. They call `repository.getCountries()`, not `fetch(...)`.
- **Keep UI/controllers thin**: The page (or controller) should: resolve input → call use-case → present output. It does **not** call the repository directly.
- **Reusable and testable**: Same use-case can be used by a Server Component, an API route, or a CLI. You test the use-case by mocking the repository.
- **Cross-cutting concerns**: Instrumentation, logging, validation, authorization can live in one place (the use-case or a wrapper) instead of in every controller.

## Comparison

| Aspect | **flagapp** (Next.js) | **nextjs-clean-architecture** | **quizzam** (NestJS) |
|--------|------------------------|--------------------------------|----------------------|
| Use-case shape | Function `(deps) => (args) => Promise<Result>` | Same (curried, higher-order) | Class with `execute(request)` (CQRS Query/Command) |
| Where use-case lives | `modules/countries/core/application/use-cases/` | `src/application/use-cases/` | `queries/`, `commands/` (injected with repo) |
| Who calls use-case | Page (RSC) via `getInjection('IGetCountriesUseCase')()` | Controllers (injected with use-case) | Controller calls `getUserQuizzesQuery.execute(data)` |
| DI | ioctopus: `toHigherOrderFunction(useCase, [deps])` | Same | NestJS: `useFactory: (repo) => new GetUserQuizzes(repo)` |

In all three, the **flow** is: **UI/Controller → Use-case → Repository**. The repository is a detail; the use-case is the application boundary.

## In flagapp

- **Application layer**: `get-countries.usecase.ts` — depends on `ICountryRepository` and `IInstrumentationService`, returns `() => Promise<Country[]>`.
- **DI**: `IGetCountriesUseCase` is bound in `countries.module.ts` with `toHigherOrderFunction(getCountriesUseCase, [IInstrumentationService, ICountryRepository])`.
- **Page**: Calls `getInjection('IGetCountriesUseCase')()` instead of `getInjection('ICountryRepository').getCountries()`. The page no longer depends on the repository port; it depends on the use-case port.

This keeps the page independent of *where* countries come from (API, DB, etc.) and keeps the application rule "get all countries" in one place, with instrumentation and future logic (e.g. caching, auth) easy to add in the use-case.
