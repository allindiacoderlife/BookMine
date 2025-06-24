import React from 'react'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import BookForm from '../../components/admin/forms/BookForm'
const BookNew = () => {
  return (
    <>
        <Button asChild className='back-btn'>
            <Link to="/admin/books">Go Back</Link>
        </Button>

        <section className='w-full max-w-2xl'>
            <BookForm />
        </section>
    </>
  )
}

export default BookNew