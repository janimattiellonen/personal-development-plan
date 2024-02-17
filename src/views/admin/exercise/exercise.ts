import {z} from "zod";

export const schema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(5).max(500),
  instructions: z.string().min(5).max(1000),
  url: z.string(),
  youtubeUrl: z.string(),
  isActive: z.boolean(),
}).required();

export type ExerciseInputs = {
  name: string;
  description: string;
  instructions: string;
  url: string;
  youtubeUrl: string;
  isActive: boolean;
}

export async function createExercise(data: ExerciseInputs) {
  return await fetch(`${import.meta.env.VITE_API_URL}/api/admin/exercises`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}

export async function deleteExercise(id: number) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/exercises/${id}`, {
    method: 'delete',
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function removeExerciseFromTrainingSession(exerciseId: number, trainingSessionId: number) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/training-sessions/${trainingSessionId}/exercises/${exerciseId}`, {
    method: 'delete',
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function updateExercise(id: number, data: ExerciseInputs) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/exercises/${id}`, {
    method: 'put',
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data)
  })
}
