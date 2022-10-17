import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Add } from './Pages/Add';
import { Edit } from './Pages/Edit';
import { Home } from './Pages/Home';
import { ListRecords } from './Pages/ListRecords';
import { StudyRandom } from './Pages/StudyRandom';
import { StudyNotRandom } from './Pages/StudyNotRandom';

import './styles.css';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/Edit/:id" element={<Edit />} />            
      <Route path="/ListRecords" element={<ListRecords />} />
      <Route path="/StudyRandom" element={<StudyRandom />} />
      <Route path="/StudyNotRandom" element={<StudyNotRandom />} />
      <Route path="*" element={<h3>Not Found</h3>} />
    </Routes>
  );
}
export default AllRoutes;
