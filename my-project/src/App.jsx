import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AcdemiansComAu from './Pages/AcdemiansComAu';
import TheAcademiansCom from './Pages/TheAcademiansCom';
import APW from './Pages/APW';
import BPW from './Pages/BPW';
function App() {

  

  return ( 
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/academians.com.au" element={<AcdemiansComAu />} />
      <Route path="/the-academians.com" element={<TheAcademiansCom />} />
      <Route path="/aussiephdwriter.com.au" element={<APW />} />
      <Route path="/britishphdwriters.co.uk" element={<BPW />} />


    </Routes>
    </>
  );
}

export default App;





