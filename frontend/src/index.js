import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoList from "./TodoList";  
import BasicTable from "./TableTest";
import Button from '@mui/material/Button';
import DataTable from './DataTable';

var destination = document.querySelector("#container");
  
function App() {
    return <Button variant="contained">Hello World</Button>;
  }


ReactDOM.render(
    <div>
        <DataTable/>
    </div>,
    destination
);