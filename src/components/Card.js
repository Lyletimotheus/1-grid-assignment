import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Card = () => {
  const [data, setData] = useState([]);
  const url =
    "https://api.github.com/repos/1-grid/GitIntegration/issues?state=all";

  const fetchData = () => {
    const headers = {
      Authorization: `token ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    };
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TabHeadings>
        <h3>Number</h3>
        <h3>Title</h3>
        <h3>Description</h3>
        <h3>Client</h3>
        <h3>Priority</h3>
        <h3>Type</h3>
        <h3>Assigned To</h3>
        <h3>Status</h3>
      </TabHeadings>
      {data.map((item, index) => {
        return (
          <CardContainer key={index}>
            <p>{item.number}</p>
            <p>{item.title}</p>
            <p>{item.body}</p>
            <p>{item.labels[1] && item.labels[1].name}</p>
            <p>{item.labels[0] && item.labels[0].name}</p>
            <p>{item.labels[2] && item.labels[2].name}</p>
            <p>{item.assignees.length !== 0 && item.assignees[0].login}</p>
            <CardStatus state={item.state}>{item.state}</CardStatus>
          </CardContainer>
        );
      })}
    </>
  );
};

export default Card;

const TabHeadings = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-top: 3rem;
  padding: 0 20px;

  h3 {
    font-size: 16px;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  background-color: #fff;
  margin: 1rem;
  padding: 1.5rem 0;
  border-radius: 0.25rem;

  p {
    font-weight: 300;
    color: #0f172a;
    text-align: center;
  }
`;
const CardStatus = styled.span`
  color: ${(props) => (props.state === "closed" ? "red" : "green")} !important;
  font-weight: 500 !important;
`;
