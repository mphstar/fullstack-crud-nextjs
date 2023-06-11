"use client"

import { SyntheticEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2'
import { Pegawai, Position } from "@prisma/client"
import { pegawaiPosition } from "./../app/data-diri/interfacePegawai"


export const revalidate = 0

const Modal = ({ dataP, dataSelected }: { dataP: Position[], dataSelected: pegawaiPosition }) => {
    const [isShowDialog, setIsShowDialog] = useState(false)

    const [name, setName] = useState(dataSelected.name)
    const [job, setJob] = useState(dataSelected.job)
    const [position, setPosition] = useState(dataSelected.positionId)
    const [favcolor, setFavcolor] = useState(dataSelected.favcolor)

    const router = useRouter()

    useEffect(() => {
        setName(dataSelected.name)
        setJob(dataSelected.job)
        setPosition(dataSelected.positionId)
        setFavcolor(dataSelected.favcolor)
    }, [isShowDialog])

    const handleDialog = () => {

        setIsShowDialog(!isShowDialog)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        var error = "";

        if (name == "") {
            error = "Nama wajib diisi"
        } else if (job == "") {
            error = "Job wajib diisi"
        } else if (position == null) {
            error = "Position wajib diisi"
        } else if (favcolor == "") {
            error = "Favcolor wajib diisi"
        }

        if (error == "") {
            Swal.fire({
                title: 'Are you sure?',
                text: "Apakah anda yakin ingin mengubah data",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await fetch('/api/data-diri/update', {
                        method: 'POST',
                        body: JSON.stringify({
                            "id": dataSelected.id,
                            "name": name,
                            "job": job,
                            "positionId": Number(position),
                            "favcolor": favcolor
                        })
                    }).then((res: Response) => {
                        console.log(res);

                        Swal.fire(
                            'Berhasil',
                            'Berhasil mengubah data',
                            'success'
                        ).then(() => {

                            router.refresh()
                            handleDialog()
                        })
                    })
                }
            })


        } else {
            Swal.fire(
                'Informasi',
                error,
                'error'
            )
        }
    }

    return (
        <>
            <button onClick={handleDialog} className="btn btn-info w-fit">Edit</button>
            <dialog className={isShowDialog ? 'modal modal-open' : 'modal'}>
                <form method="dialog" className="modal-box text-base font-normal">
                    <h3 className="font-bold text-lg">Ubah Data</h3>
                    <div className="py-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Input your name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Job</span>
                            </label>
                            <input type="text" placeholder="Input your job" value={job} onChange={(e) => setJob(e.target.value)} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Position</span>
                            </label>
                            <select value={position} onChange={(e) => setPosition(Number(e.target.value))} className="select select-bordered">
                                {dataP.map((item, index) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Favorite Color</span>
                            </label>
                            <input type="text" value={String(favcolor)} onChange={(e) => setFavcolor(e.target.value)} placeholder="Input your Favorite Colour" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={handleDialog} className="btn">Close</button>
                        <button onClick={handleSubmit} className="btn btn-primary">Save</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}

export default Modal