import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()
const getData = async () => {
    const res = await prisma.pegawai.findMany({
        include: {
            position: true
        }
    })

    return res
}

export const GET = async (request: Request) => {
    const data = await getData()
    return NextResponse.json(data)
}