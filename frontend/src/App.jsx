import './App.css'
import HeaderApp  from './components/HeaderApp/header.jsx'
import SubnetAmountPage from './Pages/SubnetAmountPage/SubnetAmountPage.jsx'
import SubnetHostsPage from './Pages/SubnetHostsPage/SubnetHostsPage.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import SubnetInfo from './Layouts/SubnetInfo/SubnetInfo.jsx'
import { Route, Routes } from 'react-router'



function App() {
  return (
    <>
    <HeaderApp/>
    {/* <SubnetAmountPage></SubnetAmountPage>
    <SubnetHostsPage></SubnetHostsPage>
    <Dashboard></Dashboard>
    <SubnetInfo></SubnetInfo> */}
    <Routes>
      <Route path='/' element={<SubnetAmountPage/>}/>
      <Route path='/number-hosts' element={<SubnetHostsPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App
