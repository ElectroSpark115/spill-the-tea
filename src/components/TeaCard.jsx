import React from 'react';
import TeaPopUp from './TeaPopUp';
import TeaForm from './TeaForm';
import { useState } from 'react';
TeaForm;
export default function TeaCard({
  tea,
  onDelete,
  onEdit,
  showPopUp,
  setShowPopUp,
  updateTea,
}) {
  const [idOfEditCard, setIdOfEditCard] = useState('');
  const {
    _id,
    name,
    origin,
    caffeineLevel,
    image, //optional
    type,
    description,
    color, //optional
  } = tea;

  function handleEdit(e) {
    console.log('name', name);
    console.log('e.target', e.target._id);
    console.log('enter handle edit');
    setIdOfEditCard(_id);
    setShowPopUp(true);
    // {
    //   showPopUp ? <TeaPopUp /> : <></>;
    // }
    //return <div>hi</div>;
    // return <TeaForm />;
  }

  return showPopUp && idOfEditCard === _id ? (
    <TeaPopUp
      showPopUp={showPopUp}
      setShowPopUp={setShowPopUp}
      setIdOfEditCard={setIdOfEditCard}
      _id={_id}
      updateTea={updateTea}
    />
  ) : (
    <div
      className='tea-card'
      style={{
        //!moved most of this to App.css
        // backgroundColor: color,
        //padding: '4rem',
        //border: '2px solid #ccc',
        //borderRadius: '20px 20px 5px 5px',
        //boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        //width: '200px',
        //margin: '1rem auto',
        // position: 'relative',
        //...(color ? { borderColor: color } : {})
        //height: { image ? '20rem' : '15rem' },
        ...(image ? { height: '27rem' } : { height: '24rem' }),
      }}
    >
      {image && (
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: '150',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '10px',
            marginBottom: '0.5rem',
          }}
        />
      )}
      <h3 className='tea-card__name'>
        <u>{name}</u>
      </h3>
      <p className='tea-card__origin'>
        <strong>Origin:</strong> {origin}
      </p>
      <p className='tea-card__caffeine'>
        <strong>Caffeine Level:</strong> {caffeineLevel}
      </p>
      <p className='tea-card__type'>
        <strong>Type:</strong> {type}
      </p>
      <p className='tea-card__description'>{description}</p>
      <div className='card-buttons'>
        <button className='tea-card__remove' onClick={() => onDelete(_id)}>
          Remove
        </button>
        <button
          className='tea-card-edit'
          onClick={handleEdit}
          //   () => {
          //   console.log('edit clicked');
          //   //onEdit(tea);
          //   setShowPopUp(true);
          // }}
        >
          Edit
        </button>
        {/* {showComponent && <MyTargetComponent />} */}
        {/* {showPopUp ? <TeaPopUp /> : <></>} */}
        {/* {showPopUp ? <TeaPopUp /> : null} */}
        {/* { showPopUp && <TeaPopUp />} */}
      </div>
      <img src='/spilled-coffee-cups.png' className='spilled-coffee-cups'></img>
    </div>
  );
}
