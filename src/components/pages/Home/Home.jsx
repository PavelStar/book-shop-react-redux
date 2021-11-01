import React from 'react'
import { Link } from 'react-router-dom'
import { searchByGenreAction, searchTypeAction } from "../../../store/reducers/booksPageReducer"
import { switchPageAction } from "../../../store/reducers/paginationReducer"
import { searchValueAction } from "../../../store/reducers/responseReducer"
import { useSelector, useDispatch } from "react-redux"
import './Home.scss'

const Home = () => {

    const dispatch = useDispatch()

    const showGenres = (genre) => {


        dispatch(searchTypeAction('subject'))
        dispatch(switchPageAction(0))
        // dispatch(searchTypeAction('subject'))
        dispatch(searchValueAction(genre))


        // dispatch(switchPageAction(0))
        dispatch(searchByGenreAction(genre))



    }

    return (
        <div className="home">
            <div className="home__popular-wrap">
                <div className="home__inner">
                    <h2 className="home__title">Жанры</h2>
                    <ul className="home__genres genres">
                        <li className="genres__item">
                            <Link className="genres__item-link" onClick={() => showGenres('detective')} to="/books">
                                <img src="https://books.google.com/books/content?id=84vD69aw4jkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="" />
                                <p>Детективы</p>
                            </Link>

                        </li>
                        <li className="genres__item">
                            <Link className="genres__item-link" onClick={() => showGenres('fiction')} to="/books">
                                <img src="https://books.google.com/books/content?id=W--_DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="" />
                                <p>Художественная литература</p>
                            </Link>

                        </li>
                        <li className="genres__item">
                            <Link className="genres__item-link" onClick={() => showGenres('fantasy')} to="/books">
                                <img src="https://books.google.com/books/content?id=xm5gQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" alt="" />
                                <p>Фантастика</p>
                            </Link>

                        </li>
                        <li className="genres__item">
                            <Link className="genres__item-link" onClick={() => showGenres('science')} to="/books">
                                <img src="https://books.google.com/books/content?id=ssMqAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="" />
                                <p>Наука</p>
                            </Link>

                        </li>
                        <li className="genres__item">
                            <Link onClick={() => showGenres('biography')} to="/books">
                                <img src="https://books.google.com/books/content?id=Rv86zQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" alt="" />
                                <p>Биографическая литература</p>
                            </Link>

                        </li>
                        <li className="genres__item">
                            <Link onClick={() => showGenres('business')} to="/books">
                                <img src="https://books.google.com/books/content?id=FhhFDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="" />
                                <p>Бизнес</p>
                            </Link>

                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Home
