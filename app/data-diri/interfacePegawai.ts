import { Position } from "@prisma/client";

export interface pegawaiPosition {
    id: number;
    name: string;
    job: string;
    favcolor: string | null;
    positionId: number;
    position: Position;
}