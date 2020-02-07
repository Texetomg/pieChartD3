import React from 'react'
import PieChart from './components/PieChart'

const data = [
  {
      label: ['Зарплата'],
      value: 901893,
      children: [
        {
            label: ['Рестораны'],
            value: 15,
        },
        {
            label: ['Магазины продуктов'],
            value: 10,
        },
        {
            label: ['Одежда'],
            value: 26,
        },
        {
            label: ['Самолеты/поезда'],
            value: 21,
        },
    ],
  },
  {
      label: ['Взнос в АТМ'],
      value: 1493245,
  },
  {
      label: ['Зачисления от ЮЛ'],
      value: 1922430,
  },
  {
      label: ['Прочее'],
      value: 1235000,
  },
]

const App = () => {
  return (
    <div className="App">
      <PieChart
        width={500}
        height={200}
        innerRadius={0}
        outerRadius={100}
        cornerRadius={0}
        newData={data}
      />
    </div>
  )
}

export default App