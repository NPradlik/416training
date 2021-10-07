import React, { Component } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(id, name, data1, data2, data3) {
    return {id, name, data1, data2, data3};
}
  
var rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
];

function removeData(data) {
    var index = rows.indexOf(data);
    console.log(data);
    console.log(rows);
    console.log(index);
    if (index > -1) {
        rows.splice(index, 1);
    }
    console.log(rows);
}
  
class DataTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            items: []
          };
        this.idnum = 0;
     
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    addItem(e) {
        if (this._inputElementA.value !== ""
        && this._inputElementB.value !== ""
        && this._inputElementC.value !== ""
        && this._inputElementD.value !== "") {
          var newItem = {
            name: this._inputElementA.value,
            data1: this._inputElementB.value,
            data2: this._inputElementC.value,
            data3: this._inputElementD.value,
            id: this.idnum
          };
          this.idnum = this.idnum + 1;
       
          this.setState((prevState) => {
            return { 
              items: prevState.items.concat(newItem) 
            };
          });
         
          this._inputElementA.value = "";
          this._inputElementB.value = "";
          this._inputElementC.value = "";
          this._inputElementD.value = "";
        }
         
        console.log(this.state.items);
           
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
                  {this.state.items.map((row) => (
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