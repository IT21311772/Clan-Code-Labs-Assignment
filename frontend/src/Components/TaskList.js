import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import '../Styles/tasks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp91 } from '@fortawesome/free-solid-svg-icons';

function TaskList() {
  // Use of useState
  const [data, setData] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [order, setOrder] = useState("ASC");

  // Use of useEffect
  useEffect(() => {
    axios.get("/api/task/tasks")
      .then((res) => {
        console.log(res)
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Update and Delete functionalities
  const deletePost = (id) => {
    let confirmMessage = "Do you want to delete this task ?";
    if (window.confirm(confirmMessage) === true) {
      axios
        .delete(`/api/task/delete/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      window.location.reload();
    }
  };

  const updatePost = (post) => {
    setUpdatedPost(post);
    handleShow();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    axios
      .put(`/api/task/update/${updatedPost._id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  // Use bubble Sort Algorithm to sort the data -- Bonus Feature 01
  const bubbleSort = (array, col) => {
    const arr = [...array];
    const n = arr.length;
    let swapped;

    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if ((order === "ASC" && arr[i][col] > arr[i + 1][col]) || (order === "DESC" && arr[i][col] < arr[i + 1][col])) {
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);

    return arr;
  };

  const sorting = (col) => {
    const sortedData = bubbleSort(data, col);
    setData(sortedData);
    setOrder(order === "ASC" ? "DESC" : "ASC");
  };

  return (
    <div className="tasks">
      <Modal show={show} onHide={handleClose} 
        style={{width: "25%", border: "1px solid #3D737F", marginLeft: "38%", background: "#3D737F", color: "#d1e6e6", borderRadius: "5px", marginTop: "40px"}}>
        <Modal.Header>
          <Modal.Title style={{textAlign: "center", margin: 10, fontWeight: "700"}}>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{ display: "grid", marginLeft: "23%"}}>
              <Form.Control
                name="title"
                style={{ width: "60%", background: "#3D737F", color: "#d1e6e6", border: "1px solid #d1e6e6", margin: "10px"}}
                value={updatedPost.title ? updatedPost.title : ""}
                onChange={handleChange} />
              <Form.Control
                name="description"
                style={{ width: "60%", background: "#3D737F", color: "#d1e6e6", border: "1px solid #d1e6e6", margin: "10px"}}
                value={updatedPost.description ? updatedPost.description : ""}
                onChange={handleChange} />
              <Form.Control
                name="days"
                style={{ width: "60%", background: "#3D737F", color: "#d1e6e6", border: "1px solid #d1e6e6", margin: "10px"}}
                value={updatedPost.days ? updatedPost.days : ""}
                onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{display: "grid", marginLeft: "35%", marginTop: "5%"}}>
          <Button 
            style={{background: "#d1e6e6", border: "1px solid #d1e6e6", color: "#07161B", width: "46%", borderRadius: "2px", cursor: "pointer"}}
            onClick={saveUpdatedPost} >Save Changes</Button>
          <Button 
            style={{background: "#d1e6e6", border: "1px solid #d1e6e6", color: "#07161B", width: "46%", borderRadius: "2px", marginTop: "10px", marginBottom: "15px", cursor: "pointer"}}
            onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      {data ? (
        <div className="container">
          <div className="buttons">
            <Button style={{width: "3%", marginTop: "5px"}}><Link to="/add"><FontAwesomeIcon icon={faPlus} /></Link></Button>
            <Button onClick={() => sorting('title')}>Sort By Title<FontAwesomeIcon icon={faArrowUp91} className="icons" /></Button>
            <Button onClick={() => sorting('days')}>Sort By Days<FontAwesomeIcon icon={faSort} className="icons" /></Button>
          </div>

          <h1 style={{textAlign: "center", color: "#07161B"}}>Admin Task Panel</h1>
          <br />

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col" className="th">Description</th>
                <th scope="col">Days</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            {data.map((post, index) => {
              return (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{post.days}</td>
                    <td><Button onClick={() => updatePost(post)}>UPDATE</Button></td>
                    <td><Button onClick={() => deletePost(post._id)}>DELETE</Button></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default TaskList
