import { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from './AddUser.module.css'

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
        setError({title: 'Invalid Input', message: 'Entered username or age is not valid'});
        return;
    }
    if(+enteredAge < 1) {
        setError({title: 'Invalid Age', message: 'Please enter the valid age'});
        return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  }


  const closeModalHandler = () => {
    setError(null);
  }

  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onClose={closeModalHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input id="username" type='text' ref={nameInputRef}/>
            <label htmlFor="age">Age (Years)</label>
            <input id="age" type='number' ref={ageInputRef}/>
            <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
    
  )
}

export default AddUser;