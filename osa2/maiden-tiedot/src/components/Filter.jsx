const Filter = ({ text, value, onChange}) => {
  return (
    <form>
      <div>{text} <input value={value} onChange={onChange} /></div>
    </form>
  )
}

export default Filter