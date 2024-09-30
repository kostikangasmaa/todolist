import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import dayjs from "dayjs";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme


function TodoList() {
  const [todo, setTodo] = useState({ description: "", date: null, priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { field: 'description', sortable: false, filter: true, floatingFilter: true },
    { field: 'priority', filter: true, floatingFilter: true, cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' } },
    { field: 'date', filter: true, floatingFilter: true,
       valueFormatter: (params) => {
      if (params.value) {
        return dayjs(params.value).format('DD.MM.YYYY');
      }
      return '';
    }}
  ]);

  const handleAdd = (event) => {
    event.preventDefault();

    if (!todo.description.trim()) {
      alert("Type description first!");
      return;
    }

    const newTodo = {
      date: todo.date,
      description: todo.description,
      priority: todo.priority,
    };

    setTodos([newTodo, ...todos]);
    setTodo({ description: "", date: null, priority: "" });
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select a row first!');
    }
  };



  return (
    <>
      <Stack
        mt={2}
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center">
        <TextField
          placeholder="Description"
          onChange={e => setTodo({ ...todo, description: e.target.value })}
          value={todo.description} />
        <TextField
          placeholder="Priority"
          onChange={e => setTodo({ ...todo, priority: e.target.value })}
          value={todo.priority} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={(newDate) => setTodo({ ...todo, date: newDate })}
            value={todo.date} 
            format="DD.MM.YYYY"
            />
        </LocalizationProvider>

        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="contained" startIcon={<DeleteIcon />} color="warning" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
      <div className="ag-theme-material" style={{ width: 800, height: 500 }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection="single"
        />
      </div>
    </>
  );
}

export default TodoList;
