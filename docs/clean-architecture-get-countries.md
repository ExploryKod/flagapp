# Clean Architecture: Get Countries flow (Uncle Bob's terms)

This document describes how the "Get Countries" feature is structured according to **Robert C. Martin's Clean Architecture** (dependency rule, layers, controllers, presenters, use cases).

---

## 1. The four layers (from inside out)

Uncle Bob's schema has concentric circles. **Source code dependencies point inward only** (Dependency Rule).

```
  ┌─────────────────────────────────────────────────────────────────┐
  │  Frameworks & Drivers (outer)                                    │
  │  Next.js, React, page.tsx — only calls Controller, renders VM   │
  ├─────────────────────────────────────────────────────────────────┤
  │  Interface Adapters                                              │
  │  Controller (input) + Presenter / Output Port (output)           │
  ├─────────────────────────────────────────────────────────────────┤
  │  Application Business Rules (Use Cases)                          │
  │  getCountriesUseCase — orchestrates ports, no UI/HTTP           │
  ├─────────────────────────────────────────────────────────────────┤
  │  Enterprise Business Rules (Entities) — innermost                │
  │  Country — domain model                                          │
  └─────────────────────────────────────────────────────────────────┘
```

- **Entities**: `Country` (core/models). Enterprise business rules; no dependency on outer layers.
- **Use Cases**: Application business rules. Depend only on **ports** (e.g. `ICountryRepository`). They do not know controllers or presenters.
- **Interface Adapters**: **Controllers** (input) and **Presenters** (output). They convert between the outside world and the use case. Controller calls the use case; Presenter converts use-case output into a View Model.
- **Frameworks & Drivers**: Next.js page. Only depends on the Controller (and the View Model type). It does **not** call the use case or the repository.

---

## 2. Data flow for Get Countries

```
  Page (Framework)          Controller (Adapter)         Use Case (Application)      Repository (Infra)
       │                            │                            │                          │
       │  getCountriesController()  │                            │                          │
       │ ─────────────────────────>│                            │                          │
       │                            │  getCountriesUseCase()     │                          │
       │                            │ ──────────────────────────>│  getCountries()           │
       │                            │                            │ ────────────────────────>│
       │                            │                            │     Country[]            │
       │                            │                            │ <────────────────────────│
       │                            │     Country[]               │                          │
       │                            │ <──────────────────────────│                          │
       │                            │  outputPort.present(...)    │                          │
       │                            │  → CountriesPageViewModel  │                          │
       │     CountriesPageViewModel │                            │                          │
       │ <─────────────────────────│                            │                          │
       │  render(viewModel)         │                            │                          │
```

- The **Controller** is the only one that talks to both the Use Case and the Presenter (Output Port).
- The **Use Case** returns entity data; it does not know about View Models.
- The **Presenter** converts entity data into the View Model; the **Page** only receives the View Model and renders.

---

## 3. Why each piece exists

| Piece | Uncle Bob's role | In this app |
|-------|------------------|-------------|
| **Entity** | Enterprise business rule; innermost, no outer deps | `Country` in `core/models/country.entity.ts` |
| **Use Case** | Application business rule; orchestrates input/output ports | `getCountriesUseCase`: calls `ICountryRepository.getCountries()`, returns `Country[]` |
| **Input Port** | Interface the Controller uses to invoke the application | `IGetCountriesUseCase` (the use case's function type) |
| **Output Port** | Interface the Controller uses to format the result for the view | `IGetCountriesOutputPort.present(countries) → ViewModel` |
| **Controller** | Interface adapter (input): receives “request”, calls use case, then presenter | `getCountriesController(useCase, outputPort)`: calls use case, then `outputPort.present(result)` |
| **Presenter** | Interface adapter (output): implements Output Port; builds View Model from entities | `getCountriesPresenter`: implements `IGetCountriesOutputPort`, sorts and returns `CountriesPageViewModel` |
| **View Model** | Data structure for the view; no domain logic | `CountriesPageViewModel` = `{ countries: Country[] }` (presentation can add sort/format) |
| **Page** | Framework & Drivers: only calls Controller and renders View Model | `page.tsx`: `getInjection('IGetCountriesController')()` then `<CountryList countries={viewModel.countries} />` |

---

## 4. Dependency Rule

- **Page** → depends on **Controller** and **View Model** (interface adapters / boundary).
- **Controller** → depends on **Use Case** (input port) and **Output Port** (presenter interface).
- **Use Case** → depends on **Repository** (port) and **Entity**; it does **not** depend on Controller or Presenter.
- **Presenter** → depends only on **Entity** and **View Model** types; no framework.

So: **nothing in the inner layers (Entity, Use Case) knows about the outer layers (Controller, Presenter, Page).** The outer layers depend on abstractions (ports) defined at the boundary; the composition root (DI module) wires concrete implementations.

---

## 5. Files and layers

| Layer | File | Responsibility |
|-------|------|----------------|
| Entity | `core/models/country.entity.ts` | Country shape and validation |
| Use Case | `core/application/use-cases/get-countries.usecase.ts` | Call repository, return `Country[]` |
| Output Port | `interface-adapters/presenters/get-countries.output-port.ts` | Interface `present(countries) → ViewModel` |
| View Model | `interface-adapters/presenters/get-countries.view-model.ts` | Type for the page |
| Presenter | `interface-adapters/presenters/get-countries.presenter.ts` | Implements Output Port; builds View Model (e.g. sort) |
| Controller | `interface-adapters/controllers/get-countries.controller.ts` | Invoke use case, then presenter; return View Model |
| Framework | `app/page.tsx` | Resolve Controller from DI, await controller(), render view model |
