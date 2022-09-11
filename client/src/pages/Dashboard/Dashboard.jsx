import React, { useState } from "react";
import NewTask from "./NewTask";
import { CheckCircledIcon, TrashIcon,PlusCircledIcon } from "@radix-ui/react-icons";
import { useOutletContext } from "react-router-dom";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { CircularProgressbar } from 'react-circular-progressbar';
import {
  collection,
  doc,
  query,
  where,
  deleteDoc,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import today from "../../utils/getDate";


export default function Dashboard() {
  const [newTask, setNewTask] = useState(false);
  const [authData, setAuthData] = useOutletContext(); //read auth data from _applayout.jsx
  const [todaysTasks, loading, error] = useCollection(
    query(
      collection(db, "users/" + authData.uid + "/tasks"),
      where("date", "==", today)
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [stats, loading2, error2] = useDocument(
    doc(db, "users/" + authData.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const setCompleted = async (id) => {
    updateDoc(doc(db, "users/" + authData.uid + "/tasks", id), {
      completed: true,
    });
    //the following code will increment the completedTasks count
    const userData = await getDoc(doc(db, "users", authData.uid));
    const completedTasks = userData.data().completedTasks + 1;

    updateDoc(doc(db, "users", authData.uid), {
      completedTasks,
    });
  };
  const deleteTask = async (id) => {
    deleteDoc(doc(db, "users/" + authData.uid + "/tasks", id));
    //the following code will increment the completedTasks count
    const userData = await getDoc(doc(db, "users", authData.uid));
    const deletedTasks = userData.data().deletedTasks + 1;

    updateDoc(doc(db, "users", authData.uid), {
      deletedTasks,
    });
  };

  return (
    <div className="relative bg-gray-200 dark:bg-gray-800 w-11/12 h-5/6 rounded-2xl grid place-items-center">
      {!newTask && (
        <div
          className="flex items-center absolute right-0 top-0 p-1 px-2 m-3 rounded bg-green-800 hover:bg-green-900 cursor-pointer"
          onClick={() => {
            setNewTask(true);
          }}
        >
          New Task <PlusCircledIcon className="ml-2" />
        </div>
      )}
      {newTask && <NewTask setNewTask={setNewTask} />}

      <div className="w-full break-words">
      <h1 className="p-2 font-bold text-2xl">Today's Task</h1>
      {todaysTasks && todaysTasks.empty && <p>There is no task for today :(</p>}
      {todaysTasks && (
        <section className="w-fit max-w-2xl flex flex-wrap whitespace-normal">
          {todaysTasks.docs.map((doc) => (
            <div className="taskCard" key={doc.id}>
              <span 
              className="text-red-600 hover:text-red-400 cursor-pointer absolute top-0 right-0 p-3"
              onClick={() => deleteTask(doc.id)}
              >
                <TrashIcon />{" "}
              </span>
              <p className="text-lg pb-2">{doc.data().task}</p>
              <div className="flex items-center">
                {doc.data().completed === true ? (
                  <span className= "taskStatus bg-green-600 dark:bg-green-800/60">
                    Completed
                  </span>
                ) : (
                  <>
                    <span className="taskStatus bg-red-600 dark:bg-red-800/60">
                      Pending
                    </span>
                    <span
                      className="text-green-600 hover:text-green-400 cursor-pointer absolute top-0 right-0 p-3 mr-7"
                      onClick={() => setCompleted(doc.id)}
                    >
                      <CheckCircledIcon />{" "}
                    </span>
                  </>
                )}
                {doc.data().date === "" ? (
                  <p className="bg-gray-900 px-2 text-sm w-max rounded">
                    no due date
                  </p>
                ) : (
                  <p className="bg-gray-900 px-2 text-sm w-max rounded">
                    {doc.data().date}
                  </p>
                )}
                </div>
              <hr className="opacity-50 my-3" />
              <p>{doc.data().desc}</p>
            </div>
          ))}
        </section>
      )}
      </div>
      {stats && <span>Document: {JSON.stringify(stats.data())}</span>}
      <div>
        {/* {stats && (
          <div >
            <CircularProgressbar value={Math.round(stats.data().completedTasks / stats.data().totalTasks*100)} text={`${Math.round(stats.data().completedTasks / stats.data().totalTasks*100)}`}/>
            </div>
            )} */}
      </div>
    </div>
  );
}
