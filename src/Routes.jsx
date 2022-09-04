import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Add } from "./Components/Add"
import { Edit } from "./Components/Edit"
import { Home } from "./Components/Home"
import { Pronunciation } from "./Components/Pronunciation"
import { StudyList } from "./Components/Study-list"
import "./styles.css"

function AllRoutes() {  

  return (    
      <Routes>
        <Route path="/" element={ < Home /> } />
        <Route path="/Add" element={ < Add /> } />
        <Route path="/Edit/:id" element={ < Edit /> } />
        <Route path="/Pronunciation" element={ < Pronunciation /> } />
        <Route path="/Study-list" element={ < StudyList /> } />        
        <Route path="*" element={<h3>Not Found</h3>} />
      </Routes>
  )
}
export default AllRoutes