
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './layouts/Navbar';
// import { AuthProvider } from "./components/userauth/AuthContext";
import AuthContainer from "./components/userauth/AuthContainer";
import RegisterDepartment from "./components/department/RegisterDepartment";
import CreateTask from "./components/task/CreateTask";
import ShowTask from "./components/task/ShowTask";
import EditTask from "./components/task/EditTask";
import ApproveTask from "./components/task/ApproveTask";
import ViewStaffTask from "./components/task/ViewStaffTask";

function App() {
  return (
    <Router>
        {/*<AuthProvider>*/}
      <Navbar />
      <Routes>

          <Route path="/" element={< AuthContainer />} />
          <Route path="/department/create" element={< RegisterDepartment />} />
          <Route path="/task/create" element={<CreateTask />} />
          <Route path="/task" element={<ViewStaffTask />} />
          <Route path="/task/:id" element={<ShowTask />} />
          <Route path="/task/:id/edit" element={< EditTask />} />
          <Route path="/task/:id/approveTask" element={<ApproveTask />} />
          {/*<Route path="/task/:id/update" element={<UpdateProduct />} />*/}
          {/*<Route path="/task/:id" element={<ShowTask />} />*/}
          {/*<Route path="/products/:id/edit" element={<UpdateProduct />} />*/}
      </Routes>
            {/*</AuthProvider>*/}
    </Router>
  );
};

export default App;
