import React, {useState} from 'react'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import TaskForm from './components/taskForm/TaskForm';
import TaskList from './components/taskList/TaskList';
import stylesModal from "./components/modal/Modal.module.scss";
import Modal from './components/modal/Modal';
import styles from './Todo-List.module.scss'

import {ITask} from './interfaces/Task'

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)
  
  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task)=>{
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if(display){
      modal!.classList.remove(stylesModal.hide)
    }else {
      modal!.classList.add(stylesModal.hide)
    }
  }

  const editTask = (task: ITask):void =>{
    hideOrShowModal(true)
    setTaskToUpdate(task)
}

  const updateTask = (id: number, title: string, difficulty: number | undefined ) =>{
    const updatedTask: ITask = {id, title, difficulty}

    const updatedItems = taskList.map((task)=> {
      return task.id === updatedTask.id ? updatedTask : task
    })
    setTaskList(updatedItems)
    hideOrShowModal(false)
  }

  return (
    <div className={styles.app}>
      <Modal children={<TaskForm btnText="Editar tarefa" taskList={taskList} task={taskToUpdate} handleUpdate={updateTask}/>} />
        <Header/>
            <TaskForm btnText="Criar tarefa" taskList={taskList} setTaskList={setTaskList}/>
            <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        <Footer/>
    </div>
  );
}

export default App;
