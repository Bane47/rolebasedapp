import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TypeContext, MissionContext } from '../Context/Context';
import axios from 'axios';
export function MyModal(props) {
  var Name, WorkAssigned, Mission, AssignedUser, DueDate, userId
  const [mission, setMission] = useState('')
  const { admin } = useContext(TypeContext);

  const handleMission = (e) => {
    setMission(e);
  };
  const fetchData = () => {
    axios.get(`http://localhost:4000/Tasks/${parseInt(props.workId)}`)
      .then((res) => {
        console.log(res)
        Name = res.data.Name;
        WorkAssigned = res.data.WorkAssigned;
        Mission = res.data.Mission;
        AssignedUser = res.data.AssignedUser;
        DueDate = res.data.DueDate;
        userId = res.data.userId;
      }).then(() => {
        axios.put(`http://localhost:4000/Tasks/${parseInt(props.workId)}`, {
          Name: Name,
          WorkAssigned: WorkAssigned,
          Mission: mission,
          AssignedUser: AssignedUser,
          DueDate: DueDate,
          userId: userId
        })
      })
  }
 
  const assignTask=()=>{
    var count=0;
    fetch(`http://localhost:4000/Tasks`)
  .then((res)=> res.json())
  .then((response) => {
    for (const res of response) {
      count++
    }
  }).then(()=>{
      axios.post("http://localhost:4000/Tasks",{
        Name: Name,
        WorkAssigned: WorkAssigned,
        Mission: "To be started",
        AssignedUser: admin,
        DueDate: DueDate,
        userId: count+1
      })
    })
  
    
  }



  return (

    <Modal

      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {admin ? (
          <>
            <div className='d-flex justify-content-center'>
              <h4 className='col-lg-3 my-3'>Name</h4>
              <input className='col-lg-3 my-3' type="text" placeholder='Name' onChange={(e)=>Name=e.target.value} />
            </div>
            <div className='d-flex justify-content-center'>
              <h4 className='col-lg-3 my-3'>Assign Work</h4>
              <input className='col-lg-3 my-3' type="text" placeholder="Work" onChange={(e)=>WorkAssigned=e.target.value} />
            </div>
            <div className='d-flex justify-content-center'>
              <h4 className='col-lg-3 my-3'>Due Date</h4>
              <input className='col-lg-3 my-3' type="date" placeholder="Work" onChange={(e)=>DueDate=e.target.value}/>
            </div>
            
            <Modal.Footer>
              <Button variant='secondary' onClick={props.onHide}  >Done</Button>
              <Button variant='info' onClick={assignTask}>Post</Button>

            </Modal.Footer>
          </>
        ) : (
          <>
            <div className='d-flex justify-content-center'>
              <h4 className='col-lg-3 my-3'>Mission Status</h4>
              <select className='col-lg-3 my-3' name="mission" onChange={(e) => handleMission(e.target.value)}>
                <option value={props.mission}>{props.mission}</option>
                <option value="To be started">To be started</option>
                <option value="In Progress">In Progress</option>
                <option value="Accomplished">Accomplished</option>
              </select>
            </div>
            <Modal.Footer>
              <Button variant='secondary' onClick={props.onHide}  >Done</Button>
              <Button variant='info' onClick={fetchData}  >Save Changes</Button>
            </Modal.Footer>
          </>
        )}
      </Modal.Body>

    </Modal>
  )
}
