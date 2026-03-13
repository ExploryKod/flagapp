import { getInjection } from "@flagapp/modules/di/container";
import { CountryList } from "@flagapp/modules/countries/react-ui/components/CountryList";

export default async function Home() {
  const countriesRepository = getInjection("ICountryRepository");
  const countries = await countriesRepository.getCountries();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl">
        <CountryList countries={countries} />
      </main>
    </div>
  );
}
