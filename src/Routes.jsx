import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Add } from './Pages/Add';
import { Edit } from './Pages/Edit';
import { Home } from './Pages/Home';
import { Pronunciation } from './Pages/Pronunciation';
import { StudyList } from './Pages/Study-list';
import { ListRecords } from './Pages/01-ListRecords';
import { StudyRandom } from './Pages/02-StudyRandom';
import { StudyNotRandom } from './Pages/03-StudyNotRandom';

import './styles.css';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/Edit/:id" element={<Edit />} />
      <Route path="/Pronunciation" element={<Pronunciation />} />
      <Route path="/Study-list" element={<StudyList />} />
      <Route path="/ListRecords" element={<ListRecords />} />
      <Route path="/StudyRandom" element={<StudyRandom />} />
      <Route path="/StudyNotRandom" element={<StudyNotRandom />} />
      <Route path="*" element={<h3>Not Found</h3>} />
    </Routes>
  );
}
export default AllRoutes;
