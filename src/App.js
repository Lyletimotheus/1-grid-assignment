import React, { useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Modal from "./components/Modal";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="App">
      <Header modalStatus={toggleModalVisibility} />
      {isModalVisible && <Modal modalStatus={toggleModalVisibility} />}
      <Card />
    </div>
  );
}

export default App;
