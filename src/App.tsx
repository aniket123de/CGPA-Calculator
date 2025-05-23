import React, { useState } from 'react';
import './App.css';
import { calculateSemesterGPA, calculateCumulativeGPA } from './utils/cgpaCalculator';
import { Course, Semester } from './types/types';
import SemesterComponent from './components/Semester';

function App() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { courses: [{ name: '', credits: 0, grade: '' }], sgpa: 0 },
    { courses: [{ name: '', credits: 0, grade: '' }], sgpa: 0 },
    { courses: [{ name: '', credits: 0, grade: '' }], sgpa: 0 },
    { courses: [{ name: '', credits: 0, grade: '' }], sgpa: 0 }
  ]);
  const [cgpa, setCgpa] = useState<number>(0);

  // Function to add a new course to a semester
  const addCourse = (semesterIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.push({ name: '', credits: 0, grade: '' });
    setSemesters(updatedSemesters);
  };

  // Function to remove a course from a semester
  const removeCourse = (semesterIndex: number, courseIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.splice(courseIndex, 1);
    
    // Ensure there's always at least one course
    if (updatedSemesters[semesterIndex].courses.length === 0) {
      updatedSemesters[semesterIndex].courses.push({ name: '', credits: 0, grade: '' });
    }
    
    setSemesters(updatedSemesters);
  };

  // Function to update course details
  const updateCourse = (semesterIndex: number, courseIndex: number, field: keyof Course, value: string | number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses[courseIndex] = {
      ...updatedSemesters[semesterIndex].courses[courseIndex],
      [field]: value
    };
    setSemesters(updatedSemesters);
  };

  // Function to calculate SGPA for a semester
  const calculateSGPA = (semesterIndex: number) => {
    const semester = semesters[semesterIndex];
    const sgpa = calculateSemesterGPA(semester.courses);
    
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].sgpa = sgpa;
    setSemesters(updatedSemesters);
    
    calculateCGPA();
  };

  // Function to calculate overall CGPA
  const calculateCGPA = () => {
    const newCGPA = calculateCumulativeGPA(semesters);
    setCgpa(newCGPA);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CGPA Calculator</h1>
      </header>
      <main className="App-main">
        <div className="cgpa-display">
          <h2>Your CGPA: {cgpa.toFixed(2)}</h2>
        </div>
        
        {semesters.map((semester, semesterIndex) => (
          <SemesterComponent 
            key={semesterIndex}
            semester={semester}
            semesterIndex={semesterIndex}
            updateCourse={updateCourse}
            addCourse={addCourse}
            removeCourse={removeCourse}
            calculateSGPA={calculateSGPA}
          />
        ))}
        
        <div className="calculate-cgpa">
          <button onClick={calculateCGPA} className="btn-calculate-cgpa">Calculate CGPA</button>
        </div>
      </main>
    </div>
  );
}

export default App;
