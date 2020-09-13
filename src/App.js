import React, { useState, useEffect } from 'react';

import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
import { makeStyles, Modal, Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
 
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [posts, setPosts]=useState([]);
  const [openSignIn, setOpenSignIn]=useState(false)
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        console.log(authUser)
        setUser(authUser)

      }else{
        setUser(null)
      }
    })

    return () => {
      unsubscribe();   
    }

  }, [user, username])

   useEffect(() => {
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(docs =>({
        id: docs.id,
        post: docs.data()
      })))
    })
  }, [user, username])

  const signUp = (event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=> {
      return authUser.user.updateProfile({
        displayName: username
      })
      
    })
    .catch((error) => alert(error.message))

  }

  const signIn = (event)=>{
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
  setOpenSignIn(false)
  }
  return (
    <div className="app">
      <ImageUpload/>
      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="" />
            </center>
              <Input 
                placeholder= "email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

              <Input 
                placeholder= "password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={signIn}>Sign In </Button>

            
          </form>

        </div>
    </Modal>
      
      <div className="app__header">
         <img className="app__headerImage"
         src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
         alt="" />
      </div>

        {user ? (

            <Button onClick={()=> auth.signOut()}>Logout</Button>
        ):(
        <div className="app__loginContainer">
          <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={()=> setOpen(true)}>Sign up</Button>
          </div>
        )}



      <h1> hi i am hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</h1>
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>)
        )}
       

    </div>
  );
}

export default App;
