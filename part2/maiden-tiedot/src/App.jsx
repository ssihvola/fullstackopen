import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())  
  )

  return (
    <div>
      <Filter text="find countries" value={searchTerm} onChange={handleSearchChange} />

      <CountryList countryArray={filteredCountries} searchTerm={searchTerm} />
    </div>
  )

}

export default App
