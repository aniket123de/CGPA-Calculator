export interface Course {
  name: string;
  credits: number;
  grade: string;
}

export interface Semester {
  courses: Course[];
  sgpa: number;
}
