import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';

function Hello() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-700 text-neutral-50">
      <img width="200" alt="icon" src={icon} className="drop-shadow-xl" />
      <h1 className="text-4xl font-semibold">electron-react-boilerplate</h1>
      <div className="flex gap-4">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
        >
          <span role="img" aria-label="books" className="mr-2">
            📚
          </span>
          Read our docs
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-white shadow-lg transition hover:bg-emerald-400"
        >
          <span role="img" aria-label="folded hands" className="mr-2">
            🙏
          </span>
          Donate
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
