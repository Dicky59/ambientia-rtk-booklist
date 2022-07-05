import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useAddBookMutation,
  useBookQuery,
  useUpdateBookMutation,
} from '../services/booksApi';
import './AddEdit.css';

const initialState = {
  title: '',
  author: '',
  description: '',
};

const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const { title, author, description } = formValue;
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, error } = useBookQuery(id!);

  useEffect(() => {
    if (error && id) {
      toast.error('Something went wrong');
    }
  }, [error, id]);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, data]);

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title && !author && !description) {
      toast.error('Please provide value into each input field');
    } else {
      if (!editMode) {
        await addBook(formValue);
        navigate('/');
        toast.success('Book Added Successfully');
      } else {
        await updateBook(formValue);
        navigate('/');
        setEditMode(false);
        toast.success('Book Updated Successfully');
      }
    }
  };
  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Enter title ...'
          value={title}
          onChange={handleInputChange}
        />
        <label htmlFor='author'>Author</label>
        <input
          type='text'
          id='author'
          name='author'
          placeholder='Enter author ...'
          value={author}
          onChange={handleInputChange}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          id='description'
          name='description'
          placeholder='Enter description. ...'
          value={description}
          onChange={handleInputChange}
        />
        <input type='submit' value={editMode ? 'Update' : 'Add'} />
      </form>
    </div>
  );
};

export default AddEdit;
