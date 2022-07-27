import { React, useState ,useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import './home.css'
import { db, auth } from '../Firebase/fireBase';
import { collection, doc, addDoc, updateDoc, getDoc, setDoc, getDocs } from "firebase/firestore"
import styles from "./form.module.css"
import { onAuthStateChanged } from '@firebase/auth';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Graph from './Graph';

// const percentage = 66;

function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

let date = new Date();
let month = pad2(date.getMonth()+1);//months (0-11)
let day = pad2(date.getDate());//day (1-31)
let year= date.getFullYear();
let formattedDate =  year+"-"+month+"-"+day;

function Home() {
    const [taskModal, setTaskModal] = useState(false);
    const [task, setTask] = useState("")
    const [desc, setDesc] = useState("")
    const [date1, setDate] = useState("")
    const [data, setData] = useState(); //current data of user
    const [allTasks, setAllTasks] = useState();
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
          //load user data
          const userData = await getDoc(doc(db, "users", user.uid));
          setData(userData.data());
    
          //load all tasks
          const querySnapshot = await getDocs(
            collection(db, "users/" + user.uid + "/tasks")
          );
          setAllTasks(querySnapshot.docs);
        });
      }, []);

    async function addData() {
        const dataDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (dataDoc.exists()) {
            const currentTaskNo = dataDoc.data().totalTasks
            addDoc(collection(db, "users/" + auth.currentUser.uid + "/tasks"), {
                task: task,
                desc: desc,
                date: date1,
                completed: false,
                taskNo: currentTaskNo + 1,
            }).then(() => {
                updateDoc(doc(db, "users", auth.currentUser.uid), {
                    totalTasks: currentTaskNo + 1
                })
            })
        } else {
            addDoc(collection(db, "users/" + auth.currentUser.uid + "/tasks"), {
                task: task,
                desc: desc,
                date: date1,
                completed: false,
                taskNo: 1,
            }).then(() => {
                setDoc(doc(db, "users", auth.currentUser.uid), {
                    totalTasks: 1,
                    completedTasks: 0,
                })
            }
            )
        }
    }

    const user = auth.currentUser;
  
    onAuthStateChanged((auth),async (user) => {
      const querySnapshot = await getDocs(collection(db, "users/" + user.uid + "/tasks"));
      setAllTasks(querySnapshot.docs);
    })

    

    return (
        <div>
            <Navbar />
            <div className="mbox">
                {taskModal &&
                    (<form className={styles.form} onSubmit={(e) => { e.preventDefault(); addData() }}>
                        <div className={styles.modal}>
                            <div onClick={() => { setTaskModal(false) }}>hide</div>
                            <div>
                                <input type="text" id="task" className="taskName" placeholder="Task" onChange={e => setTask(e.target.value)} />
                                <label>Task</label>
                            </div>
                            <div>
                                <input type="text" id="description" className="taskName" placeholder="What do you need to do?" onChange={e => setDesc(e.target.value)} />
                                <label>Description</label>
                            </div>
                            <div>
                                <input type="date" onChange={e => setDate(e.target.value)} />
                                <label>Due Date</label>
                            </div>
                            <div>
                                <button type='submit'>Add task</button>
                            </div>
                        </div>
                    </form>)
                }
                <div>
                    <button className="btn" onClick={() => { setTaskModal(true) }}>New Task</button>
                    <span></span>
                </div>
                <div className="hd1">
                <div>
                    <div className={styles.hero}>
                    <h3>Today's Tasks ({formattedDate})</h3>
                        <div className={styles.allTasks}>
                        {allTasks && allTasks.map((task0) => {
                            const task3 = task0.data();
                            if(task3.date === formattedDate){
                                return (
                                    <div className={styles.card}>
                                    <h4 className={styles.cardHeader}>
                                        {task3.task}
                                    </h4>
                                    </div>
                                )}
                            // if(task.date != formattedDate){
                            //     return(
                            //         <div className={styles.card}>
                            //             <h4 className={styles.cardHeader}>
                            //                 There is no task today
                            //             </h4>
                            //         </div>
                            //     )
                            // }
                        })}
                        </div>
                    </div>
                    </div>
                </div>
                <div className="hd2">
                    <p className='hd21'>Your Statistic</p>
                    <div className='graph2'>
                        <Graph/>
                    </div>
                </div>
                <div className="hd3">
                    <p className='hd31'>Your Progress</p>
                    <div>
                    {data && (
                        <div className="circle1">
        
                            <CircularProgressbar value={Math.round(data.completedTasks / data.totalTasks * 100)} text={`${Math.round(data.completedTasks / data.totalTasks * 100)}%`} />
                            <div>
                            <p>Total Tasks : {data.totalTasks} </p>
                            <p>Completed : {data.completedTasks} </p>
                            <p>Uncompleted : {data.totalTasks - data.completedTasks} </p></div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home