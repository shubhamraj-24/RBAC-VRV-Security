import React from 'react'
import Pagination from './Pagination.tsx';

interface ListType {
    _id: string;
    username: string;
    department: string;
    email: string;
  }

const Table = ({list,toggleModal , userType,deleteRole,editRole,requestPageNum}) => {


const {userRoleList ,nextPageNumber ,totalPage,nextPage,currentPage } = list;

console.log("userRoleList?.length === 0 || !userRoleList",userRoleList?.length === 0 || !userRoleList)
  return (
    <>
    <div className="rounded-lg  m-5">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-2xl font-bold text-gray-900 ">  {userType === "manager" ? "Managers List" : "Users List" } </p>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          <button
            onClick={() => toggleModal(userType)}
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button"
          >
          {userType === "manager" ? " Add Manager" : "Add User" }
          </button>
        </div>
      </div>
    </div>
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Department
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Team
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
      
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
         
        {userRoleList?.length >0 && userRoleList.map((data: ListType) => {
                return (
                  <tr className="hover:bg-gray-50" key={data._id}>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {data?.username} 
                        </div>
                        <div className="text-gray-400">{data?.email}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-black-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">{data?.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                          Design
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                          Product
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                          Develop
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button x-data="{ tooltip: 'Delete' }" onClick={() => deleteRole(data._id ,userType)} >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            x-tooltip="tooltip"
                            >
                            <path
                              strokeLinecap="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                        <button x-data="{ tooltip: 'Edite' }"  onClick={() => editRole(data)} >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              strokeLinecap="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }) }
        </tbody> 
      </table>
     {
      userRoleList?.length === 0 || !userRoleList  ?   <p className='px-6 py-4 font-medium text-gray-900 text-center ' >NO DATA </p> : null
     } 
    </div>
    {
       userRoleList?.length > 0  &&   <Pagination nextPageNumber={nextPageNumber} totalPage={totalPage} nextPage={nextPage} currentPage={currentPage} requestPageNum={requestPageNum} userType={userType} />
     } 
   
  </>
  )
}

export default Table