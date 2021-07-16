import React, {useState, useEffect} from 'react'
import Country from './../Classes/Country';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import CountryInformation from './CountryInformation';
import { useQuery, gql  } from "@apollo/client";
//import GETCOUNTRIES from '../Queries/getCountries.gql'
//import CountryInformation from './CountryInformation';

const getCountryNames = (countries)=>
{
 
    const options = []
    
    for(var i =0; i<countries.length;i++)
    {
        const option = { value: countries[i].name, label: countries[i].name }
        options.push(option)

    }
      
    return options
}


const getCountryCodes = (countries)=>
{

    const options = []

    for(var i =0; i<countries.length;i++)
    {
        const option = { value: countries[i].code, label: countries[i].code }
        options.push(option)

    }
      
    return options
}

const getCountryCurrencies = (countries)=>
{

    const options = []

    for(var i =0; i<countries.length;i++)
    {
        const actualCurrency = countries[i].currency
        
        if(!options.find(element=>actualCurrency===element.value))
        {
            const option = { value: countries[i].currency, label: countries[i].currency }
            options.push(option)
        }

    }
      
    return options
}

const getCountryLanguages = (countries)=>
{
    
    const options = []

    for(var i =0; i<countries.length;i++)
    {
        const actualLang = countries[i].languages[0]?.name
        
        if(!options.find(element=>actualLang===element.value))
        {
            const option = { value: countries[i].languages[0]?.name, label: countries[i].languages[0]?.name }
            if(countries[i].languages && countries[i].languages.length)
              options.push(option)
        }

    }
      
    return options

  
    
   
}

const getCountryRegions = (countries)=>
{
    
    const options = []

    for(var i =0; i<countries.length;i++)
    {
        const actualRegion = countries[i].continent.name
        
        if(!options.find(element=>actualRegion===element.value))
        {
            const option = { value: countries[i].continent.name, label: countries[i].continent.name }
          if(option.value!=="")
            options.push(option)
        }

    }
      
    return options

}

const renderInfo = (actualFIlter,countries) => {

    
    const {nombre, alphacode, languaje, currency, region} = actualFIlter
    let mainCountryName ="";
    let mainCountryAlpha = "";
    let  countriesToRender = [];
    let mainName =""
   
    if(nombre!=="")
    {
        mainCountryName = countries.filter(
            element=>
            (nombre===element.name) )

            if(mainCountryName.length)
            {
                mainName=nombre
            }
    } 
   
    if(alphacode!=="" ){

        mainCountryAlpha = countries.filter(
            element=>
            (alphacode===element.code && mainName!==element.code ))

           
    }

    

    if( languaje!=="" || currency!=="" || region!=="")
    {

     countriesToRender = countries.filter(
        element=>
        (element.name!==nombre && element.code!==alphacode) &&
        ((languaje===element.languages[0]?.name && element.languages[0]?.name!=="") ||
        (currency===element.currency && element.currency!=="") ||
        (region ===element.continent.name && element.continent.name!==""))
        )
    }
    
     
    
    const mainC = mainCountryName.length?
    
    <div className="flex-initial relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
     
        <h3>País con el nombre buscado:</h3>
        <CountryInformation  key={mainCountryName[0].code}  item={mainCountryName[0]}/>
    </div>
    </div>
  
    :""
    const mainA = mainCountryAlpha.length? 
    <div className="flex-initial  relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <h3>País con el código buscado:</h3>
        <CountryInformation  key={mainCountryAlpha[0].code}  item={mainCountryAlpha[0]}/>
    </div>
    </div>
    
    :""
  
    const todisplay = countriesToRender.map(item => <CountryInformation  key={item.code}  item={item}/>)
  
   
    return ( <div className="flex min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">

            {mainC} 
            {mainA} 
            <div className="list-countries">
            <h3>{todisplay.length? "Países que coinciden con tus criterios de búsqueda: " : "Puedes usar los filtros de arriba para mostrar la información de los países" }</h3>
            <div className="list-countries-display">
                {todisplay}
            </div>
            </div>

         </div>)
    
}

const CountryForm = () => {

 const [countries, setCountries] = useState([])
 const [actualFilter, setActualFilter] = useState(new Country())
 const [information, setInformation] = useState("Puedes usar los filtros de arriba para ver la información")

 const GETCOUNTRIES = gql`
 {
    countries
  {
    code
    name
    emoji
    native
    phone
    continent{
      code
      name
      
    }
    capital
    currency
    languages
    {
      code
      name
    }
    
  }
 }
`;


const { loading, error } = useQuery(GETCOUNTRIES, {
    fetchPolicy: "no-cache",
   
    onCompleted: (data) => setCountries(data.countries)
});








useEffect(() => {

    if(!loading && !error)
        setInformation(renderInfo(actualFilter, countries))
 
   
    
   
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [actualFilter]);


const countryNames = getCountryNames(countries)
const defCountry = countryNames.find(element=>actualFilter.nombre===element.value)

const countryAlpha = getCountryCodes(countries)
const defAlpha = countryAlpha.find(element=>actualFilter.alphacode===element.value)

const countryCurrencies = getCountryCurrencies(countries)
const defCurrency = countryCurrencies.find(element=>actualFilter.currency===element.value)

const countryLanguages = getCountryLanguages(countries)
const defLanguaje = countryLanguages.find(element=>actualFilter.languaje===element.value)


const countryRegions = getCountryRegions(countries)
const defRegions = countryRegions.find(element=>actualFilter.region===element.value)
    
   
    return ( !loading && !error ? 
        <div>
        <div className="countryFilters">
            <div className="formField">
                <label htmlFor="countryName">Nombre del País:</label>
                <Select  name="countryName" options={countryNames} value={defCountry} className="country-selector" 
                onChange= {()=> setActualFilter(new Country("", "", "", "", ""))  }/>
            </div>
            <div className="formField">
              <label htmlFor="alphACode">Código del País:</label>
              <Select name="alphACode" options={countryAlpha} value={defAlpha} className="country-selector" 
              onChange= {()=> setActualFilter(new Country("", "", "", "", ""))  } />
            
            </div>
            <div className="formField">
              <label htmlFor="idioma">Idioma:</label>
              <Select name="idioma" options={countryLanguages} value={defLanguaje} className="country-selector" 
              onChange= {()=> setActualFilter(new Country("", "", "", "", ""))  } />
            
               
            </div>
            <div className="formField">
                 <label htmlFor="currency">Moneda:</label>
                 <Select name="currency" options={countryCurrencies} value={defCurrency} className="country-selector" 
                 onChange= {()=> setActualFilter(new Country("", "", "", "", ""))  }/>
            
                 
            </div>
            <div className="formField">
               <label htmlFor="region">Región:</label>
               <Select name="region" options={countryRegions} value={defRegions} className="country-selector" 
                onChange= {()=> setActualFilter(new Country("", "", "", "", ""))  }/>
            
            </div>
            <div className="formField form-button">
            <Button variant="contained" color="primary" onClick={() => { setActualFilter(new Country(
                document.getElementsByName("countryName")[0].value, 
                document.getElementsByName("alphACode")[0].value, 
                document.getElementsByName("idioma")[0].value, 
                document.getElementsByName("currency")[0].value, 
                document.getElementsByName("region")[0].value
                )) }}>
                     Aplicar Filtro
            </Button>
            </div>
            <div className="formField form-button">
            <Button variant="contained" color="primary" onClick={() => { setActualFilter(new Country("", "", "", "", "")) }}>
                     Borrar Tablero 
            </Button>
            </div>
           
        </div>
        <hr></hr>
        <div className="countriesInformation">
            {information}
        </div>
        </div> : "Cargando datos...")
}

export default CountryForm
