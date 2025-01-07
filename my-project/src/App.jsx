import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AcdemiansComAu from './Pages/AcdemiansComAu';
import TheAcademiansCom from './Pages/TheAcademiansCom';
function App() {

  

  return ( 
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/academians.com.au" element={<AcdemiansComAu />} />
      <Route path="/the-academians.com" element={<TheAcademiansCom />} />
    </Routes>
    </>
  );
}

export default App;





