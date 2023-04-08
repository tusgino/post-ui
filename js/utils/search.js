import debounce from "lodash.debounce";

// Pure function - dump function
export const initSearch = ({ elementId, defaultParams, onChange }) => {
  const searchInput = document.getElementById(elementId);
  if (!searchInput) return;

  // const queryparams = new URLSearchParams(window.location.search);
  if (defaultParams.get('title_like'))
    searchInput.value = defaultParams.get('title_like');

  const debounceFunc = debounce((event) => {
    // handleFilterChange('title_like', event.target.value);
    onChange?.(event.target.value);
  }, 500)

  searchInput.addEventListener('input', debounceFunc);
}