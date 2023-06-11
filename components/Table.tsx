"use client"

import type { Position } from "@prisma/client"
import Image from "next/image";
import ModalUpdate from "./ModalUpdate";
import { pegawaiPosition } from "./../app/data-diri/interfacePegawai"
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";


const Table = ({ pegawai, posisi }: { pegawai: pegawaiPosition[], posisi: Position[] }) => {

    const router = useRouter()
    

    const handleDelete = async (peg: pegawaiPosition, e: SyntheticEvent)  => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! " + peg.name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch('/api/data-diri/delete', {
                    method: 'POST',
                    body: JSON.stringify({
                        "id": peg.id,
                    })
                }).then((res: Response) => {
                    console.log(res);

                    Swal.fire(
                        'Berhasil',
                        'Berhasil menghapus data',
                        'success'
                    ).then(() => {
                    })

                    router.refresh()
                })


                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }


    return (
        <div className="overflow-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pegawai.map((elemen, index) => {
                        return (
                            <tr key={index}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <Image alt="image" src='https://images.unsplash.com/photo-1685703206366-d514f27076ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80' width={2024} height={2024} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{elemen.name}</div>
                                            <div className="text-sm opacity-50">Indonesian</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {elemen.job}
                                    <br />
                                    <span className="badge badge-ghost badge-sm h-fit py-2 rounded-lg">{elemen.position.name}</span>
                                </td>
                                <td>{elemen.favcolor}</td>
                                <th>
                                    <div className="flex flex-col gap-2 w-full justify-center items-center">
                                        <ModalUpdate dataP={posisi} dataSelected={elemen} />
                                        <button onClick={(e) => handleDelete(elemen, e)} className="btn btn-error w-fit">Delete</button>
                                    </div>
                                </th>
                            </tr>
                        )
                    })}

                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th className="text-center">Action</th>
                    </tr>
                </tfoot>

            </table>
        </div>
    )
}

export default Table