import React, { useEffect } from 'react'

const Alert = ({type,msg,removeAlert,posts}) => {
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            removeAlert()
        },2000)
        return () => clearTimeout(timeout)
    },[posts])
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert