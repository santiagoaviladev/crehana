import React from 'react'


const CountryInformation = ({item}) => {

    
    
    return ( 
        <div className="countryTable"> 
            <div className="countryName">{item.name} ({item.code})</div>
            <div className="countryInfo">
            <div className="info-row">
                    <div className="info-title">Capital: </div>
                    <div className="info-content"> {item.capital}</div>
                </div>
                <div className="info-row">
                    <div className="info-title">Moneda: </div>
                    <div className="info-content"> {item.currency}</div>
                </div>
                <div className="info-row">
                    <div className="info-title">Idioma: </div>
                    <div className="info-content"> {item.languages[0]?.name}</div>
                </div>
                <div className="info-row">
                    <div className="info-title">Phone Code: </div>
                    <div className="info-content">+{item.phone}</div>
                </div>
                <div className="info-row">
                    <div className="info-title">Región: </div>
                    <div className="info-content"> {item.continent.name}</div>
                </div>
               

            </div>
            
         </div> 
    )
}

CountryInformation.propTypes = {

}

export default CountryInformation
