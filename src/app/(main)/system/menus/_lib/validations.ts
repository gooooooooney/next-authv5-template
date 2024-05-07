import { menu } from "@/drizzle/schema"
import * as z from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  label: z.string().optional(),
  status: z.string().optional(),
  path: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getMenusSchema = searchParamsSchema

export type GetMenusSchema = z.infer<typeof getMenusSchema>

export const createMenuSchema = z.object({
  label: z.string().min(3).max(50),
  path: z.string().min(1).max(20),
  status: z.enum(menu.status.enumValues),
  icon: z.string(),
  type: z.enum(menu.type.enumValues),
})

export type CreateMenuSchema = z.infer<typeof createMenuSchema>

export const updateMenuSchema = z.object({
  label: z.string().min(3).max(50).optional(),
  path: z.string().min(1).max(20).optional(),
  status: z.enum(menu.status.enumValues).optional(),
})

export type UpdateMenuSchema = z.infer<typeof updateMenuSchema>