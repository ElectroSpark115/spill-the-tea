import React from 'react';
import { useState } from 'react';

const TeaPopUp = ({
  showPopUp,
  setShowPopUp,
  setIdOfEditCard,
  _id,
  updateTea,
}) => {
  //   console.log('TeaPopUp');
  //   return (
  //     <div style={{ background: 'pink' }}>
  //       <h1>This is pop up</h1>
  //     </div>
  //   );
  const updateTeaFromForm = (formData) => {
    const teaInfo = {};
    // const { name } = formData;
    // console.log('name', name);
    if (formData.get('name') != '') {
      teaInfo.name = formData.get('name');
    }
    if (formData.get('origin') != '') {
      teaInfo.origin = formData.get('origin');
    }
    if (formData.get('caffeineLevel') != '') {
      teaInfo.caffeineLevel = formData.get('caffeineLevel');
    }
    if (formData.get('image') != '') {
      teaInfo.image = formData.get('image');
    }
    if (formData.get('type') != '') {
      teaInfo.type = formData.get('type');
    }
    if (formData.get('description') != '') {
      teaInfo.description = formData.get('description');
    }
    if (formData.get('color') != '') {
      teaInfo.color = formData.get('color');
    }

    console.log('teaInfo', JSON.stringify(teaInfo));
    // addTea(teas.push(teaInfo)); //for when not connected to backend
    updateTea(_id, teaInfo);
    // fetch(`http://localhost:3000/api/teas/${_id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(teaInfo),
    // })
    //   .then((res) => {
    //     console.log('first then');
    //     return res.json();
    //   })
    //   .then((data) => {
    //     //add new card to state to update tea list
    //     console.log('second then');
    //     addTea(data);
    //     console.log('tea added:', data);

    //     // const addTea = (teaInfo) => {
    //     //     setTeas((prev) => [...prev, { ...teaInfo, id: Date.now() }]);
    //     //   };
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    // const updateTea = (_id, updatedTea) => {
    // fetch(`http://localhost:3000/api/teas/${_id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(teaInfo),
    // })
    //   .then((res) => res.json())
    //   .then((savedTea) => {
    //     setTeas((prev) =>
    //       prev.map((tea) => (tea._id === savedTea._id ? savedTea : tea))
    //     );
    setShowPopUp(false);
    setIdOfEditCard(null);

    //};
  };

  return (
    <form className='addTeaForm' action={updateTeaFromForm}>
      <label htmlFor='name'>
        <span>Tea name:</span>
        <input type='text' id='name' name='name' />
      </label>
      <label htmlFor='origin'>
        <span>Tea origin:</span>
        <input type='text' id='origin' name='origin' />
      </label>
      <label htmlFor='caffeineLevel'>
        <span> Caffeine Level:</span>
        <input
          defaultChecked
          type='radio'
          name='caffeineLevel'
          id='none'
          value='none'
        />
        <label htmlFor='none'>None</label>
        <input
          required
          type='radio'
          name='caffeineLevel'
          id='low'
          value='low'
        />
        <label htmlFor='low'>Low</label>
        <input
          required
          type='radio'
          name='caffeineLevel'
          id='medium'
          value='medium'
        />
        <label htmlFor='medium'>Medium</label>
        <input
          required
          type='radio'
          name='caffeineLevel'
          id='high'
          value='high'
        />
        <label htmlFor='high'>High</label>
      </label>
      <label htmlFor='image'>
        <span>Tea image:</span>
        <input type='text' id='image' name='image' />
      </label>
      <label htmlFor='type'>
        <span>Tea type:</span>
        <input type='text' id='type' name='type' />
      </label>
      <label htmlFor='description'>
        <span>Tea description:</span>
        <input type='text' id='description' name='description' />
      </label>
      <label htmlFor='color'>
        <span>Tea color:</span>
        <input type='text' id='color' name='color' />
      </label>
      <button type='submit'> Edit your tea! </button>
    </form>
  );
};

export default TeaPopUp;
