export enum HabitCategory {
  PHYSICAL = "physical",
  NUTRITION = "nutrition",
  MINDFULNESS = "mindfulness",
  SOCIAL = "social",
  GROWTH = "growth",
  REST = "rest",
}

export interface Habit {
  id: string;
  name: string;
  time: string;
  duration: string;
  category: HabitCategory;
  icon: string;
  tags: string[];
  Completed: boolean;
  location?: string;
  heartRate?: string;
}
