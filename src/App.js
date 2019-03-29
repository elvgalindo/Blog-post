import React, { Component } from 'react';
//import gql-tag (Parser)
import gql from 'graphql-tag';
//import react-apollo
import { graphql, compose } from "react-apollo";
//import components for the form
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Form from './form';

//run queries parsed from graphql-tag
const TodosQuery = gql`
{
  todos {
    id
    text
    complete
  } 
 }
 `;
const UpdateMutation = gql`
 mutation($id: ID!, $complete: Boolean!) {
   updateTodo(id: $id, complete: $complete)
 }
`;

const RemoveMutation = gql`
mutation($id: ID!) {
  removeTodo(id: $id)
}
`;

const CreateTodoMutation = gql`
mutation($text: String!) {
  createTodo(text: $text) {
    id
    text
    complete
  }
}
`;

class App extends Component {
//update todo
  updateTodo = async  todo => {
    await this.props.updateTodo({
      variables: {
        id: todo.id,
        complete: !todo.complete
      },
//update the cache
      update: store => {
        const data = store.readQuery({ query: TodosQuery });
        data.todos = data.todos.map(x => x.id === todo.id ? {...todo, complete: !todo.complete}:x);
        store.writeQuery({ query: TodosQuery,data});
      }
    });
  };
//remove todo
  removeTodo = async todo => {
    await this.props.removeTodo({
      variables: {
        id: todo.id,
      },
//update cache read and write
      update: store => {
        const data = store.readQuery({ query: TodosQuery });
        data.todos = data.todos.filter(x => x.id !== todo.id)
        store.writeQuery({ query: TodosQuery,data});
      }
    });
  };
//create todo
  createTodo = async text => {
    await this.props.createTodo({
      variables: {
        text,
      },
      update: (store, { data: { createTodo} }) => {
        const data = store.readQuery({ query: TodosQuery });
        data.todos.unshift(createTodo);
        store.writeQuery({ query: TodosQuery,data});
      }
    });
  }

  render() {
    const {
//destructing props
      data: { loading, todos }
    } = this.props;
    if (loading) {
      return null;
    }
    return (
//front-end code...
//render the map, putting a key to make unique items, passing what happens when clicks
            
             
  
      <div className="bck2" style={{ display: "flex"}}>
        <div style={{ margin: "auto", width: 900}}>
                <div className="top-left">Living</div>
                <div className="top-left1">Galindo</div>
                <div className="top-left2">Style</div>
               
                  <h1 data-text= "April 8th, 2019">April 8th, 2019</h1>
                  <h2>Lorem ipsum?</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse in. Consequat mauris nunc congue nisi. Cursus turpis massa tincidunt dui ut ornare. Varius sit amet mattis vulputate. Dolor sed viverra ipsum nunc aliquet. Ut lectus arcu bibendum at varius. Est ante in nibh mauris. Quis enim lobortis scelerisque fermentum dui. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Gravida in fermentum et sollicitudin ac orci phasellus. Fermentum dui faucibus in ornare quam. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Sem integer vitae justo eget magna. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Nulla at volutpat diam ut venenatis tellus in metus. In nisl nisi scelerisque eu ultrices. Sagittis eu volutpat odio facilisis mauris sit amet.
                      Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Elit pellentesque habitant morbi tristique. Sit amet cursus sit amet dictum sit amet justo donec. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Ipsum dolor sit amet consectetur adipiscing elit. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Pharetra diam sit amet nisl suscipit. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus.</p>
                <Paper elevation={1} >
                <Form submit={this.createTodo} />
                  <List>
                    {todos.map(todo => (
                      <ListItem 
                      key={todo.id} 
                      role={undefined} 
                      dense button 
                      onClick={() => this.updateTodo(todo)}>
                        <ListItemText primary={todo.text}/>
                        <ListItemSecondaryAction>
                        <IconButton onClick={() => this.removeTodo(todo)}>
                          </IconButton> 
                          <IconButton onClick={() => this.removeTodo(todo)}>
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </div> 
            </div>
          );
        }
      }

//bind with components coming from react apollo
export default compose(graphql(CreateTodoMutation, {name: 'createTodo'}),graphql(UpdateMutation, {name: 'updateTodo'}),graphql(RemoveMutation, {name: 'removeTodo'}),graphql(TodosQuery))(App);
