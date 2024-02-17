export function fetchTrainingSession(id: number) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/training-sessions/${id}`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export function fetchAvailableExercises(id: number) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/training-sessions/${id}/available-exercises`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export function addExerciseToTrainingSession(trainingSessionId: number, exerciseId: number) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/training-sessions/${trainingSessionId}/exercises`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({exerciseId})
  })
}
