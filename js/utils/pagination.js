
export const renderPagination = ({ elementId, pagination }) => {
  const ulPagination = document.getElementById(elementId);
  //calc totalPages

  if (!pagination || !ulPagination) return;

  const { _page, _limit, _totalRows } = pagination;

  const totalPages = Math.ceil(_totalRows / _limit);

  //save page and totalPages to ulPagination
  ulPagination.dataset.page = _page;
  ulPagination.dataset.totalPages = totalPages;

  //check if enable/disable prev/next links
  if (_page <= 1) {
    // ulPagination.firstElementChild?.setAttribute('hidden', '');
    ulPagination.firstElementChild?.classList.add('disabled');
  }
  else {
    ulPagination.firstElementChild?.classList.remove('disabled');
  }

  if (_page >= totalPages) {
    ulPagination.lastElementChild?.classList.add('disabled');
  }
  else {
    ulPagination.lastElementChild?.classList.remove('disabled');
  }

}

//init prev, next button
export const initPagination = ({ elementId, defaultParams, onChange }) => {
  const ulElement = document.getElementById(elementId);
  if (!ulElement) return;

  const prevButton = ulElement.firstElementChild?.firstElementChild;
  if (prevButton) {
    prevButton.addEventListener('click', (event) => {
      event.preventDefault();
      const page = ulElement.dataset.page;
      if (page >= 2)
        onChange?.(page - 1);
    });
  }
  const nextButton = ulElement.lastElementChild?.firstElementChild;
  if (nextButton) {
    nextButton.addEventListener('click', (event) => {
      event.preventDefault();
      const page = ulElement.dataset.page;
      const totalPages = ulElement.dataset.totalPages;
      if (page < totalPages)
        onChange?.(parseInt(page) + 1);
    });
  }
}