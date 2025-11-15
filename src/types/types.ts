export interface Course {
  name: string;
  credits: number;
  grade: string;
}

export interface Semester {
  courses: Course[];
  sgpa: number;
  name?: string;
  id?: number;
}

export interface SavedGradesData {
  [key: number]: { grades: string[], sgpa: number } | Semester;
}

export interface GradeDistribution {
  gradeValue: string;
  count: number;
  percentage: number;
  color: string;
}

export interface SemesterData {
  id: number;
  name: string;
  subjects: Array<{name: string, credits: number}>;
  calc: (grades: number[]) => number;
  color: string;
  icon: string;
}
