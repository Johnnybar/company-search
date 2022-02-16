interface Company {
  company_name: string;
  logo: string;
  city: number;
  specialty: string;
}

interface SelectOptionProps {
  value: string;
  label: string;
}

interface SearchResultProps {
  searchResult: Company;
  i: number;
}

interface FilterProps {
  handleFilterClick: handleFilterClick;
  filterSelectOptions: SelectOptionProps[];
}

type Optional<T> = T | null;

type handleFilterClick = (event: any) => void;

type handleSearch = (event: any) => void;

type getFiltersRemoveDuplicates = (data: Company[]) => string[];

type getResultsBasedOnInput = (
  allCompaniesData: Company[],
  value: string
) => Company[];

type checkForFiltersReturnResults = (
  selectedFilters: string[],
  querySearchResults: Company[]
) => Company[];

type createFiltersSelectOptions = (data: string[]) => {
  value: string;
  label: string;
}[];
