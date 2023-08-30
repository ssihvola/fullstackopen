const Persons = ({ personArray }) => {
    return (
      <div>
        {personArray.map((person, index) => (
          <p key={index}>{person.name} {person.number}</p>
        ))}
      </div>
    )
  }

export default Persons