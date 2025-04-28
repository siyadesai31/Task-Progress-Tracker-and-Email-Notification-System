// import React from 'react';
// import TaskManager from './components/TaskManager';

// function App() {
//   return <TaskManager />;
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ManagerDashboard from './components/ManagerDashboard';
import EmployerDashboard from './components/EmployerDashboard';

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="space-x-4 mb-4">
          <Link to="/" className="text-blue-500">Manager Dashboard</Link>
          <Link to="/employer" className="text-blue-500">Employer Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ManagerDashboard />} />
          <Route path="/employer" element={<EmployerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
