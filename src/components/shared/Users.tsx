import Image from 'next/image';

import { User } from '@prisma/client';

interface UserProps {
    users: User[]
}
const Users = ({ users }: UserProps) => {

    return (
        <div className="w-full  bg-dark-violet min-h-screen h-auto flex items-center justify-center p-2">
            <div className="w-10/12 h-auto flex flex-col items-center pt-2">
                <h2 className="text-3xl text-orange font-medium">Таблиця учасників</h2>

                <div className="w-full h-14 bg-light-violet  rounded-lg flex items-center justify-between p-7 mt-4">
                    <p className="text-lg font-medium text-white">№</p>
                    <p className="text-lg font-medium text-white">Ім'я</p>
                    <div className='w-16 h-5  rounded-full flex items-center justify-between '>
                        <p className="text-lg font-medium text-white">ЧР</p>
                        <Image width={25} height={30} src="/question.png" alt='df' />
                    </div>
                </div>

                <div className="w-full h-14 bg-light-violet rounded-lg border-2 border-orange flex items-center justify-between p-7  mt-4">
                    <p className="text-lg font-medium text-white">100</p>
                    <p className="text-lg font-medium text-white">Ви</p>
                    <p className="text-lg font-medium text-white">12:00</p>
                </div>

                <div className="w-full h-auto pt-3 ">
                    {
                        users.map((item, index) => {
                            const formatedDate = item.createdAt.toString().split("T")[1].slice(0, 5);
                            return (
                                <div key={item.id} className="w-full h-14 bg-light-violet rounded-lg flex items-center justify-between p-7 m-5 ml-0  ">
                                    <p className="text-lg font-medium text-white">{users.length - index}</p>
                                    <p className="text-lg font-medium text-white">{item.name}</p>
                                    <p className="text-lg font-medium text-white">{formatedDate}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <button className="w-full lg:w-80 h-14 bg-orange rounded-lg flex items-center justify-center  ">
                    <div className='w-28 h-auto flex items-center justify-around'>
                        <p className="text-xl text-white font-medium">Призи</p>
                        <Image width={30} height={30} src="/gift.svg" alt='' />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Users;
