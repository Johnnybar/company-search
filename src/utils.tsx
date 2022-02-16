export const getFiltersRemoveDuplicates = (data: Company[]) => {
  return Array.from(new Set(data.map(({ specialty }: Company) => specialty)));
};

export const createFiltersSelectOptions = (data: string[]) => {
  return data.map((item) => {
    return { value: item, label: item };
  });
};
export const getResultsBasedOnInput = (
  allCompaniesData: Company[],
  value: string
) =>
  allCompaniesData.filter((item) => {
    return value !== ""
      ? item.company_name.toLowerCase().search(value) !== -1
      : "";
  });

export const checkForFiltersReturnResults = (
  selectedFilters: string[],
  querySearchResults: Company[]
) => {
  return selectedFilters.length
    ? querySearchResults.filter(({ specialty }) =>
        selectedFilters.includes(specialty)
      )
    : querySearchResults;
};
