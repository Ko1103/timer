import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MainScreen } from '@/components/main-screen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </Router>
  );
}
