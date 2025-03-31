import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './component/_common/Header';
import Menu from './component/_common/Menu';
import Home from './pages/01-home/Home';
import Trip from './pages/02-trip/Trip';
import CmList from './pages/03-community/CmList';
import PlannerList from './pages/04-planner/PlannerList';
import My from './pages/05-mypage/My';

import Toggle from './component/_common/Toggle';

function App() {
  return (
    <Router>
      <Header/>
      <Toggle/>

      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/trip' element={<Trip/>}/>
          <Route path='/community' element={<CmList/>}/>
          <Route path='/planner' element={<PlannerList/>}/>
          <Route path='/mypage' element={<My/>}/>
        </Routes>
      </main>

      <Menu />
    </Router>
  );
}

export default App;
