const defaultState = {
    allItems: [],
    booksToPage: [],
    isShowBooks: false,
    isPageLoading: false,
    searchType: "intitle",
    clickOnAuthor: false,
    genre: null,
};

const ALL_ITEMS = "ALL_ITEMS";
const BOOKS_TO_PAGE = "BOOKS_TO_PAGE";
const IS_PAGE_LOADING = "IS_PAGE_LOADING";
const SEARCH_TYPE = "SEARCH_TYPE";
const CLICK_ON_AUTHOR = "CLICK_ON_AUTHOR";
const SEARCH_BY_GENRE = "SEARCH_BY_GENRE";

export const booksPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ALL_ITEMS:
            return { ...state, allItems: action.payload };

        case BOOKS_TO_PAGE:
            return { ...state, booksToPage: action.payload };

        case IS_PAGE_LOADING:
            return { ...state, isLoading: action.payload };

        case SEARCH_TYPE:
            return { ...state, searchType: action.payload };

        case CLICK_ON_AUTHOR:
            return { ...state, clickOnAuthor: action.payload };

        case SEARCH_BY_GENRE:
            return { ...state, genre: action.payload };

        default:
            return state;
    }
};

export const allItemsAction = (payload) => ({ type: ALL_ITEMS, payload });
export const booksToPageAction = (payload) => ({
    type: BOOKS_TO_PAGE,
    payload,
});
export const isPageLoadingAction = (payload) => ({
    type: IS_PAGE_LOADING,
    payload,
});
export const searchTypeAction = (payload) => ({ type: SEARCH_TYPE, payload });
export const clickOnAuthorAction = (payload) => ({
    type: CLICK_ON_AUTHOR,
    payload,
});
export const searchByGenreAction = (payload) => ({
    type: SEARCH_BY_GENRE,
    payload,
});
