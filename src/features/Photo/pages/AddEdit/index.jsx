import React from 'react';

import './styles.scss';
import Banner from 'components/Banner';
import PhotoForm from 'components/PhotoForm';
import { useDispatch } from 'react-redux';
import { addPhoto } from 'features/Photo/photoSlice';
import { useHistory } from 'react-router-dom';


AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleSubmit(values) {
    return new Promise((resolve) => {
      console.log('Form submit: ', values);
      setTimeout(() => {
        const actions = addPhoto(values);
        dispatch(actions);
        history.push('/photos');
        resolve(true);
      }, 2000);
    });

  }
  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo" />

      <div className="photo-edit__form">
        <PhotoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default AddEditPage;