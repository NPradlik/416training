import React, { Component } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import "./TodoList.css";
import {remove, ref, set, get } from "firebase/database";
// import { async } from "@firebase/util";
//import { chainPropTypes } from "@mui/utils";

class DataTable extends Component{
    constructor(props) {
        super(props);
        
        this.idnum = 0;
        this.state = {
          items: [],
          idnum: 0
        }
        
        this.getData = this.getData.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

    }

    async componentDidMount(){
      await this.getData();
    }

    getData = async () => {
      get(ref(this.props.db, 'users/')).then((data)=>{
        if(data.exists()){
          let datavalue = data.val()
          console.log(datavalue);
          datavalue = Object.values(datavalue);
          console.log(datavalue);
          datavalue = datavalue.filter((x)=>{
            return x !== undefined;
          });
          console.log(datavalue);
          console.log(datavalue.length);
          console.log(datavalue[datavalue.length-1]);
          return this.setState((prevState) =>{
            return {
              items: datavalue,
              idnum: (datavalue[datavalue.length-1].id + 1)
            }
          });
        }
        else{
          return this.setState((prevState) =>{
            return {
              items: [],
              idnum: 0
            }
          });
        }
      });
    }

    addItem(e) {
        if (this._inputElementA.value !== ""
        && this._inputElementB.value !== ""
        && this._inputElementC.value !== ""
        && this._inputElementD.value !== "") {
          
          const newItem = {
            id: this.state.idnum,
            name: this._inputElementA.value,
            data1: this._inputElementB.value,
            data2: this._inputElementC.value,
            data3: this._inputElementD.value
          };

          set(ref(this.props.db, 'users/' + this.state.idnum), newItem);
          this.getData();
         
          this._inputElementA.value = "";
          this._inputElementB.value = "";
          this._inputElementC.value = "";
          this._inputElementD.value = "";
        }
        e.preventDefault();
    }
    deleteItem(key) {
        remove(ref(this.props.db, 'users/' + key));
        // this.getData();
        this.getData();
    }
    editItem(key) {
      if (this._inputElementA.value !== ""
        && this._inputElementB.value !== ""
        && this._inputElementC.value !== ""
        && this._inputElementD.value !== "") {
          
          const newItem = {
            id: key,
            name: this._inputElementA.value,
            data1: this._inputElementB.value,
            data2: this._inputElementC.value,
            data3: this._inputElementD.value
          };

          set(ref(this.props.db, 'users/' + key), newItem);
          this.getData();
         
          this._inputElementA.value = "";
          this._inputElementB.value = "";
          this._inputElementC.value = "";
          this._inputElementD.value = "";
        }
    }
    
    
    render() {
    
        return (
        <div className="todoListMain">
          <div className="header">
            <form onSubmit={this.addItem}>
                <input ref={(a) => this._inputElementA = a} 
                  placeholder="enter name">
                </input>
                <input ref={(b) => this._inputElementB = b} 
                  placeholder="enter data1">
                </input>
                <input ref={(c) => this._inputElementC = c} 
                  placeholder="enter data2">
                </input>
                <input ref={(d) => this._inputElementD = d} 
                  placeholder="enter data3">
                </input>
                <button type="submit">add</button>
            </form>
          </div>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Data1</TableCell>
                        <TableCell align="right">Data2</TableCell>
                        <TableCell align="right">Data3</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {
                  this.state.items.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.data1}</TableCell>
                      <TableCell align="right">{row.data2}</TableCell>
                      <TableCell align="right">{row.data3}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => this.editItem(row.id)} variant="contained">Edit</Button>
                        <Button onClick={() => this.deleteItem(row.id)} variant="contained">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>
        </div>
        );
    }
}

export default DataTable;