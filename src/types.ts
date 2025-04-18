export interface Course {
    name: string;
    semester: string;
    year: number;
    color: string;
}

export interface Event {
  name: string;
  deadline: string;
  weight: number;
  description: string;
  course: string;
}

export interface StickyNote {
  id: string;
  content: string;
  color: string;
}
