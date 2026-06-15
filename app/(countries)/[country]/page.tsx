import { getInjection } from "@modules/di/container";
import { CountryArticle } from "@flagapp/modules/countries/react-ui/components/CountryArticle";
import { Metadata } from "next";
import { CountryPageBackBtn } from "@flagapp/modules/countries/react-ui/components/CountryPageBackBtn";
import { renderRestCountriesError } from "@flagapp/modules/countries/react-ui/components/render-rest-countries-error";
export const metadata: Metadata = {
  title: "Country",
  description: "Information about the country",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Page is the driver: it uses the controller (injected) to get data, then renders.
 * IoC is preserved — no "With data" subcomponent; the page calls the port and passes the view model.
 */
export default async function CountryArticlePage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: countrySlug } = await params;
  const name = countrySlug.replace(/-/g, " ");

  try {
    const getCountryByNameController = getInjection("IGetCountryByNameController");
    const viewModel = await getCountryByNameController({ name });

    return (
      <div className="country-content-edge-x w-full py-4">
        <div className="my-5">
          <CountryPageBackBtn />
        </div>
        <CountryArticle viewModel={viewModel} layoutClassName="my-5" />
      </div>
    );
  } catch (error) {
    return (
      <div className="country-content-edge-x w-full py-4">
        <div className="my-5">
          <CountryPageBackBtn />
        </div>
        <div className="my-5">{renderRestCountriesError(error, { showHomeLink: true })}</div>
      </div>
    );
  }
}
