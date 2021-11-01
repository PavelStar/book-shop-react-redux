import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { cartItemsAction, priceSumAction, isItemDeletedAction } from '../../../store/reducers/cartReducer'
import './BuyBtn.scss'

const BuyBtn = ({ book }) => {

    // console.log('book', book)

    const dispatch = useDispatch()

    const cartItems = useSelector(state => state.cartReducer.cartItems)
    const priceSum = useSelector(state => state.cartReducer.priceSum)
    const deletedItemId = useSelector(state => state.cartReducer.deletedItemId)
    const clearCart = useSelector(state => state.cartReducer.clearCart)
    const currentBook = useSelector(state => state.bookInfoReducer.currentBook)

    const [isItemAdded, setIsItemAdded] = useState(false)




    const addToCart = () => {

        if (currentBook !== null) {
            console.log('currentBook', currentBook)
            dispatch(priceSumAction(priceSum + currentBook.price))
            dispatch(cartItemsAction([...cartItems, currentBook]))
            setIsItemAdded(true)
        }


        if (book) {
            dispatch(priceSumAction(priceSum + book.price))
            dispatch(cartItemsAction([...cartItems, book]))
            setIsItemAdded(true)
        }
    }



    useEffect(() => {

        if (clearCart) {
            setIsItemAdded(false)

        }
    }, [clearCart])

    return (

        isItemAdded
            ?
            <button className="buy-btn buy-btn--added">Добавлено</button>
            :
            <button onClick={addToCart} className="buy-btn">В корзину</button>

    )
}

export default BuyBtn
