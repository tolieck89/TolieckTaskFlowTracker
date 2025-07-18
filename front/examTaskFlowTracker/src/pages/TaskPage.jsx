import TaskList from "../features/tasks/TaskList";
import {useEffect} from 'react'
import { useDispatch } from "react-redux";
import { fetchTasks } from "../features/tasks/TaskSlice";


const TaskPage = () => {

  
      const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

return (

<div style={{ padding: 24 }}>
          <h2>Задачі:</h2>


    <TaskList />

</div>
)
}
export default TaskPage;
