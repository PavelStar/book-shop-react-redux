import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BuyBtn from "../../buttons/BuyBtn/BuyBtn";
import { showSnippetsAction } from "../../../store/reducers/responseReducer";
import { showCurrentBookAction } from "../../../store/reducers/bookInfoReducer";
import PaginationList from "../../PaginationList/PaginationList";
import "./Books.scss";
import BooksListSkeleton from "../../Loader/books-list-skeleton/BooksListSkeleton";
import Loader from "../../Loader/Loader";
import { searchValueAction } from "../../../store/reducers/responseReducer";
import { switchPageAction } from "../../../store/reducers/paginationReducer";
import {
    searchTypeAction,
    clickOnAuthorAction,
} from "../../../store/reducers/booksPageReducer";

const Books = () => {
    const dispatch = useDispatch();
    const booksToPage = useSelector(
        (state) => state.booksPageReducer.booksToPage,
    );
    const btnClickLoad = useSelector(
        (state) => state.responseReducer.btnClickLoad,
    );
    const pageLoader = useSelector(
        (state) => state.paginationReducer.pageLoader,
    );

    const showCurrentBook = (book) => {
        console.log(book);
        dispatch(showCurrentBookAction(book));
        dispatch(showSnippetsAction("snippets"));
    };

    const booksByAuthor = async (authorName) => {
        dispatch(searchTypeAction("inauthor"));
        dispatch(clickOnAuthorAction(() => true));

        dispatch(switchPageAction(0));
        dispatch(searchValueAction(authorName));
    };

    return btnClickLoad ? (
        <div className="books-loader-wrapper">
            <Loader />
        </div>
    ) : (
        <div className="books-container">
            <PaginationList />

            {pageLoader ? (
                <div className="skeleton-wrapper">
                    <BooksListSkeleton />
                    <BooksListSkeleton />
                    <BooksListSkeleton />
                    <BooksListSkeleton />
                    <BooksListSkeleton />
                    <BooksListSkeleton />
                    <BooksListSkeleton />
                    <BooksListSkeleton />
                </div>
            ) : (
                <ul className="books-list">
                    {booksToPage ? (
                        booksToPage.map((book) => {
                            return (
                                <li key={book.id} className="books-list__item">
                                    <Link
                                        to="/book"
                                        onClick={() => showCurrentBook(book)}
                                    >
                                        <div className="books-list__card-header">
                                            {book.image === null ? (
                                                <div className="books-list__img-empty">
                                                    <span>Нет обложки</span>
                                                </div>
                                            ) : (
                                                <img
                                                    className="books-list__img"
                                                    src={book.image}
                                                    alt={book.title}
                                                />
                                            )}
                                        </div>
                                    </Link>
                                    <div className="books-list__card-body">
                                        <Link
                                            to="/book"
                                            onClick={() =>
                                                showCurrentBook(book)
                                            }
                                        >
                                            <h3 className="books-list__title">
                                                {book.title}
                                            </h3>
                                        </Link>
                                        <Link
                                            to="/books"
                                            onClick={() =>
                                                booksByAuthor(book.authors)
                                            }
                                        >
                                            <p className="books-list__author">
                                                {book.authors}
                                            </p>
                                        </Link>

                                        <div className="books-list__btns-wrapper">
                                            <p className="books-list__price">
                                                {book.price} руб
                                            </p>
                                            <BuyBtn book={book} />
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <li>ggg</li>
                    )}
                </ul>
            )}

            <PaginationList />
        </div>
    );
};

export default React.memo(Books);
