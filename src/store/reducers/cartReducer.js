const defaultState = {
    cartItems: [],
    currentItem: null,
    priceSum: 0,
    isItemDeleted: false,
    deletedItemId: null,
    clearCart: false,
    successOrder: false,
    myOrders: [],
    orderNum: 0
}


const CART_ITEMS = 'CART_ITEMS'
const CURRENT_ITEM = 'CURRENT_ITEM'
const PRICE_SUM = 'PRICE_SUM'
const IS_ITEM_DELETED = 'IS_ITEM_DELETED'
const IDELETED_ITEM_ID = 'DELETED_ITEM_ID'
const CLEAR_CART = 'CLEAR_CART'
const SUCCESS_ORDER = 'SUCCESS_ORDER'
const MY_ORDERS = 'MY_ORDERS'
const ORDER_NUM = 'ORDER_NUM'

export const cartReducer = (state = defaultState, action) => {
    switch (action.type) {

        case CART_ITEMS:
            return { ...state, cartItems: action.payload }

        case CURRENT_ITEM:
            return { ...state, currentItem: action.payload }

        case PRICE_SUM:
            return { ...state, priceSum: action.payload }

        case IS_ITEM_DELETED:
            return { ...state, isItemDeleted: action.payload }

        case IDELETED_ITEM_ID:
            return { ...state, deletedItemId: action.payload }

        case CLEAR_CART:
            return { ...state, clearCart: action.payload }

        case SUCCESS_ORDER:
            return { ...state, successOrder: action.payload }

        case MY_ORDERS:
            return { ...state, myOrders: [...state.myOrders, action.payload] }

        case ORDER_NUM:
            return { ...state, orderNum: action.payload }

        default:
            return state
    }
}

export const cartItemsAction = (payload) => ({ type: CART_ITEMS, payload })
export const currentItemAction = (payload) => ({ type: CURRENT_ITEM, payload })
export const priceSumAction = (payload) => ({ type: PRICE_SUM, payload })
export const isItemDeletedAction = (payload) => ({ type: IS_ITEM_DELETED, payload })
export const deletedItemIdAction = (payload) => ({ type: IDELETED_ITEM_ID, payload })
export const clearCartAction = (payload) => ({ type: CLEAR_CART, payload })
export const successOrderAction = (payload) => ({ type: SUCCESS_ORDER, payload })
export const myOrdersAction = (payload) => ({ type: MY_ORDERS, payload })
export const orderNumAction = (payload) => ({ type: ORDER_NUM, payload })