import { useSelector } from 'react-redux';
import { MediaResultsDisplay } from './MediaResultsDisplay';
import { Filler } from './Filler';
import {
  getLoading,
  getSearchResults,
  getSearchResultsFiller,
} from '../features/searchResults/searchResultsSlice';

function SearchDisplay() {
  const searchResults = useSelector(getSearchResults);
  const fillerMsg = useSelector(getSearchResultsFiller);
  const searching = useSelector(getLoading);

  return searching || searchResults.length == 0 ? (
    <Filler fillerMsg={fillerMsg} />
  ) : (
    <MediaResultsDisplay resultsToDisplay={searchResults} />
  );
}

export { SearchDisplay };
