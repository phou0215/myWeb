import './App.css';
import ColorBox from './component/ColorBox';
import { ColorProvider } from './context/color';
import SelectColors from './component/SelectColors';

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors></SelectColors>
        <hr />
        <ColorBox></ColorBox>
      </div>
    </ColorProvider>
  );
}

export default App;
