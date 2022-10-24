import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './list.css'
import Alert from './Alert'

function DataFetching() {

    const [posts,setPosts] = useState([])
    const [edited,setEdited] = useState(null)
    const [alert,setAlert] = useState({
        show:false,
        msg:'',
        type:'' 
        });
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts ')
        .then(res => {
            console.log(res)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    
    function removepost(id) {
        const newPosts = posts.filter((l) => l.id !==id)
        setPosts(newPosts);
        showAlert(true,'success','success')
    }

    function inputEdited (val)
    {
        setEdited(val.target.value)
        console.log(edited)
    }

    function editpost(id) {
        const newPosts = posts.map((l) => (
            l.id === id ? {...l, done: !l.done, title: edited} : l
        ))
        setPosts(newPosts);
        showAlert(true,'success','success')
    }

    const showAlert = (show=false,type='',msg='') => {
        setAlert({ show,type,msg})
      }

  return (
    
    <div className='posts'>
        {alert.show && <Alert {...alert} removeAlert={showAlert}
      posts={posts} />}
        
            {
            
                posts.map(post => <li key={post.id}>{post.title}
                <input onChange={inputEdited}/><span onClick={()=> editpost(post.id)}>EDIT</span>
                <span onClick={()=> removepost(post.id)} >DEL</span></li>)
            }
        
    </div>
  )
}

export default DataFetching