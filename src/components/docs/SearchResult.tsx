import { DocSearchResult } from "./Common";

const SearchResult = (result: DocSearchResult) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-2">
      <h3 className="text-lg font-semibold text-primary">{result.title}</h3>
    </div>
  );
};

export default SearchResult;
