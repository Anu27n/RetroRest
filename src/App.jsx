import Menu from './components/Menu';

function App() {
  return (
    <div className="min-h-screen bg-vintage font-serif text-ink relative overflow-hidden">
      {/* Background grain texture is handled globally in index.css */}
      <Menu />
    </div>
  );
}

export default App;
