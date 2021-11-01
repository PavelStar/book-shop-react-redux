import axios from "axios";



export default class BooksService {

    async getAll(searchType, searchValue, maxResults, startIndex, cancel ) {
        

        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchType}:${searchValue}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}`, cancel)
        return response.data
    }

   

    getBookInfo(response) {

        if (response) {
            return response.map((item) => {
                return ({
                    image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : null,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors ? item.volumeInfo.authors[0] : item.volumeInfo.authors,
                    price: item.saleInfo.listPrice ? Math.floor(item.saleInfo.listPrice.amount) : 99,
                    pageCount: item.volumeInfo.pageCount,
                    publishedDate: item.volumeInfo.publishedDate,
                    description: item.volumeInfo.description,
                    genre: item.volumeInfo.categories ? item.volumeInfo.categories : 'Другое',
                    id: item.id
                })
            })
        }

        
    }
    
}

