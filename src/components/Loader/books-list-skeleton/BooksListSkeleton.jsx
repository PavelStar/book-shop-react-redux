// import React from 'react'
import './books-list-skeleton.scss'

// const BooksListSkeleton = () => {
//     return (
//         <ul className="book-list-skeleton">
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>
//                 <li>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </li>


//             </ul>
//     )
// }

// export default BooksListSkeleton


import React from "react"
import ContentLoader from "react-content-loader"

const BooksListSkeleton = (props) => (
  <ContentLoader 
    speed={1}
    width={220}
    height={390}
    viewBox="0 0 220 390"
    backgroundColor="#e6e5e5"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="220" height="250" /> 
    <rect x="83" y="102" rx="0" ry="0" width="1" height="1" /> 
    <rect x="0" y="275" rx="5" ry="5" width="220" height="20" /> 
    <rect x="0" y="308" rx="5" ry="5" width="220" height="20" /> 
    <rect x="119" y="355" rx="10" ry="10" width="100" height="35" /> 
    <rect x="0" y="358" rx="10" ry="10" width="87" height="25" />
    
  </ContentLoader>
  
)

export default BooksListSkeleton