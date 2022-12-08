import React, { useState, useEffect } from "react";
import Header from "../../component/header/header";
import TaskList from "../../component/taskList/taskList";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { completeTask, deleteTask } from "../../redux/taskSlice";
const Home = () => {
  const allTaskList = useSelector((state) => state.task.taskList);
  const dispatch = useDispatch();

  const [modalDetails, setModalDetails] = useState({
    show: false,
    message: "",
    variant: "success",
    heading: "",
    taskOperation: "",
  });
  const [selectedTask, setSelectedTask] = useState({});

  const [taskList, setTaskList] = useState(allTaskList);
  const [alertDetails, setAlertDetails] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    setTaskList(allTaskList);
  }, [allTaskList]);

  const onCompleteTask = async () => {
    dispatch(completeTask(selectedTask.id));
    setAlertDetails({
      show: true,
      message: "Task Completed Successfully",
      variant: "success",
    });
    setModalDetails({
      show: false,
      message: "",
      variant: "success",
      heading: "",
      taskOperation: "",
    });
  };

  const onDeleteTask = async () => {
    dispatch(deleteTask(selectedTask.id));

    setAlertDetails({
      show: true,
      message: "Task Deleted Successfully",
      variant: "success",
    });
    setModalDetails({
      show: false,
      message: "",
      variant: "success",
      heading: "",
      taskOperation: "",
    });
  };

  const onConfirmOperation = () => {
    if (modalDetails.taskOperation) {
      if (modalDetails.taskOperation === "D") {
        onDeleteTask();
        return;
      }
      if (modalDetails.taskOperation === "C") {
        onCompleteTask();
        return;
      }
    }
  };

  return (
    <div className="home-conatiner">
      <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative"
      >
        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={() =>
              setAlertDetails({
                show: false,
                message: "",
              })
            }
            show={alertDetails.show}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
                onClick={() =>
                  setAlertDetails({
                    show: true,
                    message: "",
                  })
                }
              />
              <strong className="me-auto">{alertDetails.message}</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>
      </div>

      <Header />
      <TaskList
        data={taskList}
        setModalDetails={setModalDetails}
        setSelectedTask={setSelectedTask}
        selectedTask={selectedTask}
      />

      <Modal
        show={modalDetails.show}
        onHide={() =>
          setModalDetails({
            show: false,
            message: "",
            variant: "success",
          })
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalDetails.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalDetails.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() =>
              setModalDetails({
                show: false,
                message: "",
                variant: "secondary",
              })
            }
          >
            Close
          </Button>
          <Button
            type="submit"
            variant={modalDetails.variant}
            onClick={onConfirmOperation}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
