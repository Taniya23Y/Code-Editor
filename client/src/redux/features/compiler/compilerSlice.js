import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "My Code",
  fullCode: {
    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div class="container">
      <h1>To-Do List</h1>
      <div class="input-container">
        <input type="text" id="taskInput" placeholder="Enter task...">
        <button onclick="addTask()">Add Task</button>
      </div>
      <ul id="taskList"></ul>
    </div>
    <script src="script.js"></script>
  </body>
</html>
    `,
    css: `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  color: #333;
}
.input-container {
  display: flex;
  margin-bottom: 20px;
}
input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px 0 0 5px;
}
button {
  padding: 10px 20px;
  background-color: #FA0890;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #FAB123;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.delete {
  cursor: pointer;
  color: #FF0000;
  font-size: 20px;
}
@media screen and (max-width: 600px) {
  .container {
    margin: 10px;
    padding: 10px;
  }
  .input-container {
    flex-direction: column;
    margin-bottom: 10px;
  }
  input[type="text"] {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  button {
    width: 100%;
    border-radius: 5px;
  }
}
    `,
    javascript: `
function addTask() {
  var taskInput = document.getElementById('taskInput');
  var taskList = document.getElementById('taskList');
      
  if (taskInput.value === '') {
    alert('Please enter a task.');
    return;
  }
      
  var li = document.createElement('li');
  li.textContent = taskInput.value;
      
  var deleteButton = document.createElement('span');
  deleteButton.textContent = '❌';
  deleteButton.className = 'delete';
  deleteButton.onclick = function() {
    li.parentNode.removeChild(li);
  };
      
  li.appendChild(deleteButton);
  taskList.appendChild(li);
      
  taskInput.value = '';
}
    `,
  },
  currentLanguage: "html",
  isOwner: false,
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateCodeValue: (state, action) => {
      const { language, value } = action.payload;
      state.fullCode[language] = value;
    },
    updateIsOwner: (state, action) => {
      state.isOwner = action.payload;
    },
    updateFullCode: (state, action) => {
      state.fullCode = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const {
  updateCurrentLanguage,
  updateTitle,
  updateCodeValue,
  updateFullCode,
  updateIsOwner,
} = compilerSlice.actions;
