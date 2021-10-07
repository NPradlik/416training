import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
          };
     
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    addItem(e) {
        if (this._inputElementA.value !== ""
        && this._inputElementB.value !== ""
        && this._inputElementC.value !== ""
        && this._inputElementD.value !== "") {
          var newItem = {
            textA: this._inputElementA.value,
            textB: this._inputElementB.value,
            textC: this._inputElementC.value,
            textD: this._inputElementD.value,
            key: Date.now()
          };
       
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
          return (item.key !== key);
        });
       
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
          <TodoItems entries={this.state.items}
                    delete={this.deleteItem}/>
        </div>
      );
    }
    
  }

export default TodoList;