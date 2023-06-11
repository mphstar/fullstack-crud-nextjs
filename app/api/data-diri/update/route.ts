import { Pegawai, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    const body: Pegawai = await request.json()
    const pegawai = await prisma.pegawai.update(
        {
            where: {
                id: body.id
            },
            data: {
                name: body.name,
                job: body.job,
                positionId: body.positionId,
                favcolor: body.favcolor
            }
        }
    )

    return NextResponse.json({
        "status": "success",
        "data": pegawai
    })
};
