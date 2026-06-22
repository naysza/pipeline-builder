// App.js
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      background: '#0f1623',
      overflow: 'hidden',
    }}>
      <PipelineToolbar />
      <div style={{ flex: 1 }}>
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
