import './App.css'
import ListEmployeeComponent from './component/ListEmployeeComponent'
import HeaderComponent from './component/HeaderComponent'
import FooterComponent from './component/FooterComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EmployeeComponent from './component/EmployeeComponent'

function App() {

  return (
    <>
    <BrowserRouter> 
      <HeaderComponent></HeaderComponent>
      <div>
        <Routes>
          {/* when you hit http://localhost:3000 below path should be linked */}
          <Route path='/' element={<ListEmployeeComponent></ListEmployeeComponent>}></Route>
          {/* when you hit http://localhost:3000/employees below path should be linked */}
          <Route path='/employees' element={<ListEmployeeComponent></ListEmployeeComponent>}></Route>
          {/* when you hit http://localhost:3000/add-employee below path should be linked */}
          <Route path='/add-employee' element={<EmployeeComponent></EmployeeComponent>}></Route>
          {/* when you hit http://localhost:3000/edit-employee/1 below path should be linked */}
          <Route path='/edit-employee/:id' element={<EmployeeComponent></EmployeeComponent>}></Route>

        </Routes>   
        </div>   
      <FooterComponent></FooterComponent>
    </BrowserRouter>
    </>
  )
}

export default App
