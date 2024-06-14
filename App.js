import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";


// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items,setItems]=useState([]);
  

  function handleAddItems(item){
    setItems(items=>[...items,item]);//since in react we cannot mutate state and that is why we can't do do this items=>items.push(item) to push new items every time we input new item so we are creating a new array every time we input new item.
  }

  function handleDeleteItem(id){
    setItems(items=>items.filter(item=>item.id!==id))
  }

  function handleToggleItem(id){
    setItems(items=>items.map(item=>item.id===id?{...item, packed: !item.packed}:item));
  }

  function handleClearList(){
    const confirmed=window.confirm("Are you sure you want to delete all items?");
    if(confirmed){
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList}/>
      <Stats items={items} />
    </div>
  );
}








/*
Notes:

1. Array.from({length:20}):
This part is the core of creating the new array.
Array.from() is a function that takes two arguments:
The first argument specifies the source object from which to create the new array. Here, it's an object with a single property: length: 20.
The second argument (optional) is a map function used to transform elements during creation (we'll discuss this later).

2. {length: 20} - Object as Source:
This object acts as a blueprint for the new array.
The length property with a value of 20 instructs Array.from() to create a new array with a length of 20.

3. (_, i) => i+1 - Map Function:
This is the optional second argument passed to Array.from(). It's an arrow function that acts as a mapping function.
The function takes two arguments:
The first argument (_) is a placeholder and is typically ignored in this scenario.
The second argument (i) represents the current index of the element being processed during the iteration.
The arrow function itself simply returns i + 1. This means for each element created in the new array, the function adds 1 to the current index (i).

Putting it all together:
Array.from() sees the object with length: 20. It creates a new array with 20 empty slots.
It then iterates over each slot (index) from 0 to 19.
For each iteration, it calls the provided map function ((_, i) => i+1).
The map function, for each index i, calculates i + 1.
Array.from() then fills the corresponding slot in the new array with the result (i + 1).

CONTROLLED ELEMENTS:
By default the input fields and also the select field maintain their own state inside the DOM. So basically inside the HTML element itself. Now this makes it hard to read their values and it also leaves this state right here in the DOM which is not ideal. So, in react, we usually like to keep all this state in just one central place. So inside the React application and not inside the DOM. And so in order to do that we use a technique called controlled elements. And so with this technique it is react who controls and owns the state of these input fields and no longer the DOM. 

*/