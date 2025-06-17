import React from 'react';
import TeaCard from './TeaCard';
import { useState } from 'react';

export default function TeaList({
  teas,
  onDelete,
  onEdit,
  showPopUp,
  setShowPopUp,
  updateTea,
}) {
  // if there are no teas then display message
  if (teas.length === 0) {
    return <p className='tea-list__empty'>No teas added yet.</p>;
  }
  // if we have teas then loop over each tea and render a tea card
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
      }}
    >
      {teas.map((tea) => (
        // transforms each object into react element
        <TeaCard
          key={tea._id}
          tea={tea}
          onDelete={onDelete}
          onEdit={onEdit}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          updateTea={updateTea}
        />
      ))}
    </div>
  );
}
