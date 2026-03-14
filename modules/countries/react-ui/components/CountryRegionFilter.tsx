export const CountryRegionFilter: React.FC = () => {
  return (
<select
  className="px-4 py-3 rounded-lg bg-[var(--elements)] text-[var(--foreground)] border-0 shadow-sm min-w-[200px]"
  aria-label="Filter by region"
>
  <option value="">Filter by Region</option>
  <option value="Africa">Africa</option>
  <option value="America">America</option>
  <option value="Asia">Asia</option>
  <option value="Europe">Europe</option>
  <option value="Oceania">Oceania</option>
</select>
  );
};