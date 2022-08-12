import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ modalStatus }) => {
  const notify = () => toast("Issue added successfully");
  const initialValues = {
    title: "",
    description: "",
    client: "",
    priority: "",
    issueType: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState([]);
  const url = "https://api.github.com/repos/1-grid/GitIntegration/issues";

  const postData = () => {
    const headers = {
      Authorization: `token ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    };
    const payLoad = {
      title: formValues.title,
      body: formValues.description,
      labels: [formValues.client, formValues.priority, formValues.issueType],
    };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payLoad),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("There was an error", error);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "The title input is required!";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validate(formValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    postData();
    setFormValues({
      title: "",
      description: "",
      client: "",
      priority: "",
      issueType: "",
    });
  };

  return (
    <>
      <ModalContainer>
        <ModalHeader>
          <h4>Create a new issue</h4>
        </ModalHeader>
        {Object.keys(formErrors).length === 0 && isSubmit && (
          <ToastContainer
            limit={1}
            position="top-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
          />
        )}
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Title text"
              value={formValues.title}
              onChange={handleChange}
            />
            <ErrorMesage>{formErrors.title}</ErrorMesage>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              required
              rows="4"
              cols="50"
              placeholder="Description text"
              value={formValues.description}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="client">Client</label>
            <select
              id="client"
              name="client"
              value={formValues.client}
              onChange={handleChange}
            >
              <option value="">Select client</option>
              <option value="C: Client ABC">Client ABC</option>
              <option value="C: Client XYZ">Client XYZ</option>
              <option value="C: Client MNO">Client MNO</option>
            </select>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formValues.priority}
              onChange={handleChange}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <label htmlFor="issueType">Issue Type</label>
            <select
              id="issueType"
              name="issueType"
              value={formValues.issueType}
              onChange={handleChange}
            >
              <option value="">Select issue type</option>
              <option value="bug">Bug</option>
              <option value="support">Support</option>
              <option value="enhancement">Enhancement</option>
            </select>
            <ButtonGroup>
              <SubmitButton type="submit" onClick={notify}>
                Submit
              </SubmitButton>
              <CloseButton type="button" onClick={modalStatus}>
                Close
              </CloseButton>
            </ButtonGroup>
          </form>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default Modal;

const ModalHeader = styled.div`
  position: absolute;
  top: 0;
  left: 38%;
  padding: 10px;

  h4 {
    text-align: center;
    color: #fff;
    font-size: 38px;
    font-weight: 300;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #797979d1;

  P {
    color: #fff;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #fff;
  margin: 2rem 0;
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  input,
  textarea,
  select {
    width: 100%;
    padding: 12px 20px;
    border: transparent;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const ErrorMesage = styled.p`
  color: #b91c1c !important;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  margin: 12px 0;
  color: #f7f9ff;
  border: none;
  background-color: #1c64f2;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
`;

const CloseButton = styled.button`
  color: #f7f9ff;
  border: none;
  background-color: #e11d48;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
`;
