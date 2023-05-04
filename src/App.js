import './App.scss';
import React, { useState } from 'react';
import Domino from './data/domino.js';
import {postGetResultChain} from './data/dominoApi.js';

function App() {
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedDominos, setSelectedDominos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [resultString, setResultString] = useState('');
  const [resultJson, setResultJson] = useState([]);

  const numbers = [
    { FirstNumber: 0, LastNumber: 0 },
    { FirstNumber: 0, LastNumber: 1 },
    { FirstNumber: 0, LastNumber: 2 },
    { FirstNumber: 0, LastNumber: 3 },
    { FirstNumber: 0, LastNumber: 4 },
    { FirstNumber: 0, LastNumber: 5 },
    { FirstNumber: 0, LastNumber: 6 },
    { FirstNumber: 1, LastNumber: 1 },
    { FirstNumber: 1, LastNumber: 2 },
    { FirstNumber: 1, LastNumber: 3 },
    { FirstNumber: 1, LastNumber: 4 },
    { FirstNumber: 1, LastNumber: 5 },
    { FirstNumber: 1, LastNumber: 6 },
    { FirstNumber: 2, LastNumber: 2 },
    { FirstNumber: 2, LastNumber: 3 },
    { FirstNumber: 2, LastNumber: 4 },
    { FirstNumber: 2, LastNumber: 5 },
    { FirstNumber: 2, LastNumber: 6 },
    { FirstNumber: 3, LastNumber: 3 },
    { FirstNumber: 3, LastNumber: 4 },
    { FirstNumber: 3, LastNumber: 5 },
    { FirstNumber: 3, LastNumber: 6 },
    { FirstNumber: 4, LastNumber: 4 },
    { FirstNumber: 4, LastNumber: 5 },
    { FirstNumber: 4, LastNumber: 6 },
    { FirstNumber: 5, LastNumber: 5 },
    { FirstNumber: 5, LastNumber: 6 },
    { FirstNumber: 6, LastNumber: 6 },
  ];

  const filteredNumbers = numbers.filter((number) => number.FirstNumber === parseInt(selectedNumber));

  const handleChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  const handleSelectionChange = (FirstNumber, LastNumber) => {
    const selectedDomino = { FirstNumber, LastNumber };
    if (!selectedDominos.find((domino) => domino.FirstNumber === FirstNumber && domino.LastNumber === LastNumber)) {
      setSelectedDominos((prevSelectedDominos) => [...prevSelectedDominos, selectedDomino]);
    }
  };

  const handleClearSelections = () => {
    setSelectedDominos([]);
    setResultJson([])
  }

  const handleCalculate = async () => {
    const response = await postGetResultChain(selectedDominos);
    console.log(response);
    if(response === 400){
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }else{
      setResultString(response);
      setResultJson(response.map(str => {
        const match = str.match(/\[(\d+)\|(\d+)\]/);
        return {
          FirstNumber: match[1],
          LastNumber: match[2],
        };
      }));
    }
    
  };


  return (
    <div className="App">
      {showAlert && (
          <div className='alert alert-danger' role='alert' onClose={()=>setShowAlert(false)}>
            Cadena de domino inválida
          </div>
        )}
      <div className="container">
        <div className='row justify-content-md-center'>
          <div className='col-2'>
            <blockquote className='blockquote'>
              <h1 className='mb-0'>Domino</h1>
            </blockquote>
            </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-4">
            <select className="form-select" id="filter" value={selectedNumber} onChange={handleChange}>
            <option value="">Seleccione un número</option>
              {[0, 1, 2, 3, 4, 5, 6].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-10">
            {selectedNumber && (
              <div className="domino-container">
                {filteredNumbers.map((number, index) => (
                  <Domino
                    key={index}
                    FirstNumber={number.FirstNumber}
                    LastNumber={number.LastNumber}
                    onSelectionChange={handleSelectionChange}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='row justify-content-md-center'>
          <div className='col col-lg-10 domino-table'>
          <span className='buttons'>Fichas seleccionadas:</span>
            <div className="domino-container">
              {selectedDominos.map((domino, index) => (
                  <div  key={index} className="domino">
                    <div className="top">{domino.FirstNumber}</div>
                    <div className="bottom">{domino.LastNumber}</div>
                  </div>
              ))}
            </div>
          </div>
        </div>
        <div className='row justify-content-md-center'>
          <div className='col col-lg-3 buttons'>
            <button className="btn btn-primary calculate" onClick={handleCalculate}>Calcular</button>
            <button className="btn btn-secondary remove" onClick={handleClearSelections}>Limpiar</button>
          </div>
        </div>
        <div className='row justify-content-md-center'>
          <div div className='col col-lg-10 domino-table'>
          <span className='buttons'>Resultado:</span>
            <div className="domino-container">
                {resultJson.map((domino, index) => (
                  <div key={index} className="domino">
                    <div className="top">{domino.FirstNumber}</div>
                    <div className="bottom">{domino.LastNumber}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
