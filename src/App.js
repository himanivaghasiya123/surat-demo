import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';
import Task1 from './pages/task1'
import { LoaderProvider } from './loaderContext';

function App() {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <Routes>
          <Route path="/" element={<Task1 />} />
        </Routes>
      </LoaderProvider>
    </BrowserRouter>
  );
}

export default App;
