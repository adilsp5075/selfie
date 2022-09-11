import { CheckCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useOutletContext } from "react-router-dom";
import { db } from "../../utils/firebase";

export default function Tasks() {
  const [authData, setAuthData] = useOutletContext(); //read data from _applayout.jsx
  const [value, loading, error] = useCollection(
    collection(db, "users/" + authData.uid + "/tasks"),
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
    <div className=" h-full">
      <h1 className="p-2 font-bold text-2xl">All Tasks</h1>
      {value && value.empty && <p>no tasks yet :(</p>}
      {value && (
        <section className="w-fit max-w-2xl flex flex-wrap whitespace-normal">
          {value.docs.map((doc) => (
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
                  <span className="taskStatus bg-green-600 dark:bg-green-800/60">
                    completed
                  </span>
                ) : (
                  <>
                    <span className="taskStatus bg-red-600 dark:bg-red-800/60">
                      pending
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
  );
}