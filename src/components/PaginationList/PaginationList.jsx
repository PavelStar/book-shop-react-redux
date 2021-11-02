import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BooksService from "../../API/BooksService";
import {
    allBtnsAction,
    renderBtnsAction,
    switchPageAction,
    pageLoaderAction,
    resTotalItemsAction,
} from "../../store/reducers/paginationReducer";
import {
    booksToPageAction,
    searchTypeAction,
} from "../../store/reducers/booksPageReducer";
import axios from "axios";
import "./PaginationList.scss";

let cancelToken;

const PaginationList = () => {
    const getData = new BooksService();

    const dispatch = useDispatch();

    const searchValue = useSelector(
        (state) => state.responseReducer.searchValue,
    );
    const resTotalItems = useSelector(
        (state) => state.paginationReducer.resTotalItems,
    );
    const allBtns = useSelector((state) => state.paginationReducer.allBtns);
    const renderBtns = useSelector(
        (state) => state.paginationReducer.renderBtns,
    );
    const resStartIndex = useSelector(
        (state) => state.paginationReducer.resStartIndex,
    );
    const resMaxItems = useSelector(
        (state) => state.paginationReducer.resMaxItems,
    );
    const searchType = useSelector(
        (state) => state.booksPageReducer.searchType,
    );
    const clickOnAuthor = useSelector(
        (state) => state.booksPageReducer.clickOnAuthor,
    );
    const genre = useSelector((state) => state.booksPageReducer.genre);

    useEffect(() => {
        if (resTotalItems > resMaxItems) {
            let btns = [];
            for (let i = 1; i <= Math.ceil(resTotalItems / resMaxItems); i++) {
                btns.push(i);
            }
            dispatch(allBtnsAction(btns));
        }
    }, [resTotalItems]);

    useEffect(() => {
        if (allBtns.length) {
            dispatch(renderBtnsAction(allBtns.slice(0, 7)));
        }
    }, [allBtns]);

    useEffect(() => {
        if (resTotalItems) {
            let btnNumber = resStartIndex / resMaxItems + 1;
            let btnIndex = resStartIndex / resMaxItems;

            if (btnNumber < 4) {
                dispatch(renderBtnsAction(allBtns.slice(0, 7)));
            }

            if (btnNumber > 4) {
                dispatch(
                    renderBtnsAction(allBtns.slice(btnIndex - 3, btnIndex + 4)),
                );
            }
            if (btnNumber === 4) {
                dispatch(renderBtnsAction(allBtns.slice(0, 7)));
            }
            if (btnNumber >= allBtns[allBtns.length - 4]) {
                dispatch(renderBtnsAction(allBtns.slice(-7)));
            }
        }
    }, [resStartIndex]);

    const handleClick = (btn) => {
        dispatch(switchPageAction((btn - 1) * resMaxItems));
    };

    const onPrevClick = () => {
        dispatch(switchPageAction(resStartIndex - resMaxItems));
    };

    const onNextClick = () => {
        dispatch(switchPageAction(resStartIndex + resMaxItems));
    };

    const firstBtnClick = () => {
        dispatch(switchPageAction(0));
        dispatch(renderBtnsAction(allBtns.slice(0, 7)));
    };

    const lastBtnClick = () => {
        dispatch(
            switchPageAction((allBtns[allBtns.length - 1] - 1) * resMaxItems),
        );
    };

    const [pageNumValue, setPageNumValue] = useState("");

    const setPage = (e) => {
        setPageNumValue(e.target.value);
    };

    const goToPage = () => {
        if (pageNumValue <= 0) {
            dispatch(switchPageAction(0));
            setPageNumValue("");
        }
        if (pageNumValue > allBtns.length) {
            dispatch(switchPageAction((allBtns.length - 1) * resMaxItems));

            setPageNumValue("");
        }
        if (pageNumValue > 0 && pageNumValue <= allBtns.length) {
            dispatch(switchPageAction((pageNumValue - 1) * resMaxItems));
            setPageNumValue("");
        }
    };

    useEffect(async () => {
        if (genre) {
            console.log("first res");

            dispatch(pageLoaderAction(true));

            if (typeof cancelToken != typeof undefined) {
                cancelToken.cancel("Operation canceled due to new request.");
            }

            cancelToken = axios.CancelToken.source();

            try {
                const res = await getData.getAll(
                    searchType,
                    searchValue,
                    resMaxItems,
                    resStartIndex,
                    { cancelToken: cancelToken.token },
                );
                console.log(res.totalItems);
                if (res.items) {
                    dispatch(pageLoaderAction(false));
                    dispatch(resTotalItemsAction(res.totalItems));
                    dispatch(booksToPageAction(getData.getBookInfo(res.items)));
                }
                if (!res.items) {
                    console.log("пустой ответ");
                }

                dispatch(searchTypeAction("intitle"));
            } catch (error) {
                console.log(error);
            }
        }

        if (resTotalItems && !genre) {
            dispatch(pageLoaderAction(true));

            if (typeof cancelToken != typeof undefined) {
                cancelToken.cancel("Operation canceled due to new request.");
            }

            cancelToken = axios.CancelToken.source();

            try {
                console.log("sec res");

                const res = await getData.getAll(
                    searchType,
                    searchValue,
                    resMaxItems,
                    resStartIndex,
                    { cancelToken: cancelToken.token },
                );
                if (res.items) {
                    dispatch(pageLoaderAction(false));
                    dispatch(resTotalItemsAction(res.totalItems));
                    dispatch(booksToPageAction(getData.getBookInfo(res.items)));
                }
                if (!res.items) {
                    console.log("пустой ответ");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [resStartIndex, clickOnAuthor, genre]);

    return (
        <div className="pagination-list__wrapper">
            <div
                className={
                    allBtns.length > 5
                        ? "pagination-list__page-switch"
                        : "hide-btn"
                }
            >
                <input
                    className="pagination-list__page-number"
                    type="number"
                    onChange={setPage}
                    value={pageNumValue}
                    placeholder="стр."
                />
                <button
                    className="pagination-list__page-switch-btn"
                    onClick={goToPage}
                >
                    <svg
                        width="16"
                        height="25"
                        viewBox="0 0 16 25"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.01195 23.8575L15.5219 12.3475C15.6105 12.254 15.6599 12.1302 15.6599 12.0015C15.6599 11.8727 15.6105 11.7489 15.5219 11.6554L4.01195 0.14345C3.96653 0.0979745 3.9126 0.0618981 3.85323 0.0372838C3.79386 0.0126694 3.73022 0 3.66595 0C3.60168 0 3.53804 0.0126694 3.47867 0.0372838C3.4193 0.0618981 3.36537 0.0979745 3.31995 0.14345L0.14295 3.32045C0.051413 3.41213 0 3.53639 0 3.66595C0 3.79551 0.051413 3.91977 0.14295 4.01145L8.13295 12.0015L0.14295 19.9914C0.0543994 20.0849 0.00504303 20.2087 0.00504303 20.3375C0.00504303 20.4662 0.0543994 20.59 0.14295 20.6835L3.31795 23.8584C3.36347 23.9041 3.41755 23.9403 3.4771 23.965C3.53664 23.9898 3.60048 24.0025 3.66495 24.0025C3.72942 24.0025 3.79326 23.9898 3.8528 23.965C3.91235 23.9403 3.96643 23.9041 4.01195 23.8584V23.8575Z"
                            fill="#2B3016"
                        />
                    </svg>
                </button>
            </div>

            <div className="pagination-list__inner">
                <div
                    className={
                        resStartIndex / resMaxItems + 1 > 4 &&
                        allBtns.length > 6
                            ? "pagination-list__btn-wrapper"
                            : "hide-btn"
                    }
                >
                    <button
                        className="pagination-list__btn-to-start"
                        onClick={firstBtnClick}
                    >
                        {allBtns[0]}
                    </button>
                    <span>...</span>
                </div>
                <div
                    className={
                        resStartIndex / resMaxItems + 1 <
                            allBtns[allBtns.length - 4] && allBtns.length > 6
                            ? "pagination-list__btn-wrapper"
                            : "hide-btn"
                    }
                >
                    <span>...</span>
                    <button
                        className="pagination-list__btn-to-end"
                        onClick={lastBtnClick}
                    >
                        {allBtns[allBtns.length - 1]}
                    </button>
                </div>

                <button
                    className={
                        allBtns.length > 5
                            ? "pagination-list__arrow"
                            : "hide-btn"
                    }
                    onClick={onPrevClick}
                    disabled={resStartIndex === 0 ? true : false}
                >
                    <svg
                        height="14"
                        viewBox="0 0 16 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.8183 23.8566L0.307688 12.3464C0.219408 12.2529 0.170227 12.1293 0.170227 12.0007C0.170227 11.8721 0.219408 11.7485 0.307688 11.655L11.8188 0.143436C11.9105 0.0517515 12.0348 0.000244141 12.1645 0.000244141C12.2941 0.000244141 12.4185 0.0517515 12.5102 0.143436L15.6874 3.31875C15.7791 3.41044 15.8306 3.53479 15.8306 3.66445C15.8306 3.79411 15.7791 3.91847 15.6874 4.01015L7.69659 12L15.6874 19.9903C15.7758 20.0837 15.825 20.2074 15.825 20.336C15.825 20.4646 15.7758 20.5883 15.6874 20.6817L12.5116 23.8566C12.4662 23.9022 12.4121 23.9385 12.3527 23.9632C12.2932 23.988 12.2294 24.0007 12.165 24.0007C12.1005 24.0007 12.0367 23.988 11.9772 23.9632C11.9178 23.9385 11.8637 23.9022 11.8183 23.8566Z"
                            fill="#2B3016"
                        />
                    </svg>
                </button>
                <button
                    className={
                        allBtns.length > 5
                            ? "pagination-list__arrow"
                            : "hide-btn"
                    }
                    onClick={onNextClick}
                    disabled={
                        !(resStartIndex / resMaxItems < allBtns.length - 1)
                            ? true
                            : false
                    }
                >
                    <svg
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0)">
                            <path
                                d="M8.18169 23.8566L19.6923 12.3464C19.7806 12.2529 19.8298 12.1293 19.8298 12.0007C19.8298 11.8721 19.7806 11.7485 19.6923 11.655L8.18122 0.143436C8.08953 0.0517515 7.96518 0.000244141 7.83552 0.000244141C7.70585 0.000244141 7.5815 0.0517515 7.48981 0.143436L4.31263 3.31875C4.22094 3.41044 4.16943 3.53479 4.16943 3.66445C4.16943 3.79411 4.22094 3.91847 4.31263 4.01015L12.3034 12L4.31263 19.9903C4.22424 20.0837 4.17499 20.2074 4.17499 20.336C4.17499 20.4646 4.22424 20.5883 4.31263 20.6817L7.48841 23.8566C7.53384 23.9022 7.58785 23.9385 7.64734 23.9632C7.70683 23.988 7.77062 24.0007 7.83505 24.0007C7.89947 24.0007 7.96326 23.988 8.02275 23.9632C8.08224 23.9385 8.13625 23.9022 8.18169 23.8566Z"
                                fill="#2B3016"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>

                <ul className="pagination-list">
                    {renderBtns
                        ? renderBtns.map((btn, index) => {
                              return (
                                  <li
                                      className="pagination-list__item"
                                      key={index}
                                  >
                                      <button
                                          className={
                                              (btn - 1) * resMaxItems ===
                                              resStartIndex
                                                  ? "pagination-list__btn pagination-list__btn--active"
                                                  : "pagination-list__btn"
                                          }
                                          onClick={() => handleClick(btn)}
                                      >
                                          {btn}
                                      </button>
                                  </li>
                              );
                          })
                        : resTotalItems}
                </ul>
            </div>
        </div>
    );
};

export default React.memo(PaginationList);
