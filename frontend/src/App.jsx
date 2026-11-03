import './App.css'
import HeaderApp  from './components/HeaderApp/header.jsx'
import SubnetAmountPage from './Pages/SubnetAmountPage/SubnetAmountPage.jsx'
import SubnetHostsPage from './Pages/SubnetHostsPage/SubnetHostsPage.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import SubnetInfo from './Layouts/SubnetInfo/SubnetInfo.jsx'

function App() {
  return (
    <>
    <HeaderApp/>
    <SubnetAmountPage></SubnetAmountPage>
    <SubnetHostsPage></SubnetHostsPage>
    <Dashboard></Dashboard>
    <SubnetInfo></SubnetInfo>
    </>
  )
}

export default App
