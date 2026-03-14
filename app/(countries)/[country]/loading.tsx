import { CountryArticleSkeleton } from "@modules/countries/react-ui/components/CountryArticle";

export default function Loading() {
    // Add fallback UI that will be shown while the route is loading.
    return <CountryArticleSkeleton />
  }