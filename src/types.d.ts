interface Company {
  company_name: string;
  logo: string;
  city: number;
  specialty: string;
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
