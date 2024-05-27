import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Csv from './Components/CSV/Csv'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Csv />}/>
      </Routes>
    </div>
  )
}

export default AllRoutes