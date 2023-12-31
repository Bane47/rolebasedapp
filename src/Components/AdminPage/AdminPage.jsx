// admin page.js
import React, { useContext, useEffect, useState } from 'react';
import '../CSS files/CRUD.css'
import axios from 'axios';
import { TypeContext } from '../Context/Context';
import { MyModal } from '../Modal/Modal';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import ReactSearchBox from "react-search-box";


const AdminPage = () => {
  let id = useParams();
  const { userType, hitman } = useContext(TypeContext);
  const [taskIndex, setTaskIndex] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [tasks, setTasks] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [searchInput,setSearchInput] = useState('')




  const deleteData = (id) => {
    axios.delete(`http://localhost:4000/Tasks/${id}`)
      .then(() => {
        alert("Task Deleted")
      })
  }






  const sortItems = (tasks) => {
    var sortedTasks = [...tasks];

    switch (sortOption) {

      case 'All':
        return sortedTasks;
      case 'To be started':
        console.log(sortedTasks.filter((item) => item.Mission === 'To be started'))
        return sortedTasks.filter((item) => item.Mission === 'To be started');
      case 'In Progress':
        return sortedTasks.filter((item) => item.Mission === 'In Progress');
      case 'Accomplished':
        return sortedTasks.filter((item) => item.Mission === 'Accomplished');
      default:
        return sortedTasks;
    }


    // console.log(tasks)
    // switch (sortOption) {
    //   case 'To be started':
    //     for (let i = 0; i < sortedTasks.length; i++) {

    //       console.log(sortOption)
    //       if (sortOption === sortedTasks[i].Mission) {
    //         Element = sortedTasks[i]
    //         console.log(Element)
    //       }

    //     }
    //     console.log(typeof(Element))
    //     return Element;

    //   case 'In Progress':
    //     for (let i = 0; i < sortedTasks.length; i++) {

    //       console.log(sortOption)
    //       if (sortOption === sortedTasks[i].Mission) {
    //         console.log("HJVGHVGY")
    //         Element = sortedTasks[i]
    //         console.log(Element)
    //       }

    //     }
    //     sortedTasks= Element;

    //   case 'Accomplished':
    //     for (let i = 0; i < sortedTasks.length; i++) {

    //       console.log(sortOption)
    //       if (sortOption === sortedTasks[i].Mission) {
    //         Element = sortedTasks[i]
    //         console.log(Element)
    //       }

    //     }

    //     return Element;
    //   default:

    //     sortedTasks.sort((a, b) => {
    //       switch (sortOption) {
    // case 'Ascending':
    //   console.log((a.Name.localeCompare(b.Name)))
    //   return a.Name.localeCompare(b.Name);
    // case 'Descending':
    //   return b.Name.localeCompare(a.Name);
    //         default:
    //           return 0;

    //       }
    //     }

    //     )

    //     return sortedTasks;

  }

  const searchItem=()=>{
    console.log(searchInput)
    axios.get(`http://localhost:4000/Tasks?Name_like=${searchInput}`)
    .then((data) => {
        setTaskIndex(data.data) 
                  
    
    })
    console.log(sortedTasks)
  //   if(taskIndex.length>0){
  //   sortedTasks = [...taskIndex];
  //   sortedTasks.filter((item)=>item.Name===searchInput)
  // }else return(
  //   <h1>No tasks</h1>
  // )
  }



  // return sortedTasks;


  const handleSortChange = (event) => {
    setSortOption(event.target.value)
  }
  const sortDataFetch = () => {
  if(userType==='Admin'){
    axios.get(`http://localhost:4000/Tasks`)
      .then((data) => {
                 setTaskIndex(data.data)              
      
      })

    }
    else{
      axios.get(`http://localhost:4000/Tasks?Name=${hitman}`)
      .then((data) => {
          setTaskIndex(data.data)              
      
      })
    }
  }
  const sortedTasks = Array.isArray(taskIndex) ? sortItems(taskIndex) : []


  useEffect(() => {
    sortDataFetch();
console.log(hitman)
  }, [])

  return (
    <div>
      <>
        {userType === "Admin" && (
          <>
            <Button variant="dark" className='float-end me-2 shadow mt-2' onClick={() => setModalShow(true)}>Assign Task</Button>
            <MyModal id="modal1" adminModal={true} show={modalShow} onHide={() => setModalShow(false)} />

            <div className='float-start mt-2 ms-1'>
              
              <input type="text" placeholder='search' onChange={(e)=>setSearchInput(e.target.value)} />
              <button onClick={searchItem}>Search</button>
            </div>
          </>
        )}
        {hitman !== "NoUser" ? (
          <>

            
              <select className="mt-2 text-center float-end me-1 p-1" value={sortOption} onChange={handleSortChange} >
                {/* <option value="Ascending">Sort by Ascending</option>
                <option value="Descending">Sort by Descending</option> */}
                <option value="" disabled>Sort By:</option>
                <option value="All">All</option>
                <option value="To be started">To Be Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Accomplished">Accomplished</option>

              </select>
          


            <h1 className='m'>Status Report</h1>
            <table className=' table table-striped my-3 '>
              <thead>

                <th className='px-4'>Mission ID</th>
                <th className='px-4'>Name</th>
                <th className='px-4'>Work Assigned</th>
                <th className='px-4'>Mission</th>
                <th className='px-4'>Assigned Admin</th>
                <th className='px-4'>Due Date</th>
                {userType === 'Admin' ? (
                  <th className='px-4'>Operations</th>
                ) : (
                  <th className='px-4'>Update Status</th>
                )}
              </thead>

              {sortedTasks.length > 0 && (
                <tbody>
                  {sortedTasks.map((task) => (
                    <tr >

                      <td className='text-black py-3 px-4'>{task.userId}</td>
                      <td className='text-black py-3 px-4'>{task.Name}</td>
                      <td className='text-black py-3 px-4'>{task.WorkAssigned}</td>

                      <td className='text-black py-3 px-4'>{task.Mission}</td>
                      <td className='text-black py-3 px-4'>{task.AssignedUser}</td>
                      <td className='text-black py-3 px-4'>{task.DueDate}</td>

                      {userType === 'Admin' ? (
                        <td className='d-flex justify-content-center py-3 px-4'>
                          <button className="delete-button  bg-danger shadow mx-2" onClick={() => deleteData(task.id)}>
                            <svg className="delete-svgIcon" viewBox="0 0 448 512">
                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                            </svg>
                          </button>

                        </td>
                      ) : (
                        <td className='d-flex justify-content-center py-3 px-4'>
                          <button className="edit-button bg-info shadow mx-2 " onClick={() =>{ setModalShow(true); setTaskId(parseInt(task.id))}}>
                            <svg className="edit-svgIcon" viewBox="0 0 512 512">
                              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                            </svg>
                          </button>
                          {console.log(taskId)}
                          <MyModal id="modal2" workId={taskId}
                            mission={task.Mission}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </td>
                      )}

                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </>
        ) : (<h1>Kindly gain the access to see the status report</h1>
        )}

      </>
    </div>
  );
};

export default AdminPage;
