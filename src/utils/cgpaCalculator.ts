// This file will contain the CGPA calculation logic
// To be updated when the C code is provided for transformation

import { Course, Semester } from '../types/types';

/**
 * Converts letter grade to grade points
 * @param grade Letter grade (A+, A, B+, etc)
 * @returns Corresponding grade points
 */
export const getGradePoint = (grade: string): number => {
  const gradePoints: {[key: string]: number} = {
    'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0
  };
  return gradePoints[grade] || 0;
};

/**
 * Calculates SGPA for a single semester
 * @param courses List of courses with credits and grades
 * @returns SGPA value
 */
export const calculateSemesterGPA = (courses: Course[]): number => {
  let totalGradePoints = 0;
  let totalCredits = 0;
  
  courses.forEach(course => {
    if (course.credits > 0 && course.grade) {
      const gradePoint = getGradePoint(course.grade);
      totalGradePoints += gradePoint * course.credits;
      totalCredits += course.credits;
    }
  });
  
  return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
};

/**
 * Calculates CGPA for multiple semesters
 * @param semesters List of semesters with courses
 * @returns CGPA value
 */
export const calculateCumulativeGPA = (semesters: Semester[]): number => {
  let totalGradePoints = 0;
  let totalCredits = 0;
  
  semesters.forEach(semester => {
    semester.courses.forEach(course => {
      if (course.credits > 0 && course.grade) {
        const gradePoint = getGradePoint(course.grade);
        totalGradePoints += gradePoint * course.credits;
        totalCredits += course.credits;
      }
    });
  });
  
  return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
};

// This placeholder will be updated with the converted C code when provided
/* 
export const convertedCGPAFunction = () => {
  // To be implemented when C code is provided
};
*/
