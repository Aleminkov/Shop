import { Prisma } from "@prisma/client";

export const categoryReturnObject:Prisma.CategorySelect = {
    id:true,
    name:true,
    slug:true
}