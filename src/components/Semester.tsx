import React from 'react';
import { Course, Semester } from '../types/types';

interface SemesterProps {
  semester: Semester;
  semesterIndex: number;
  updateCourse: (semesterIndex: number, courseIndex: number, field: keyof Course, value: string | number) => void;
  addCourse: (semesterIndex: number) => void;
  removeCourse: (semesterIndex: number, courseIndex: number) => void;
  calculateSGPA: (semesterIndex: number) => void;
}

const SemesterComponent: React.FC<SemesterProps> = ({ 
  semester, 
  semesterIndex, 
  updateCourse, 
  addCourse, 
  removeCourse,
  calculateSGPA
}) => {
  return (
    <div className="semester-container">
      <h3>Semester {semesterIndex + 1}</h3>
      <div className="semester-sgpa">SGPA: {semester.sgpa.toFixed(2)}</div>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {semester.courses.map((course, courseIndex) => (
            <tr key={courseIndex}>
              <td>
                <input 
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(semesterIndex, courseIndex, 'name', e.target.value)}
                  placeholder="Course name"
                />
              </td>
              <td>
                <input 
                  type="number"
                  value={course.credits || ''}
                  onChange={(e) => updateCourse(semesterIndex, courseIndex, 'credits', Number(e.target.value))}
                  placeholder="Credits"
                  min="0"
                  max="10"
                />
              </td>
              <td>
                <select 
                  value={course.grade}
                  onChange={(e) => updateCourse(semesterIndex, courseIndex, 'grade', e.target.value)}
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+ (10)</option>
                  <option value="A">A (9)</option>
                  <option value="B+">B+ (8)</option>
                  <option value="B">B (7)</option>
                  <option value="C+">C+ (6)</option>
                  <option value="C">C (5)</option>
                  <option value="D">D (4)</option>
                  <option value="F">F (0)</option>
                </select>
              </td>
              <td>
                <button onClick={() => removeCourse(semesterIndex, courseIndex)} className="btn-remove">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="semester-actions">
        <button onClick={() => addCourse(semesterIndex)} className="btn-add">Add Course</button>
        <button onClick={() => calculateSGPA(semesterIndex)} className="btn-calculate">Calculate SGPA</button>
      </div>
    </div>
  );
};

export default SemesterComponent;
