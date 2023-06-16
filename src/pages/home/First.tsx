import React from 'react'
import styles from './First.module.scss'
import { Link } from 'react-router-dom'
import NavBar from '../../components/navbar/NavBar'
import todolistIM from '../../assets/todolist.png'
import miniBlogIM from '../../assets/miniblog.png'

const Home = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Oi eu sou o Júlio</p>
          <span className={styles.icons}>
            <h1>Front-End </h1> 
            <a href='https://www.linkedin.com/in/julio-cesar-rios/'><i className="bi bi-linkedin"></i></a>
            <a href='https://www.github.com/Kintiz'><i className="bi bi-github"></i> </a>
          </span>
          <h1>Developer</h1>
          <p className={styles.description}>Tenho 19 anos sou desenvolvedor front-end <br/>com foco em React-Typescript</p>
      </div>  
      <div className={styles.container2}>
            <div className={styles.content}>
              <h1>Projetos</h1>
            <div className={styles.projectArea}>
              <div className={styles.project}>
                <Link to='/Home'>
                  <img src={miniBlogIM} />
                  <span className={styles.esc}><i className="fi fi-brands-typescript"></i> + <i className="fa-brands fa-react"></i> + FIREBASE</span>
                  <span>Mini-Blog</span>
                </Link>
              </div>
              <div className={styles.project}>
                <Link to='/TodoList'> 
                  <img src={todolistIM} />
                  <span className={styles.esc}><i className="fi fi-brands-typescript"></i> + <i className="fa-brands fa-react"></i> + <i className="fa-brands fa-sass"></i></span>
                  <span>Todo-List</span>
                </Link>
              </div>
            </div>
          </div>
          <hr/>
          <div className={styles.skills}>
            <div className={styles.skillsIcons}>
              <h1>Habilidades</h1>
              <div className={styles.react}>
                <i className="fa-brands fa-react"></i>
              </div>
              <div className={styles.git}>
                <i className="fa-brands fa-git-alt"></i>
              </div>
              <div className={styles.sass}>
                <i className="fa-brands fa-sass"></i>
              </div>
              <div className={styles.ts}>
                <i className="fi fi-brands-typescript"></i>
              </div>
            </div>
          </div>
        <div className={styles.aboutText}>
          <div className={styles.about}>
            <h1>Sobre mim</h1>
            <p>Olá! Meu nome é Júlio e sou um entusiasta do desenvolvimento web,
              com um forte foco em React e TypeScript. Sou apaixonado por criar aplicações web 
              incríveis e funcionais que oferecem
              ótimas experiências aos usuários.</p>
              <p>
              Atualmente, estou dedicando meu tempo para aprimorar minhas habilidades em React 
              e TypeScript, explorando as melhores práticas e as últimas tendências do setor. 
              </p>
              <h3>
              Obrigado por visitar meu portifolio!
              </h3>
          </div>
        </div>
      </div>

    </div>
    
    </>
  )
}

export default Home