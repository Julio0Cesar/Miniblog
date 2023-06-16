import React from 'react'
import useAuthentication from '../../hooks/useAuthentication'

const Dashboard = () => {

  const {logout} = useAuthentication()

  return (
    <div>
      <form>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <button onClick={logout}>Sign Out</button>
      </form>
    </div>
  )
}

export default Dashboard