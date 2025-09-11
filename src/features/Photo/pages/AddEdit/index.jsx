import React from 'react';

import './styles.scss';
import Banner from 'components/Banner';
import PhotoForm from 'components/PhotoForm';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import { useHistory, useParams } from 'react-router-dom';


AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;
  const editedPhoto = useSelector(state => state.photos.find(photo => photo.id === Number(photoId)));

  const initialValues = isAddMode ? {
    id: 0,
    title: '',
    categoryId: null,
    photo: ''
  } : editedPhoto;
  function handleSubmit(values) {
    return new Promise((resolve) => {
      console.log('Form submit: ', values);
      setTimeout(() => {
        if (!photoId) {
          dispatch(addPhoto(values));
        } else {
          dispatch(updatePhoto(values));
        }

        history.push('/photos');
        resolve(true);
      }, 2000);
    });

  }
  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo" />

      <div className="photo-edit__form">
        <PhotoForm onSubmit={handleSubmit} initialValues={initialValues} />
      </div>
    </div>
  );
}

export default AddEditPage;