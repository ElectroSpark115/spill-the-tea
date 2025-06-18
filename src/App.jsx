import { useState } from 'react';
import './App.css';
import './signup-login.css'
import TeaForm from './components/TeaForm';
import TeaList from './components/TeaList';
import { useEffect } from 'react';

function App() {
  //const [count, setCount] = useState(0);
  // array of teas change back to ([]) when ready to add
  const [teas, setTeas] = useState([]);
  // add tea will be passed to TeaForm
  useEffect(() => {
    fetch('http://localhost:3000/api/teas')
      .then((res) => res.json())
      .then((data) => {
        console.log('tea data', data);
        setTeas(data);
      })
      .catch(console.error);
  }, []);

  const addTea = (teaInfo) => {
    setTeas((prev) => [...prev, { ...teaInfo, id: Date.now() }]);
  };

  const [teaBeingEdited, setTeaBeingEdited] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  const updateTea = (_id, updatedTea) => {
    fetch(`http://localhost:3000/api/teas/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTea),
    })
      .then((res) => {
        console.log('entered first then update tea here is the res', res);
        return res.json();
      })
      .then((savedTea) => {
        console.log('entered second then updateTea', savedTea);
        setTeas((prev) =>
          prev.map((tea) => (tea._id === savedTea._id ? savedTea : tea))
        );
        setTeaBeingEdited(null);
      })
      .catch(console.error);
  };

  const deleteTea = (_id) => {
    console.log('deleted tea id frontend', _id);
    fetch(`http://localhost:3000/api/teas/${_id}`, { method: 'DELETE' })
      .then(() => setTeas((prev) => prev.filter((t) => t._id !== _id)))
      .catch(console.error);
  };
  return (
    <div>
      <h1>Spill the Tea</h1>
      <TeaForm
        addTea={addTea}
        updateTea={updateTea}
        teaToEdit={teaBeingEdited}
        teas={teas}
      />

      <TeaList
        teas={teas}
        onDelete={deleteTea}
        onEdit={setTeaBeingEdited}
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        updateTea={updateTea}
      />
    </div>
  );
}

export default App;
