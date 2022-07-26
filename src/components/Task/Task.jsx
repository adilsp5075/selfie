import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import styles from "./task.module.css"


import { db, auth } from '../Firebase/fireBase';
import { collection, doc, getDocs, updateDoc, deleteDoc,getDoc, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from '@firebase/auth';


export default function Task() {


  const [allTasks, setAllTasks] = useState();

  const user = auth.currentUser;

  onAuthStateChanged((auth),async (user) => {
    const querySnapshot = await getDocs(collection(db, "users/" + user.uid + "/tasks"));
    setAllTasks(querySnapshot.docs);
  })

  const setCompleted = async (id) => {
    updateDoc(doc(db, "users/" + user.uid + "/tasks", id), {
      completed: true
    })
    //the following code will increment the completedTasks count
    const userData = await getDoc(doc(db, "users", auth.currentUser.uid));
    const completedTasks = userData.data().completedTasks + 1;

    updateDoc(doc(db, "users", auth.currentUser.uid), {
      completedTasks,
    });
  }

  const deleteTask = (id) => {
    deleteDoc(doc(db, "users/" + user.uid + "/tasks", id))
  }

  return (
    <div>
      <Navbar />
      <div className={styles.hero}>
        <h1>All Tasks</h1>
        <div className={styles.allTasks}>
          {allTasks && allTasks.map((doc1) => {
            const task = doc1.data();
            const taskNo = task.taskNo;
            return (
              <div className={styles.card}>
                <h3 className={styles.cardHeader}>
                  {task.task}
                </h3>
                <p>{taskNo}</p>
                <p className={styles.cardText}>{task.desc}</p>
                <p className={styles.cardDate}>{task.date}</p>
                <p className={styles.cardStatus}>{task.completed ? <span style={{ "color": "green" }}>Completed</span> : <span style={{ "color": "red" }}>Pending</span>}</p>
                {!task.completed &&
                  (<button onClick={() => setCompleted(doc1.id)}>done</button>)
                }
                <button onClick={() => deleteTask(doc1.id)}>Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
