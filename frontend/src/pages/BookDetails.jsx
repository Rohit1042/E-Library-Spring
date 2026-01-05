import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../axios/api'

const BookDetails = () => {


  const [book, setBook] = useState();
  const { id } = useParams()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`)
        setBook(response.data)
      } catch (error) {
        console.error("Error fetching book details:", error)
      }
    }
    fetchBook();

  }, [id]);



  return (
    <div className=' items-center flex flex-col my-12 sm:my-24 justify-center'>
    
      <div className='flex-col bg-slate-50 p-4 shadow-sm'>
        
        {book && (
          <div className=' flex-col'>
            <h1 className=' text-3xl font-serif'>{book.title}</h1>
            <p className=' text-gray-600'>by {book.author}</p>
            <p className=' text-gray-500'>ISBN: {book.isbn}</p>
            <p className=' text-gray-500'>Genre: {book.genre}</p>
            <p className=' text-gray-500'>Total available: {book.availableCopies}</p>
            <p className=' text-gray-500'>Total copies: {book.totalCopies}</p>
            <p className=' text-gray-800'>Description: {book.description}</p>
          </div>
        )}

      </div>

    </div>

  )
}

export default BookDetails
