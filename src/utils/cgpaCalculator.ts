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

/**
 * Calculates SGPA for Semester 1 using numeric grades (out of 10)
 * @param grades Array of grades in order: [Physics Lab, Electrical Lab, Mechanical Lab, Physics Theory, Electrical Theory, Math Theory]
 * @returns SGPA value
 */
export const calculateSem1SGPA = (grades: number[]): number => {
  const credits = [1.5, 1, 3, 4, 4, 4];
  if (grades.length !== credits.length) return 0;
  let result = 0;
  for (let i = 0; i < credits.length; i++) {
    result += grades[i] * credits[i];
  }
  const n = result * 10;
  return n / 175;
};

/**
 * Calculates SGPA for Semester 2 using numeric grades (out of 10)
 * @param grades Array of grades in order: [Chemistry Lab, C Lab, Graphics Lab, English Lab, Chemistry Theory, C Theory, Math Theory, English Theory]
 * @returns SGPA value
 */
export const calculateSem2SGPA = (grades: number[]): number => {
  const credits = [1.5, 2, 3, 1, 4, 3, 4, 2];
  if (grades.length !== credits.length) return 0;
  let result = 0;
  for (let i = 0; i < credits.length; i++) {
    result += grades[i] * credits[i];
  }
  const n = result * 10;
  return n / 205;
};

/**
 * Calculates SGPA for Semester 3 using numeric grades (out of 10)
 * @param grades Array of grades in order: [Computer Organization, DSA, Analog and Digital Electronics, Mathematics, Economics, Computer Organization Lab, DSA Lab, Analog and Digital Electronics Lab, Python Lab]
 * @returns SGPA value
 */
export const calculateSem3SGPA = (grades: number[]): number => {
  const credits = [3, 3, 3, 2, 3, 2, 2, 2, 2];
  if (grades.length !== credits.length) return 0;
  let totalGradePoints = 0;
  let totalCredits = 0;
  for (let i = 0; i < credits.length; i++) {
    totalGradePoints += grades[i] * credits[i];
    totalCredits += credits[i];
  }
  return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
};

/**
 * Calculates SGPA for Semester 4 using numeric grades (out of 10)
 * @param grades Array of grades in order: [Discrete Mathematics, Computer Architecture, Automata, DAA, Biology, EVS, DAA Lab, Computer Architecture Lab]
 * @returns SGPA value
 */
export const calculateSem4SGPA = (grades: number[]): number => {
  const credits = [4, 3, 3, 3, 3, 1, 2, 2];
  if (grades.length !== credits.length) return 0;
  let totalGradePoints = 0;
  let totalCredits = 0;
  for (let i = 0; i < credits.length; i++) {
    totalGradePoints += grades[i] * credits[i];
    totalCredits += credits[i];
  }
  return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
};

// This placeholder will be updated with the converted C code when provided
/* 
export const convertedCGPAFunction = () => {
  // To be implemented when C code is provided
};
*/
