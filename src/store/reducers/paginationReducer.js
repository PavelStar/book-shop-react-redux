const defaultState = {
    resTotalItems: null,
    allBtns: [],
    renderBtns: [],
    resStartIndex: 0,
    resMaxItems: 20,
    pageLoader: false,
};

const ALL_BTNS = "ALL_BTNS";
const RENDER_BTNS = "RENDER_BTNS";
const RES_TOTAL_ITEMS = "RES_TOTAL_ITEMS";
const SWITCH_PAGE = "SWITCH_PAGE";
const PAGE_LOADER = "PAGE_LOADER";

export const paginationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ALL_BTNS:
            return { ...state, allBtns: action.payload };

        case RENDER_BTNS:
            return { ...state, renderBtns: action.payload };

        case RES_TOTAL_ITEMS:
            return { ...state, resTotalItems: action.payload };

        case SWITCH_PAGE:
            return { ...state, resStartIndex: action.payload };

        case PAGE_LOADER:
            return { ...state, pageLoader: action.payload };

        default:
            return state;
    }
};

export const allBtnsAction = (payload) => ({ type: ALL_BTNS, payload });
export const renderBtnsAction = (payload) => ({ type: RENDER_BTNS, payload });
export const resTotalItemsAction = (payload) => ({
    type: RES_TOTAL_ITEMS,
    payload,
});
export const switchPageAction = (payload) => ({ type: SWITCH_PAGE, payload });
export const pageLoaderAction = (payload) => ({ type: PAGE_LOADER, payload });
