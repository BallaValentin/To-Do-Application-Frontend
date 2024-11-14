import React from 'react';
import AdviceProvider from './contexts/AdviceProvider';

const App: React.FC = () => {
  return (
    <div>
      <AdviceProvider />
    </div>
  );
};

export default App;
