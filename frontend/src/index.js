import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import TodoList from "./TodoList";  
// import BasicTable from "./TableTest";
//import Button from '@mui/material/Button';
import DataTable from './DataTable';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYcdkqR_Ku_eaTdJX80hzRDAfoeZiubxQ",
  authDomain: "training-5d4e2.firebaseapp.com",
  projectId: "training-5d4e2",
  storageBucket: "training-5d4e2.appspot.com",
  messagingSenderId: "321569009331",
  appId: "1:321569009331:web:9494209cf89345f11b8ac6"
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const database = getDatabase(app);

var destination = document.querySelector("#container");
  
// function App() {
//     return <Button variant="contained">Hello World</Button>;
//   }

ReactDOM.render(
    <div>
        <DataTable db = {database}/>
    </div>,
    destination
);