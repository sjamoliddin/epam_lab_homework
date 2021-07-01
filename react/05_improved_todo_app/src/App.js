import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import Nav from './components/Nav'

// pages
import Home from './pages/Home'
import Create from './pages/Create'
import TodoList from './pages/TodoList'
import NotFound from './pages/NotFound'

function App() {
	// states
	const [todos, setTodos] = useState([])
	console.log(todos)

	return (
		<div className='app'>
			<Nav />

			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/create'>
					<Create todos={todos} setTodos={setTodos} />
				</Route>
				<Route path='/todolist' component={TodoList} />
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}

export default App
