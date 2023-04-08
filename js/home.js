import postAPI from "./api/postAPI";
import { initPagination, initSearch, renderPagination, renderPostList } from './utils';


const handleFilterChange = async (filterName, filterValue) => {
  try {
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);

    //reset page if search
    if (filterName === 'title_like') {
      url.searchParams.set('_page', 1);
    }

    history.pushState({}, '', url);

    const { data, pagination } = await postAPI.getAll(url.searchParams);
    renderPostList(data);
    renderPagination({ elementId: 'postsPagination', pagination });
  } catch (error) {
    console.log('Failed to fetch post list', error);
  }
}
(async () => {
  try {

    // Init URL
    const url = new URL(window.location);
    // update search params  if needed
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

    history.pushState({}, '', url);
    const queryparams = url.searchParams;

    initPagination({
      elementId: 'postsPagination',
      defaultParams: queryparams,
      onChange: (page) => handleFilterChange('_page', page),
    });
    initSearch({
      elementId: 'search-input',
      defaultParams: queryparams,
      onChange: (value) => handleFilterChange('title_like', value),
    });

    const { data, pagination } = await postAPI.getAll(queryparams);
    renderPostList(data);
    renderPagination({ elementId: 'postsPagination', pagination });
  } catch (error) {
    console.log('Get All Error ', error);
  }
})()
