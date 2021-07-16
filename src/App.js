import { StrictMode, useEffect, useState } from 'react';
import CountryForm from './Components/CountryForm';
import Country from './Classes/Country'
import "./tailwind.output.css"


import './App.css';

function App() {

  
  const [country, setCountry] = useState(new Country());
  
 

  useEffect(() => {
    
    setCountry(new Country("", "","","","",""))
    
    return () => {
      
    }
  }, [])


  return (
    <StrictMode>
    <div className="App">
      <div className="header">
            Sistema para Información de Países
      </div>
      <div className="body">

        <div className="title">Selecciona el País para desplegar la información:</div>
        <div className="filters">
          <CountryForm actualCountry={country}></CountryForm>

        </div>
        <div className="info">

          {country.information}

        </div>

      </div>
      <div className="footer">
          Santiago Ávila | Prueba realizada para Crehana
      </div>
    </div>
    </StrictMode>
  );
}

export default App;
