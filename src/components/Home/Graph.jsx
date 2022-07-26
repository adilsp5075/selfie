
import React,{useState,useEffect} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import "./graph.css";
import { db, auth } from '../Firebase/fireBase';
import { collection, doc, getDocs, updateDoc, deleteDoc,getDoc, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from '@firebase/auth';




export default function Graph() {

  const [allTasks, setAllTasks] = useState();
  const [data1, setData] = useState();
  const user1 = auth.currentUser;

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

  // const data = [
    
  //   {
  //     name: "Tasks",
  //     completed:  data1.completedTasks,
  //     incompleted: data1.totalTasks - data1.completedTasks,
  //     total: data1.totalTasks
  //   },
  // ];
  const data = [
    {
      name: "Page A",
      completed: 4000,
      incompleted: 2400,
      total: 2400
    },
    {
      name: "Page B",
      completed: 3000,
      incompleted: 1398,
      total: 2210
    },
    {
      name: "Page C",
      completed: 2000,
      incompleted: 9800,
      total: 2290
    },
    {
      name: "Page D",
      completed: 2780,
      incompleted: 3908,
      total: 2000
    },
    {
      name: "Page E",
      completed: 1890,
      incompleted: 4800,
      total: 2181
    },
    {
      name: "Page F",
      completed: 2390,
      incompleted: 3800,
      total: 2500
    },
    {
      name: "Page G",
      completed: 3490,
      incompleted: 4300,
      total: 2100
    }
  ];
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="incompleted" fill="#8884d8" />
      <Bar dataKey="completed" fill="#82ca9d" />
    </BarChart>
  );
}

