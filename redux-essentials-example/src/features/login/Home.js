import React from 'react';


import styles from '../counter/Counter.module.css';

function postName(name) {
  fetch(`http://localhost:5000/api/login/${name}`, {method: 'POST', credentials: 'include'})
              .then(res => res.json())
              .then((data) => {
                console.log(data)
              })
              .catch((err) => {
                console.log(err)
              });

}

export function Home() {
  let name;

  return (
    <div className={styles.row}>
    <header className={styles.row}>
        <h2>HELLO</h2> <br/>
        <span><input
          className={styles.textbox}
          value={name}
          onChange={(e) => {name = e.target.value}}
        />
        <span></span>
        <button
          className={styles.button}
          onClick={() => {
            postName(name);
          }}
        >
          Join
        </button></span> 
        
        </header>
    </div>
);
}
