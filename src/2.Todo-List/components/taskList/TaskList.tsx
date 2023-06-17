import React from 'react'
import { ITask } from '../../interfaces/Task'
import styles from './TaskList.module.scss'

type Props = {
    taskList: ITask[]
    handleDelete(id: number): void
    handleEdit(task: ITask): void
}

const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {
  return (
    <div className={styles.container}>
        <h2>Lista de tarefas</h2>
        {taskList.length > 0 ? (
            taskList.map((task)=>(
            <div key={task.id} className={styles.task}>
                <div className={styles.content}>
                    <div className={styles.titleDifficulty}>
                        <p>Tarefa: <span>{task.title}</span></p>
                        <p>Dificuldade: <span>{task.difficulty}</span></p>
                    </div>
                    <div className={styles.editDelete}>
                        <i className="bi bi-pencil" onClick={() => handleEdit(task)}></i>
                        <i className="bi bi-trash" onClick={()=>handleDelete(task.id)}></i>
                    </div>
                </div>
            </div>
            ))
        ): (
            <p>Adicione uma tarefa!</p>
        )}
    </div>
  )
}

export default TaskList