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

    body: JSON.stringify(convert(data))
  })
}

export async function updateClub(id: number, data: ClubInputs) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs/${id}`, {
    method: 'put',
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(convert(data))
  })
}

export async function removeClub(id: number) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/clubs/${id}`, {
    method: 'delete',
    headers: {
      "Content-Type": "application/json",
    },
  })
}


const convert = (data: ClubInputs) => {
  return {
    name: data.name,
    is_active: data.isActive,
  }
}

export const schema = z.object({
  name: z.string().min(3, { message: 'Required' }).max(255),
  isActive: z.boolean(),
});
