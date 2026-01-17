import React, { useState } from "react";
import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";
import Screen4 from "./screens/Screen4";
import Screen5 from "./screens/Screen5";
import Screen6 from "./screens/Screen6";
import Screen7 from "./screens/Screen7";

export default function App() {
  const [screen, setScreen] = useState(1);

  return (
    <div className="app">
      <header className="app-header">Post Purchase UI — Demo</header>
      <main className="app-main">
        <div className="canvas">
          {screen === 1 && <Screen1 onNext={() => setScreen(5)} />}
          {screen === 2 && <Screen2 onNavigate={(s) => (s === 'help' ? alert('help') : setScreen(s))} />}
          {screen === 3 && <Screen3 />}
          {screen === 4 && <Screen4 />}
          {screen === 5 && <Screen5 />}
          {screen === 6 && <Screen6 />}
          {screen === 7 && <Screen7 />}
        </div>
      </main>
      <footer className="app-footer">
        <nav className="mini-nav">
          <button onClick={() => setScreen(1)}>1</button>
          <button onClick={() => setScreen(2)}>2</button>
          <button onClick={() => setScreen(3)}>3</button>
          <button onClick={() => setScreen(4)}>4</button>
          <button onClick={() => setScreen(5)}>5</button>
          <button onClick={() => setScreen(6)}>6</button>
          <button onClick={() => setScreen(7)}>7</button>
        </nav>
      </footer>
    </div>
  );
}
