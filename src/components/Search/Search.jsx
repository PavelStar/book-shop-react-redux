import React, { useRef, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios';
import { Link } from 'react-router-dom'
import BooksService from "../../API/BooksService";
import { responseItemsAction, showSnippetsAction, searchValueAction, isLoadingAction, snippetsItemsAction, isSnippetsOpenAction  } from "../../store/reducers/responseReducer"
import { searchTypeAction } from '../../store/reducers/booksPageReducer'
import Snippets from "../snippets/Snippets";
import SearchBtn from "./SearchBtn/SearchBtn";
import "./Search.scss"




const Search = () => {
    
    
    const getData = new BooksService()
    const dispatch = useDispatch()
    
    const isSnippetsOpen = useSelector(state => state.responseReducer.isSnippetsOpen)
    const searchValue = useSelector(state => state.responseReducer.searchValue)
    const booksToPage = useSelector(state => state.booksPageReducer.booksToPage)
    const searchType = useSelector(state => state.booksPageReducer.searchType)
    
    // const [searchType, setSearchType] = useState('intitle')
    
    let cancelToken

    const onSearchValue = async (e) => {
        const inputValue = e.target.value

        if (inputValue.length === 1) {
            dispatch(isSnippetsOpenAction(true)) 
        } 

        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel("Operation canceled due to new request.")
        }

        cancelToken = axios.CancelToken.source()
        

        if (inputValue.length > 0) {

            // dispatch(searchTypeAction())


            try {
                dispatch(isLoadingAction(true))

                const res = await getData.getAll(searchType, inputValue, 10, 0, { cancelToken: cancelToken.token })
                if (res.totalItems) {
                    dispatch(snippetsItemsAction(getData.getBookInfo(res.items)))
                }
                
                dispatch(searchValueAction(inputValue))
                dispatch(isLoadingAction(false))
            } catch (error) {
                console.log(error)
                dispatch(isLoadingAction(false))
                dispatch(snippetsItemsAction([]))
                
            }
        } 
        
        if (inputValue.length === 0) {
            dispatch(isSnippetsOpenAction(false)) 
        }

    }


    

    const inputRef = useRef()

    const clickOutside = (e) => {
        
        if (inputRef.current.contains(e.target) && searchValue.length && !isSnippetsOpen) {
            dispatch(isSnippetsOpenAction(true))
        } 

        if (!inputRef.current.contains(e.target) && isSnippetsOpen) {
            dispatch(isSnippetsOpenAction(false))
        }
    }

    useEffect(() => {
        
        document.addEventListener('click', clickOutside) 
            
        return () => {
            document.removeEventListener('click', clickOutside) 
        }

    }, [isSnippetsOpen])

    useEffect(() => {
        inputRef.current.value = ''
    }, [booksToPage])
    
    const [isChecked, setIsChecked] = useState(true)

    const titleRef = useRef()
    const authorRef = useRef()

    const radioClick = (e) => {
        setIsChecked(() => !isChecked)
        if (e.target.value === 'title') {
            dispatch(searchTypeAction('intitle'))
            console.log('title')
        }
        if (e.target.value === 'author') {
            dispatch(searchTypeAction('inauthor'))
            console.log('author')
        }
    }

    

    return (
        <div className="search">
            <div className="search__inner">
                <form className="search__input-wrapper">

                    <input onChange={onSearchValue} ref={inputRef} className="search__type-field" type="text" placeholder={searchType === 'intitle' ? 'Поиск по названию книги' : 'Поиск по автору'} />

                    <Link to="/books">
                        <SearchBtn inputRef={inputRef} />
                    </Link>
                    
                </form>
                <div className="search__search-type">
                    
                    <div className="search__switch-btn-wrap">
                        <input ref={titleRef} onChange={radioClick} className="visually-hidden" type="radio" name="search" id="title-search" value="title" checked={isChecked}/>
                        <label htmlFor="title-search">По названию</label>
                    </div>
                    

                    <div className="search__switch-btn-wrap">
                        <input ref={authorRef} onClick={radioClick} className="visually-hidden" type="radio" name="search" id="author-search" value="author" />
                        <label  htmlFor="author-search">По автору</label>
                    </div>
                </div>

                <div className="search__results-wrapper">
                    {
                        isSnippetsOpen
                         ?
                         
                        <Snippets />
                            
                        
                         :
                         null
                    }
                    
                </div>

            </div>

        </div>
    )
}

export default Search