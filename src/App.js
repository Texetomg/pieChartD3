import React from 'react'
import PieChart from './components/PieChart'

const App = () => {
  return (
    <div className="App">
      <PieChart
        width={400}
        height={200}
        innerRadius={0}
        outerRadius={100}
        cornerRadius={0}
        maxSectors={10}
      />
    </div>
  )
}

export default App