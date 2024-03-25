import React from 'react'

const CountryList = ({ countryArray, searchTerm }) => {
  if (countryArray.length <= 10 && countryArray.length > 1) {
    return (
      <div>
          {countryArray.map((country, index) => (
            <div key={index}>
              {country.name.common}
            </div>
          ))}
      </div>
    )

  } else if (countryArray.length > 10 && searchTerm.length > 0) {
    return "Too many matches, specify another filter"

  } else if (countryArray.length === 1) {
    const country = countryArray[0]
    const languages = Object.values(country.languages)

    return (
      <div>
        <h1>{country.name.common}</h1>

        <div>capital {country.capital}</div>
        <div>area {country.area}</div>

        <h2>languages:</h2>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>
              {language}
            </li>
          ))}
        </ul>

        <img src={country.flags.png} />
      </div>
    )
    
  } else {
    return null
  }
}

export default CountryList