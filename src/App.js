import './App.css';
import './style.css';
import './AddDrug.css';
import "./Signup.css"; // Import external CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Includes Bootstrap JavaScript components
import PlanSelection from './Components/PlanSelection';
import Payment from './Components/Payment';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
// import 'boxicons';
import FetchAllDrugs from './Components/Drugs';
import AddDrug from './Components/AddDrug';
import Navbar from "./Components/Navbar";
import Clientpage from './Components/Clientpage';
import Adminpage from './Components/Adminpage';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import Subscription from "./Components/Subscription";
import ChatBot from  "./Components/Chatbot";
import AdminDashboard from "./Components/AdminDashboard";
import AdminUpdate from "./Components/AdminUpdate";

function App() {
  return (
      <Router>
        <Navbar />
        <ChatBot />
        <div className="App">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<FetchAllDrugs />} />
            <Route path='/add' element={<AddDrug />} />
            <Route path='/client' element={<Clientpage />} />
            <Route path='/admin' element={<Adminpage />} />
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
            <Route path="/plans1" element={<PlanSelection />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/plans" element={<Subscription />} />
            <Route path="/admin/update/:id" element={<AdminUpdate />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>

  );
}

export default App;
