import * as z from "zod";
import {dateValidator} from "../../../utils/date";

export const schema = z.object({
  name: z.string().min(3, { message: 'Required' }).max(255),
  isActive: z.boolean().optional().nullable(),
  startsAt: dateValidator,
  endsAt: dateValidator.optional().nullable(),
  goals: z.string({required_error: 'sss', invalid_type_error: 'ddf'}).min(1),
  age: z.number().min(1).optional(),
  studentId: z.number().min(1).positive(),
  instructorId: z.number().min(1).positive(),
  trainingSessions: z.array(z.object({
    name: z.string().min(1),
    isActive: z.boolean().optional().nullable(),
    startsAt: dateValidator,
    endsAt: dateValidator.optional().nullable(),
  }))
});

export type TrainingSessionType = {
  name: string;
  isActive: boolean;
  startsAt: any;
  endsAt?: any;
}

export type Inputs = {
  name: string
  isActive?: boolean;
  startsAt: any
  endsAt?: any
  goals?: string | null
  studentId: number
  instructorId: number
  trainingSessions: TrainingSessionType[]
}

export async function createDevelopmentPlan(data: Inputs) {
  console.log(`data is: ${JSON.stringify(data,null,2)}`);

  return await fetch(`${import.meta.env.VITE_API_URL}/api/admin/development-plans`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}

export async function updateDevelopmentPlan(id: number, data: Inputs) {
  return await fetch(`${import.meta.env.VITE_API_URL}/api/admin/development-plans/${id}`, {
    method: 'put',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}
