import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useBookQuery } from '../services/booksApi';
import './Info.css';

const Info = () => {
  const { id } = useParams();
  const { data, error } = useBookQuery(id!);

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong');
    }
  }, [error]);
  return (
    <div style={{ marginTop: '150px' }}>
      <div className='card'>
        <div className='card-header'>
          <p>Book Detail</p>
        </div>
        <div className='container'>
          <br />
          <br />
          <strong>Title: </strong>
          <span>{data && data.title}</span>
          <br />
          <br />
          <strong>Author: </strong>
          <span>{data && data.author}</span>
          <br />
          <br />
          <strong>Description: </strong>
          <span>{data && data.description}</span>
          <br />
          <br />
          <Link to='/'>
            <button className='btn btn-edit'>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
