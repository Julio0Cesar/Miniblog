import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'
import styles from './TaskForm.module.scss'
import {ITask} from '../../interfaces/Task'

interface Props {
    btnText: string
    taskList: ITask[]
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
    task?: ITask | null
    handleUpdate?(id: number, title: string, difficulty: number | undefined): void
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {

    const [id, setId] = useState<number>(1)
    const [title, setTitle] = useState<string>("")
    const [difficulty, setDifficulty] = useState<number | undefined>(0)

    useEffect(() => {
        if(task){
            setId(task.id)
            setTitle(task.title)
            setDifficulty(task.difficulty)
        }
    }, [task])

    const addTaskHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (taskList) {
            if (handleUpdate) {
              handleUpdate(id, title, difficulty);
            } else {
              setId(id+1)
      
              const newTask: ITask = { id, title, difficulty };
      
              setTaskList!([...taskList, newTask]);
      
              setTitle("");
              setDifficulty(0);
            }
        }

    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "title"){
            setTitle(e.target.value)
        }else{
            setDifficulty(parseInt(e.target.value))
        }
    }
  return (
    <form className={styles.form} onSubmit={addTaskHandle}>
        <div className={styles.label}>
            <label htmlFor='title'>Titulo: </label>
            <input required type='text' name='title' autoComplete='off' placeholder='Titulo da tarefa' onChange={handleChange} value={title}/>
        </div>
        <div className={styles.label}>
            <label htmlFor='difficulty'>Dificuldade: </label>
            <input type='text' name='difficulty' autoComplete='off' placeholder='Dificuldade da tarefa' onChange={handleChange} value={difficulty}/>
        </div>
        <div className={styles.btn}>
            <input type='submit' value={btnText}/>
        </div>
    </form>
  )
}

export default TaskForm