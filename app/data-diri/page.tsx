
import Modal from "@/components/Modal"
import Navbar from "@/components/Navbar"
import Paginate from "@/components/Paginate"
import Table from "@/components/Table"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
const getData = async() => {
    const res = await prisma.pegawai.findMany({
        include: {
            position: true
        }
    })
    return res
}


const Master = async () => {
    
    const data = await getData()
    console.log(data);
    
    
    return (
        <div className="h-screen w-screen flex justify-center">
            
            <div className="container h-full w-full flex flex-col items-center">
                <div className="w-full h-fit flex">
                    <Navbar />
                </div>
                <div className="w-full flex flex-row h-fit py-4 px-4 gap-2 justify-center md:justify-between">

                    <div className="form-control w-full flex ">
                        <div className="input-group w-full flex">
                            <button className="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                            <input type="text" placeholder="Search…" className="input input-bordered outline-none w-full lg:w-fit" />
                        </div>
                    </div>
                    <div className="w-fit">
                        
                        <Modal />
                    </div>
                </div>
                <div className="w-full mt-2 overflow-y-auto h-full">
                    <Table pegawai={data} />
                </div>
                <div className="flex w-full lg:justify-end py-8 justify-center">
                    <Paginate />
                </div>
            </div>
        </div>
    )
}

export default Master