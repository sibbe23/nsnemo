import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import CandidateLogin from './components/LoginForm/CandidateLogin';
import User from './components/Dashboard/User';
import CandidateDashboard from './components/Dashboard/Candidate';
import Candidate_add from './components/Dashboard/Candidate_add';
import Candidate_view from './components/Dashboard/Candidate_view';
import Sidebar from './components/Sidebar/Sidebar';
import User_add from './components/Dashboard/User_add';
import User_view from './components/Dashboard/User_view';
import CrewPlannerAdd from './components/Dashboard/CrewplannerAdd';
import Search from './components/Dashboard/Search';
import Reports from './components/Dashboard/Reports';
import CompanyAdd from './components/Settings/CompanyAdd';
import CompanyView from './components/Settings/CompanyView';
import VesselAdd from './components/Settings/VesselAdd';
import VesselView from './components/Settings/VesselView';
import ExpAdd from './components/Settings/ExpAdd';
import ExpView from './components/Settings/ExpView';
import RankAdd from './components/Settings/RankAdd';
import RankView from './components/Settings/RankView';
import GradeAdd from './components/Settings/GradeAdd';
import GradeView from './components/Settings/GradeView';
import PortAdd from './components/Settings/PortAdd';
import PortView from './components/Settings/PortView';
import PortagentAdd from './components/Settings/PortagentAdd';
import PortagentView from './components/Settings/PortagentView';
import HospitalAdd from './components/Settings/HospitalAdd';
import HospitalView from './components/Settings/HospitalView';
import DocumentAdd from './components/Settings/DocumentAdd';
import DocumentView from './components/Settings/DocumentView';
import Country from './components/Settings/Country';
import VendorAdd from './components/Settings/VendorAdd';
import VendorView from './components/Settings/VendorView';
import CompanyEdit from './components/Settings/CompanyEdit';
import VesselEdit from './components/Settings/VesselEdit';
import ExpEdit from './components/Settings/ExpEdit';
import RankEdit from './components/Settings/RankEdit';
import GradeEdit from './components/Settings/GradeEdit';
import PortEdit from './components/Settings/PortEdit';
import PortagentEdit from './components/Settings/PortagentEdit';
import HospitalEdit from './components/Settings/HospitalEdit';
import DocumentEdit from './components/Settings/DocumentEdit';
import VendorEdit from './components/Settings/VendorEdit';
import Candidate_edit from './components/Dashboard/Candidate_edit';
import User_edit from './components/Dashboard/User_edit';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Function to determine whether to show the Sidebar based on the current route
  const shouldShowSidebar = () => {
    // List of routes where the Sidebar should not be shown
    const excludedRoutes = ['/login', '/candidate-login'];
    return !excludedRoutes.includes(location.pathname);
  };

  return (
    <>
      {/* Conditionally render the Sidebar */}
      {shouldShowSidebar() && <Sidebar />}

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/dashboard" element={<User />} />

        <Route path='/candidate-add' element={<Candidate_add />} />
        <Route path ='/candidate-view' element={<Candidate_view/>}/>
        <Route path ='/candidate-view/:candidateId' element={<Candidate_edit/>}/>

        <Route path='/user-add' element={<User_add />} />
        <Route path ='/user-view' element={<User_view/>}/>
        <Route path ='/user-edit/:userId' element={<User_edit/>}/>

        <Route path='/crewplanner-add' element={<CrewPlannerAdd />} />

        <Route path ='/search' element={<Search/>}/>
        <Route path='/report' element={<Reports/>}/>

        <Route path='/company-add' element={<CompanyAdd/>} />
        <Route path='/company-view' element={<CompanyView/>} />
        <Route path="/company-edit/:companyId" element={<CompanyEdit/>} />

        <Route path='/vessel-add' element={<VesselAdd/>} />
        <Route path='/vessel-view' element={<VesselView/>} />
        <Route path='/vessel-edit/:vesselId' element={<VesselEdit/>} />

        <Route path='/exp-add' element={<ExpAdd/>} />
        <Route path='/exp-view' element={<ExpView/>} />
        <Route path='/exp-edit/:expId' element={<ExpEdit/>} />

        <Route path='/rank-add' element={<RankAdd/>} />
        <Route path='/rank-view' element={<RankView/>} />
        <Route path='/rank-edit/:rankId' element={<RankEdit/>} />

        <Route path='/grade-add' element={<GradeAdd/>} />
        <Route path='/grade-view' element={<GradeView/>} />
        <Route path='/grade-edit/:gradeId' element={<GradeEdit/>} />

        <Route path='/port-add' element={<PortAdd/>} />
        <Route path='/port-view' element={<PortView/>} />
        <Route path='/port-edit/:portId' element={<PortEdit/>} />

        <Route path='/portagent-add' element={<PortagentAdd/>} />
        <Route path='/portagent-view' element={<PortagentView/>} />
        <Route path='/portagent-edit/:portagentId' element={<PortagentEdit/>} />

        <Route path='/hospital-add' element={<HospitalAdd/>} />
        <Route path='/hospital-view' element={<HospitalView/>} />
        <Route path='/hospital-edit/:hospitalId' element={<HospitalEdit/>} />

        <Route path='/doc-add' element={<DocumentAdd/>} />
        <Route path='/doc-view' element={<DocumentView/>} />
        <Route path='/doc-edit/:docId' element={<DocumentEdit/>} />

        <Route path='/vendor-add' element={<VendorAdd/>} />
        <Route path='/vendor-view' element={<VendorView/>} />
        <Route path='/vendor-edit/:vendorId' element={<VendorEdit/>} />

        <Route path='/country' element={<Country/>} />
      </Routes>
    </>
  );
}

export default App;
