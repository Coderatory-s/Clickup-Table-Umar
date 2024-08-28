import React from 'react'
import TasksTable from '../components/todosTableComponent'
import tasks from '../todosData/todosData'

function page() {
  return (
    <div>
         <TasksTable tasks={tasks}/>
    </div>
  )
}

export default page