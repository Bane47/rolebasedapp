import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MissionContext } from '../Context/Context';

export function MyModal(props) {
    const { setMission } = useContext(MissionContext);


    const handleMission = (e) => {
        setMission(e);
    };
  
    return (
        <MissionContext.Provider value={{ setMission }}>
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
          {props.name ? (
            <>
              <div className='d-flex justify-content-center'>
                <h4 className='col-lg-3 my-3'>Name</h4>
                <input className='col-lg-3 my-3' type="text" placeholder='Name'/>
              </div>
              <div className='d-flex justify-content-center'>
                <h4 className='col-lg-3 my-3'>Assign Work</h4>
                <input className='col-lg-3 my-3' type="text" placeholder="Work"/>
              </div>
              <div className='d-flex justify-content-center'>
                <h4 className='col-lg-3 my-3'>Due Date</h4>
                <input className='col-lg-3 my-3' type="text" placeholder="Date" />
              </div>
            </>
          ) : (      
            <div className='d-flex justify-content-center'>
              <h4 className='col-lg-3 my-3'>Mission Status</h4>
              <select className='col-lg-3 my-3' name="mission" onChange={(e)=> handleMission(e.target.value)}>
                <option value={props.mission}>{props.mission}</option>
                <option value="To be started">To be started</option>
                <option value="In Progress">In Progress</option>
                <option value="Accomplished">Accomplished</option>
              </select>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='info' onClick={props.onHide}>Done</Button>
        </Modal.Footer>
      </Modal>
      </MissionContext.Provider>    );
  }
  