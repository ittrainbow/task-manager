import { Task, TaskList } from '.'

export const Home = () => {
  return (
    <div className="taskpage-container">
      <TaskList />
      <Task />
    </div>
  )
}
