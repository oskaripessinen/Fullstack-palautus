const Part = ({name, exercises}) => (
    <div>
      {name} {exercises}
    </div>
  )
  
  const Total = ({course}) => {
    const total = course.parts.reduce((total, part) => total + part.exercises, 0);
  
  
    return (
      <div>
        total exercises {total}
      </div>
    )
  }
  
  
  
  const Course = ({course}) => {
    return (
      <div>
        <h1>{course.name}</h1>
        <div>
          {course.parts.map(obj => 
            <Part key={obj.id} name={obj.name} exercises={obj.exercises} />
          )}
  
          <Total course={course}/>
        </div>
      </div>
    )
  }

  export default Course