import React from "react";
import { useSelector } from "react-redux";
import "./HistoryPage.scss";

const HistoryPage = () => {
    const myOrders = useSelector((state) => state.cartReducer.myOrders);

    return (
        <div className="history-page">
            <h1 className="history-page__title">История заказов</h1>
            <ul className="order-list">
                {myOrders
                    ? myOrders
                          .map((order, index) => {
                              return (
                                  <li className="order-list__item order-item">
                                      <div className="order-item__header">
                                          <div className="order-item__header-inner">
                                              <p className="order-item__number">
                                                  Заказ №{" "}
                                                  {order[index].orderNumber}
                                              </p>
                                              <p className="order-item__date">
                                                  {order[index].date}
                                              </p>
                                          </div>

                                          <p className="order-item__price-sum">
                                              Сумма: {order[index].orderSum}{" "}
                                              руб.
                                          </p>
                                      </div>

                                      {order.map((item) => {
                                          return (
                                              <div className="order-item__info-wrap">
                                                  <div className="order-item__time-wrap">
                                                      <p className="order-item__id">
                                                          Артикул: {item.id}
                                                      </p>
                                                  </div>
                                                  <div className="order-item__inner">
                                                      <div className="order-item__title-wrap">
                                                          <p className="order-item__title">
                                                              {item.title}
                                                          </p>
                                                          <p className="order-item__authors">
                                                              {item.authors}
                                                          </p>
                                                      </div>
                                                      <p className="order-item__price">
                                                          {item.price} руб.
                                                      </p>
                                                  </div>
                                              </div>
                                          );
                                      })}
                                  </li>
                              );
                          })
                          .reverse()
                    : null}
            </ul>
        </div>
    );
};

export default HistoryPage;
