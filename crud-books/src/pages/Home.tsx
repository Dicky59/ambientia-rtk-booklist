import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useBooksQuery, useDeleteBookMutation } from '../services/booksApi';
import './Home.css';

const Home = () => {
  const { data, isLoading, error } = useBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  console.log('error', error);
  useEffect(() => {
    if (error) {
      toast.error('Something went wrong');
    }
  }, [error]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const handleDelete = async (id: any) => {
    if (window.confirm('Are you sure that you wanted to delete that book ?')) {
      await deleteBook(id);
      toast.success('Book Deleted Successfully');
    }
  };
  return (
    <div style={{ marginTop: '100px' }}>
      <Link to='/addBook'>
        <button className='btn btn-add'>Add Book</button>
      </Link>
      <br />
      <br />
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Title</th>
            <th style={{ textAlign: 'center' }}>Author</th>
            <th style={{ textAlign: 'center' }}>Description</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: any) => {
            return (
              <tr key={item.id}>
                <th scope='row'>{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.description}</td>
                <td>
                  <Link to={`/editBook/${item.id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button
                    className='btn btn-delete'
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/info/${item.id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
