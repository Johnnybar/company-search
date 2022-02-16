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

type getResultsBasedOnFilters = (
  queryResult: Company[],
  selectedFilters: string[]
) => Company[];

type checkIfFiltersExistReturnResults = (
  selectedFilters: string[],
  querySearchResults: Company[]
) => Company[];
