import React from 'react'
import Button from './Button'

const Persons = ({ personArray, removeName }) => {
  return (
    <div>
      {personArray.map((person, index) => (
        <p key ={index}>
          {person.name} {person.number} 
          {" "}
          <Button 
            buttonAction={() => removeName(person.id, person.name)} 
            buttonText="delete" 
          />
        </p>
      ))}
    </div>
  )
}

export default Persons