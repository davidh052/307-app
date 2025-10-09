import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./form";

  
function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const toDelete = characters[index];

    fetch(`http://localhost:8000/users/${toDelete.id}`, {method: "DELETE"},)
      .then( (res) => {
        if (res.status == 204) { //deleted
          const updated = characters.filter( (c, i) => i !== index );
          setCharacters(updated);
        } else if (res.status == 404) { // no delete
          console.log("Resource not found");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }

  function updateList(person) { 
    postUser(person)
      .then( (res) => {
        if (res.status == 201) { //respond only to 201 code
          return res.json();  //setCharacters([...characters, person])
        }
      })
      .then( (createdUser) => setCharacters([...characters, createdUser]))
      .catch((error) => {
        console.log(error);
      })
}

  
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }


  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }


  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );


  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;