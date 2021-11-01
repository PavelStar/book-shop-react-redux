import React from 'react'
import { Link } from "react-router-dom"
import './History.scss'

const History = () => {
    return (
        <Link to="/history" className="history__link-wrap">
            <div className="history">
                <div className="history__icon-wrap">
                    <svg viewBox="0 0 30 24"  xmlns="http://www.w3.org/2000/svg">
                        <path d="M27 9H3C1.35 9 0 10.35 0 12C0 13.65 1.35 15 3 15H27C28.65 15 30 13.65 30 12C30 10.35 28.65 9 27 9Z" fill="#121215" />
                        <path d="M3 6H21C22.65 6 24 4.65 24 3C24 1.35 22.65 0 21 0H3C1.35 0 0 1.35 0 3C0 4.65 1.35 6 3 6Z" fill="#121215" />
                        <path d="M21 18H3C1.35 18 0 19.35 0 21C0 22.65 1.35 24 3 24H21C22.65 24 24 22.65 24 21C24 19.35 22.65 18 21 18Z" fill="#121215" />
                    </svg>
                </div>
                <p>История заказов</p>
            </div>
        </Link>
    )
}

export default History
