import { Pegawai, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Pegawai = await request.json()
    const pegawai = await prisma.pegawai.delete({
        where: {
            id: body.id
        }
    })

    return NextResponse.json({
        "status": "success",
        "data": pegawai
    })
};
