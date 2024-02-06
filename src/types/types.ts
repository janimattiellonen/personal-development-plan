
export type ClubType = {
  id: number;
  name: string;
  isActive?: boolean;
}

export type ExerciseType = {
  id: number;
  name: string;
  description: string;
  instructions: string;
  url: string;
  youtubeUrl: string;
  isActive?: boolean;
}
