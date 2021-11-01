import React, { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import Loader from "../Loader/Loader";
import { btnClickLoadingAction, showSnippetsAction, snippetsItemsAction } from "../../store/reducers/responseReducer"
import { showCurrentBookAction } from "../../store/reducers/bookInfoReducer"


import './Snippets.scss'
import { booksToPageAction, searchByGenreAction } from "../../store/reducers/booksPageReducer";
import BooksService from "../../API/BooksService";
import { resTotalItemsAction, switchPageAction } from "../../store/reducers/paginationReducer";



const Snippets = () => {

    const getData = new BooksService()
    const dispatch = useDispatch()

    const searchValue = useSelector(state => state.responseReducer.searchValue)
    const resMaxItems = useSelector(state => state.paginationReducer.resMaxItems)
    const resStartIndex = useSelector(state => state.paginationReducer.resStartIndex)
    const searchType = useSelector(state => state.booksPageReducer.searchType)
    const isLoading = useSelector(state => state.responseReducer.isLoading)
    const snippetsItems = useSelector(state => state.responseReducer.snippetsItems)
    
    const showAllBooks = async () => {
        
        if (searchValue.length) {

            dispatch(searchByGenreAction(null))
            // dispatch(searchTypeAction('intitle'))


            dispatch(btnClickLoadingAction(true))
            dispatch(switchPageAction(0))
            dispatch(snippetsItemsAction([]))
            const res = await getData.getAll(searchType, searchValue, resMaxItems, resStartIndex)
            console.log(res)
            if (res.totalItems > 0) {
                dispatch(resTotalItemsAction(res.totalItems))
                dispatch(booksToPageAction(getData.getBookInfo(res.items)))
                dispatch(btnClickLoadingAction(false))
            }
        }

    }
    
    

    

    
    
    

    

    const showCurrentBook = (book) => {
        
        
        dispatch(showCurrentBookAction(book))
        dispatch(showSnippetsAction('snippets'))
    }

    return (
        <div className="snippets">
            <ul className="snippets__list">
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        snippetsItems.length
                            ?
                            snippetsItems.map((book, index) => {
                                return (
                                    <Link to="/book" onClick={() => showCurrentBook(book)} key={index}>
                                        <li className="snippets__item">
                                            <div className="snippets__img-wrapper">
                                                {
                                                    book.image === null
                                                        ?
                                                        <div className="snippets__img-empty"><span></span></div>
                                                        :
                                                        <img className="snippets__item-img" src={book.image} alt={book.title} />

                                                }
                                            </div>
                                            <div className="snippets__item-inner">
                                                <h3 className="snippets__item-title">{book.title}</h3>
                                                <p className="snippets__item-author">{book.authors}</p>
                                            </div>
                                        </li>
                                    </Link>
                                )
                            })
                            :
                            null
                }

            </ul>
            {
                snippetsItems.length
                ?
                <div className="snippets__btns-wrap">
                <Link to="/books" onClick={showAllBooks} className="snippets__results-btn">Все результаты</Link>
                <button className="snippets__close-btn">Скрыть</button>
            </div>
                :
                null
            }
            
        </div>

    )
}

export default Snippets
