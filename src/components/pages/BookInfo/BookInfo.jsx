import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BuyBtn from "../../buttons/BuyBtn/BuyBtn";
import "./BookInfo.scss";

const BookInfo = () => {
    const currentBook = useSelector(
        (state) => state.bookInfoReducer.currentBook,
    );
    const cartItems = useSelector((state) => state.cartReducer.cartItems);

    const [isItemInCart, setIsItemInCart] = useState(false);

    useEffect(() => {
        if (currentBook) {
            let arrIds = cartItems.map((item) => {
                return item.id;
            });
            if (arrIds.includes(currentBook.id)) {
                setIsItemInCart(true);
            }
        }
    }, [cartItems]);

    return (
        <div className="book-info">
            {currentBook ? (
                <div className="book-info__inner">
                    <div className="book-info__img-wrap">
                        <img
                            className="book-info__img"
                            src={currentBook.image}
                            alt={currentBook.title}
                        />

                        <div>
                            <p className="book-info__price">
                                {currentBook.price} руб
                            </p>

                            {isItemInCart ? (
                                <button className="buy-btn buy-btn--added">
                                    Добавлено
                                </button>
                            ) : (
                                <BuyBtn />
                            )}
                        </div>
                    </div>
                    <div className="book-info__info-wrapper">
                        <h3 className="book-info__title">
                            {currentBook.title}
                        </h3>
                        <ul className="book-info__info-list info-list">
                            <li className="info-list__item">
                                <span>Авторы: </span>
                                {currentBook.authors}
                            </li>
                            <li className="info-list__item">
                                <span>Количство страниц: </span>
                                {currentBook.id}
                            </li>
                            <li className="info-list__item">
                                <span>Количство страниц: </span>
                                {currentBook.pageCount}
                            </li>
                            <li className="info-list__item">
                                <span>Дата публикации: </span>
                                {currentBook.publishedDate}
                            </li>
                        </ul>
                        <p className="book-info__description">
                            <span>Описание:</span>
                            {currentBook.description}
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default React.memo(BookInfo);
