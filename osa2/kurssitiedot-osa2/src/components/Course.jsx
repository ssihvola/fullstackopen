const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
  }
  
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)
  return <strong>total of {totalExercises} exercises</strong>
}

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
      <Total parts = {course.parts} />
    </div>
  )
}
  
export default Course  