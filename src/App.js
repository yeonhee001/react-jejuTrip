import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './component/_common/Header';
import Menu from './component/_common/Menu';
import Home from './pages/01-home/Home';
import Trip from './pages/02-trip/Trip';
import TripList from './pages/02-trip/TripList';
import TripDetail from './pages/02-trip/TripDetail';
import CmList from './pages/03-community/CmList';
import CmDetail from './pages/03-community/CmDetail';
import CmUserDetail from './pages/03-community/CmUserDetail';
import CmPostPage from './pages/03-community/CmPostPage';
import CmSubjectPage from './pages/03-community/CmSubjectPage';
import CmPhoto from './pages/03-community/CmPhoto';
import PlannerList from './pages/04-planner/PlannerList';
import PlannerDetail from './pages/04-planner/PlannerDetail';
import Place from './pages/04-planner/Place';
import PickPlan from './pages/04-planner/PickPlan';
import My from './pages/05-mypage/My';
import CheckList from './pages/05-mypage/check/CheckList';
import CheckDetail from './pages/05-mypage/check/CheckDetail';
import Like from './pages/05-mypage/Like';
import Activity from './pages/05-mypage/Activity';
import QnA from './pages/05-mypage/QnA';
import Login from './pages/00-login/Login';
import SearchPage from './pages/00-search/SearchPage';
import SearchDetail from './pages/00-search/SearchDetail';

import './styles/_style.scss';

function App() {
  return (
    <Router>
      <Header/>

      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/trip' element={<Trip/>}/>   
          <Route path='/trip/triplist/:type' element={<TripList/>}/>
          <Route path='/trip/triplist/:type/tripdetail/:id' element={<TripDetail/>}/>
          
          <Route path='/community' element={<CmList/>}/>
          <Route path='/community/cmdetail/:id' element={<CmDetail/>}/>
          <Route path='/community/cmuserdetail/:id' element={<CmUserDetail/>}/>
          <Route path='/community/cmpostpage' element={<CmPostPage/>}/>
          <Route path='/community/cmsubjectpage' element={<CmSubjectPage/>}/>
          <Route path='/community/cmphoto' element={<CmPhoto/>}/>

          <Route path='/planner' element={<PlannerList/>}/>
          <Route path='/planner/plannerdetail/:id' element={<PlannerDetail/>}/>
          <Route path='/planner/plannerdetail/:id/place' element={<Place/>}/>
          <Route path='/planner/pickplan' element={<PickPlan/>}/>

          <Route path='/my' element={<My/>}/>
          <Route path='/my/checklist' element={<CheckList/>}/>
          <Route path='/my/checklist/checkDetail/:id' element={<CheckDetail/>}/>
          <Route path='/my/like' element={<Like/>}/>
          <Route path='/my/activity' element={<Activity/>}/>
          <Route path='/my/qna' element={<QnA/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/search/searchdetail' element={<SearchDetail/>}/>
        </Routes>
      </main>

      <Menu />
    </Router>
  );
}

export default App;
