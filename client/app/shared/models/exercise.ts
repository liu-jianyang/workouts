export class Exercise {
  id: string;
  name: string;
  progression: string;
  prerequisites: Array<string>;
  currentPoints: number;
  maxPoints: number;
}