
export type CategoryType = {
  id: number;
  name: string;
  isActive: number;
  parentCategoryId: number | null;
  createdAt: string;
  updatedAt: string;
  children?: CategoryType[];
};

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
