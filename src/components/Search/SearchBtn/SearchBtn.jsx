import React from "react"
import { useSelector, useDispatch } from "react-redux"
import BooksService from "../../../API/BooksService";
import { btnClickLoadingAction, snippetsItemsAction } from "../../../store/reducers/responseReducer"
import { resTotalItemsAction, switchPageAction } from "../../../store/reducers/paginationReducer"
import { booksToPageAction, searchByGenreAction, searchTypeAction } from "../../../store/reducers/booksPageReducer"

const SearchBtn = () => {

    // console.log('search btn re-render')

    const getData = new BooksService()
    const dispatch = useDispatch()

    const searchValue = useSelector(state => state.responseReducer.searchValue)
    const resMaxItems = useSelector(state => state.paginationReducer.resMaxItems)
    const resStartIndex = useSelector(state => state.paginationReducer.resStartIndex)
    const searchType = useSelector(state => state.booksPageReducer.searchType)



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



    return (
        // <button onClick={showAllBooks}  className="search__btn">Найти</button>
        <button onClick={showAllBooks} className="search__btn">
            <svg className="search__btn-icon" width="17" height="17" viewBox="0 0 19 19"  xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5649 15.4449L12.8949 10.7749C13.8257 9.32142 14.1867 7.57529 13.9085 5.87187C13.6303 4.16846 12.7327 2.62786 11.3879 1.54595C10.0431 0.464044 8.34597 -0.0828878 6.6225 0.0101939C4.89903 0.103276 3.27071 0.829808 2.05026 2.05026C0.829808 3.27071 0.103276 4.89903 0.0101939 6.6225C-0.0828878 8.34597 0.464044 10.0431 1.54595 11.3879C2.62786 12.7327 4.16846 13.6303 5.87187 13.9085C7.57529 14.1867 9.32142 13.8257 10.7749 12.8949L15.4449 17.5649C15.7262 17.8458 16.1074 18.0036 16.5049 18.0036C16.9024 18.0036 17.2837 17.8458 17.5649 17.5649C17.7052 17.4263 17.8166 17.2613 17.8926 17.0793C17.9686 16.8974 18.0078 16.7021 18.0078 16.5049C18.0078 16.3077 17.9686 16.1125 17.8926 15.9305C17.8166 15.7486 17.7052 15.5835 17.5649 15.4449ZM2.00492 7.00492C2.00492 6.01602 2.29817 5.04932 2.84757 4.22707C3.39698 3.40483 4.17787 2.76396 5.09151 2.38552C6.00514 2.00709 7.01047 1.90807 7.98037 2.101C8.95028 2.29392 9.84119 2.77013 10.5405 3.46939C11.2397 4.16865 11.7159 5.05957 11.9088 6.02947C12.1018 6.99938 12.0028 8.00471 11.6243 8.91834C11.2459 9.83197 10.605 10.6129 9.78277 11.1623C8.96053 11.7117 7.99383 12.0049 7.00492 12.0049C5.67884 12.0049 4.40707 11.4781 3.46939 10.5405C2.53171 9.60277 2.00492 8.331 2.00492 7.00492Z" fill="#464646" />
            </svg>

        </button>
    )
}

export default SearchBtn
