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
import {getDatabase, ref, set, child, get } from "firebase/database";
import { async } from "@firebase/util";
//import { chainPropTypes } from "@mui/utils";

class DataTable extends Component{
    constructor(props) {
        super(props);
        
        this.idnum = 0;
        this.state = {
          items: []
        }
        
        this.getData = this.getData.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

    }

    async componentDidMount(){
      await this.getData();
    }

    getData = async () => {
      let data = await get(ref(this.props.db, 'users/'))
      let datavalue = data.val()
      return this.setState((prevState) =>{
        return {
          items: datavalue
        }
      })
    }

    addItem(e) {
        if (this._inputElementA.value !== ""
        && this._inputElementB.value !== ""
        && this._inputElementC.value !== ""
        && this._inputElementD.value !== "") {
          
          var idnum = this.idnum;
          
          const newItem = {
            name: this._inputElementA.value,
            data1: this._inputElementB.value,
            data2: this._inputElementC.value,
            data3: this._inputElementD.value
          };

          set(ref(this.props.db, 'users/' + idnum), newItem);
          this.idnum = this.idnum + 1;

          console.log(this.state.items);
          // this.getData();
          const things = this.getData();
          console.log(things[0]);
       
          this.setState((prevState) => {
            return { 
              items: prevState.items.concat(things) 
            };
          });
         
          this._inputElementA.value = "";
          this._inputElementB.value = "";
          this._inputElementC.value = "";
          this._inputElementD.value = "";
        }
         
        
           
        e.preventDefault();
    }
    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
          return (item.id !== key);
        });
        console.log.apply(filteredItems);
       
        this.setState({
          items: filteredItems
        });
    }
    
    
    render() {
      console.log(this.state.items)
    
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
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.items.map((row, index) => (
                    <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.data1}</TableCell>
                      <TableCell align="right">{row.data2}</TableCell>
                      <TableCell align="right">{row.data3}</TableCell>
                      <TableCell align="right">
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