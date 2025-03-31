import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './component/_common/Header';
import Menu from './component/_common/Menu';
import Home from './pages/01-home/Home';
import Trip from './pages/02-trip/Trip';
import CmList from './pages/03-community/CmList';
import PlannerList from './pages/04-planner/PlannerList';
import My from './pages/05-mypage/My';

function App() {
  return (
    <Router>
      <Header/>

      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/trip' element={<Trip/>}/>   
          <Route path='/trip/triplist' element={<TripList/>}/>   
          <Route path='/trip/triplist/tripdetail' element={<TripDetail/>}/>
          
          <Route path='/community' element={<CmList/>}/>
          <Route path='/community/cmdetail' element={<CmDetail/>}/>
          <Route path='/community/cmuserdetail' element={<CmUserDetail/>}/>
          <Route path='/community/cmpostpage' element={<CmPostPage/>}/>
          <Route path='/community/cmsubjectpage' element={<CmSubjectPage/>}/>
          <Route path='/community/cmphoto' element={<CmPhoto/>}/>

          <Route path='/planner' element={<PlannerList/>}/>
          <Route path='/planner/calendar' element={<Calendar/>}/>
          <Route path='/planner/plannerdetail' element={<PlannerDetail/>}/>
          <Route path='/planner/plannerdetail/place' element={<Place/>}/>

          <Route path='/my' element={<My/>}/>
          <Route path='/my/checklist' element={<CheckList/>}/>
          <Route path='/my/checklist/checkDetail' element={<CheckDetail/>}/>
          <Route path='/my/like' element={<Like/>}/>
          <Route path='/my/activity' element={<Activity/>}/>
          <Route path='/my/qna' element={<QnA/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/search' element={<Search/>}/>
          <Route path='/search/searchdetail' element={<SearchDetail/>}/>
        </Routes>
      </main>

      <Menu />
    </Router>
  );
}

export default App;
