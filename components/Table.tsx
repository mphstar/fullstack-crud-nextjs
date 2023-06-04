
import type { Position } from "@prisma/client"

interface pegawaiPosition {
    id: number;
    name: string;
    job: string;
    favcolor: string | null;
    positionId: number;
    position: Position;
}

const Table = ({ pegawai }: { pegawai: pegawaiPosition[] }) => {


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
                                                <img src="https://plus.unsplash.com/premium_photo-1685125885305-283d5dd0964f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Avatar Tailwind CSS Component" />
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
                                <td>{elemen.name}</td>
                                <th>
                                    <div className="flex flex-col gap-2 w-full justify-center items-center">
                                        <button className="btn btn-info w-fit">Edit</button>
                                        <button className="btn btn-error w-fit">Delete</button>
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