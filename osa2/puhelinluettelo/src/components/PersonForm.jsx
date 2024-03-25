const PersonForm = ({ text, inputValue, eventTarget}) => {
    return (
      <form>
        <div>{text} <input value={inputValue} onChange={eventTarget} /></div>
      </form>
    )
  }

export default PersonForm