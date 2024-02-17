import * as z from "zod";

export type ClubInputs = {
  name: string
  isActive?: boolean;
}

export async function createClub(data: ClubInputs) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data)
  })
}

export async function updateClub(id: number, data: ClubInputs) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs/${id}`, {
    method: 'put',
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data)
  })
}

export async function removeClub(id: number) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs/${id}1111`, {
    method: 'delete',
    headers: {
      "Content-Type": "application/json",
    },
  })
}


export const schema = z.object({
  name: z.string().min(3, { message: 'Required' }).max(255),
  isActive: z.boolean(),
});
