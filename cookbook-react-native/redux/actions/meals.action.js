export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
// filter function
export const SET_FILTERS = 'SET_FILTERS'
// filter function

export const toggleFavorite = (id) => {
	return { type: TOGGLE_FAVORITE, mealId: id };
};

// filter function
export const setFilters = filterSettings => {
	return { type: SET_FILTERS, filters: filterSettings };
}
// filter function
