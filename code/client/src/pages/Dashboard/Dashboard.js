import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, message, Steps } from "antd";
import { Row, Col } from "reactstrap";
import io from "socket.io-client";
import { decrease, increase } from "../../Redux/CodeGenSteps";
import { CodeOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import DynamicCodeGenerationForm from "./DynamicCodeGenerationForm";
import Mqtt from "../Mqtt/Mqtt";
import HandleAlgoBuildStart from "../Mqtt/HandleAlgoBuildStart";
import Playground from "../Playground/Playground";
import Arena from "../../components/arena/Arena";
import {
  CodeSandboxOutlined,
  FireOutlined,
  StepBackwardOutlined,
  CloudUploadOutlined,
  StepForwardOutlined,
  BuildOutlined,
} from "@ant-design/icons";

// socket.io connection socket
const socket = io("http://localhost:5001");

function Dashboard() {
  // antd steps
  const { Step } = Steps;

  // socket related variables
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [msgs, setMsgs] = useState([]);
  const [status, setStatus] = useState(""); //virtual robot status

  // State for robot information
  const [vrobotInfo, setVrobotInfo] = useState({
    vRobotId: "",
    xCoordinate: "",
    yCoordinate: "",
    heading: "",
  });

  // to select points to add new robots
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedArenaJsonData, setSelectedArenaJsonData] = useState({});

  const handlePointSelected = (coordinate) => {
    setSelectedPoint(coordinate);
  };

  // State for multiple robots
  const [vrobots, setVrobots] = useState([]);
  console.log(vrobots);
  // redux related variables
  const dispatch = useDispatch();
  const {
    selectedLanguage,
    firmwareFile,
    dynamicCodeObject,
    algorithmName,
    generatedCppCode,
    generatedJavaCode,
    generatedCode,
    generatedXmlCode,
    isInbuiltAlgorithm,
    generatedVrobotPositions,
  } = useSelector((state) => state.firmware);
  const { step } = useSelector((state) => state.step);
  const [robotId, setRobotId] = useState(null);

  const [buildSuccessStatus, setBuildSuccessStatus] = useState(false);

  // const firmwareFile2 = "esp_robot_firmware2";

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("build", (data) => {
      setMsgs((msgs) => [...msgs, data]);
      // console.log(data);
      var terminalDiv = document.getElementById("terminalDiv");
      terminalDiv.scrollTop = terminalDiv.scrollHeight;
    });

    //Build success
    socket.on("success", (message) => {
      console.log("Success:", message);
      HandleAlgoBuildStart("build_success");
      setBuildSuccessStatus(true);
    });

    // the listeners must be removed in the cleanup step, in order to prevent multiple event registrations
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("build");
    };
    /*socket.on('connect', () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    });

    socket.on('message', (message) => {
      setStatus(message);
      console.log(message);
    });

    return () => {
      socket.disconnect();
    };*/
  }, []);

  useEffect(() => {
    console.log(`Socket connection established: ${isConnected}`);
  }, [isConnected]);

  // send build request
  const handleBuild = async () => {
    setMsgs([]);
    setBuildSuccessStatus(false);
    try {
      if (selectedLanguage === "cpp") {
        const response = await axios.post(
          `http://localhost:5001/physicalrobot/build?dir=${firmwareFile}`,
          {
            features: dynamicCodeObject,
            algorithm_name: algorithmName,
            algorithm_body: generatedCode,
            robot_id: robotId,
          }
        );

        if (response?.data?.msg) {
          message.loading(response.data.msg);
        }
      } else if (selectedLanguage === "java") {
        // Call the Java build request
        console.log(generatedCode);
        const response = await axios.post(
          `http://localhost:5001/virtualrobot/build`,
          {
            algorithm_name: algorithmName,
            algorithm_body: generatedCode,
            // isInbuiltAlgorithm: isInbuiltAlgorithm,
            robot_array: isInbuiltAlgorithm
              ? generatedVrobotPositions
              : vrobots,
          }
        );
        console.log(algorithmName);
        if (response?.data?.msg) {
          message.loading(response.data.msg);
        }
      }
    } catch (error) {
      message.error(error.message);
      setBuildSuccessStatus(false);
    }
  };
  /*
  //build virtual robot 
  const handleVirtualBuild = async () => {
    setMsgs([]);
    try {
      const response = await axios.post(
        `http://localhost:5001/build`
      );

      if (response?.data?.msg) {
        message.loading(response.data.msg);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
*/

  const handleRunAlgorithm = () => {
    HandleAlgoBuildStart("run_algorithm");
  };

  const handleArenaSelected = (value) => {
    setSelectedArenaJsonData(value);
  };

  const handleRobotId = (value) => {
    if (value < 0 || value > 15) {
      message.error("Robot id should be between 1-15");
      setRobotId(null);
    } else {
      setRobotId(value);
    }
  };

  // Function to add a new robot
  const handleAddVrobot = () => {
    // Validate robot information, you can add more validation as needed
    // first update the new coordinate values
    if (selectedPoint != null) {
      // to handle if user click add button without selecting coordinates
      vrobotInfo.xCoordinate = selectedPoint.x;
      vrobotInfo.yCoordinate = selectedPoint.y;
    }

    if (
      vrobotInfo.vRobotId &&
      vrobotInfo.xCoordinate &&
      vrobotInfo.yCoordinate &&
      vrobotInfo.heading
    ) {
      // Add the new robot to the array
      setVrobots([...vrobots, vrobotInfo]);
      console.log(vrobots);
      // Clear the input fields
      setVrobotInfo({
        vRobotId: "",
        xCoordinate: "",
        yCoordinate: "",
        heading: "",
      });
    } else {
      message.error("Please enter valid robot information.");
    }
  };

  // Function to handle changes in robot information inputs
  const handlevRobotInfoChange = (field, value) => {
    setVrobotInfo({
      ...vrobotInfo,
      [field]: value,
    });
  };

  return (
    <div className="mt-5 mb-5">
      {/* Antd steps component */}
      <div className="col-lg-10 mt-3 mb-5 mx-auto step-area">
        <Steps current={step}>
          <Step
            title="Algorithm Generation"
            icon={
              <div style={{ marginTop: "-5px" }}>
                <BuildOutlined />
              </div>
            }
          />
          <Step
            title="Dynamic Code Generation"
            icon={
              <div style={{ marginTop: "-5px" }}>
                <CodeSandboxOutlined />
              </div>
            }
          />
          <Step
            title="Build"
            icon={
              <div style={{ marginTop: "-5px" }}>
                <FireOutlined />
              </div>
            }
          />
          <Step
            title="OTA Upload"
            icon={
              <div style={{ marginTop: "-5px" }}>
                <CloudUploadOutlined />
              </div>
            }
          />
        </Steps>
      </div>

      {/* Blockly Playground */}
      {step === 0 && <Playground />}

      {/* Dynamic code generation step */}
      {step === 1 && (
        <>
          <DynamicCodeGenerationForm onArenaSelected={handleArenaSelected} />
          {selectedLanguage === "java" && !isInbuiltAlgorithm && (
            <Row className="mt-3">
              {/* Render Robot Information Input Fields */}

              <Col xxl="6" xl="6" lg="6" md="6" sm="12" xs="12">
                <h6>Virtual Robot ID</h6>
                <Input
                  value={vrobotInfo.vRobotId}
                  onChange={(e) =>
                    handlevRobotInfoChange("vRobotId", e.target.value)
                  }
                />
              </Col>
              <Col xxl="6" xl="6" lg="6" md="6" sm="12" xs="12">
                <h6>Heading</h6>
                <Input
                  value={vrobotInfo.heading}
                  onChange={(e) =>
                    handlevRobotInfoChange("heading", e.target.value)
                  }
                />
              </Col>
            </Row>
          )}

          {selectedLanguage === "java" && (
            <Row className="mt-3">
              <Col span={24} className="text-center">
                <Arena
                  onPointSelected={handlePointSelected}
                  selectedArena={selectedArenaJsonData}
                  robotPositions={generatedVrobotPositions}
                />
                {selectedPoint && (
                  <div>
                    <b>
                      Selected Coordinate: X = {selectedPoint.x}, Y ={" "}
                      {selectedPoint.y}
                    </b>
                  </div>
                )}
              </Col>
            </Row>
          )}

          {selectedLanguage === "java" && !isInbuiltAlgorithm && (
            <Row className="mt-3">
              <Col span={24} className="text-center">
                <Button onClick={handleAddVrobot}>Add Robot</Button>
              </Col>
            </Row>
          )}

          {selectedLanguage === "java" && (
            <Row className="mt-3">
              <Col span={24}>
                <h6>Added Virtual Robots:</h6>
                <ul>
                  {isInbuiltAlgorithm
                    ? generatedVrobotPositions?.map((robot, index) => (
                        <li key={index}>
                          Robot ID: {robot.vRobotId}, X: {robot.xCoordinate}, Y:{" "}
                          {robot.yCoordinate}, Heading: {robot.heading}
                        </li>
                      ))
                    : vrobots?.map((robot, index) => (
                        <li key={index}>
                          Robot ID: {robot.vRobotId}, X: {robot.xCoordinate}, Y:{" "}
                          {robot.yCoordinate}, Heading: {robot.heading}
                        </li>
                      ))}
                </ul>
              </Col>
            </Row>
          )}
        </>
      )}

      {/* Build area */}
      {step === 2 && (
        <>
          <div className="mt-4">
            <div className="terminal p-4" id="terminalDiv">
              <span className="response-msg text-light">{msgs}</span>
            </div>
          </div>

          {selectedLanguage === "java" && (
            <Row className="mt-3">
              <Col span={24} className="text-center">
                <Button
                  type="primary"
                  onClick={() => handleBuild()}
                  style={{ marginLeft: "5px" }}
                >
                  <div className="d-flex">
                    <div style={{ marginTop: "-3px", marginRight: "3px" }}>
                      <CodeOutlined />
                    </div>
                    <div>Build</div>
                  </div>
                </Button>
                {buildSuccessStatus && (
                  <Button
                    type="primary"
                    onClick={() => handleRunAlgorithm()}
                    style={{ marginLeft: "5px" }}
                  >
                    <div className="d-flex">
                      <div style={{ marginTop: "-3px", marginRight: "3px" }}>
                        <CodeOutlined />
                      </div>
                      <div>Run Algorithm</div>
                    </div>
                  </Button>
                )}
              </Col>
            </Row>
          )}
          {selectedLanguage === "cpp" && (
            <Row>
              <Col>
                <Input
                  onChange={(e) => handleRobotId(e.target.value)}
                  value={robotId}
                  type="number"
                  placeholder="Specify the robot ID"
                />
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => handleRunAlgorithm()}
                  style={{ marginLeft: "5px" }}
                >
                  <div className="d-flex">
                    <div style={{ marginTop: "-3px", marginRight: "3px" }}>
                      <CodeOutlined />
                    </div>
                    <div>Run Algorithm</div>
                  </div>
                </Button>
                {buildSuccessStatus && (
                  <Button
                    type="primary"
                    onClick={() => handleBuild()}
                    style={{ marginLeft: "5px" }}
                  >
                    <div className="d-flex">
                      <div style={{ marginTop: "-3px", marginRight: "3px" }}>
                        <CodeOutlined />
                      </div>
                      <div>Start</div>
                    </div>
                  </Button>
                )}
              </Col>
            </Row>
          )}

          <div className="mt-4 d-flex justify-content-center">
            {/* decrease the step to go back */}
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => dispatch(decrease())}
            >
              <div className="d-flex">
                <div style={{ marginTop: "-3px", marginRight: "3px" }}>
                  <StepBackwardOutlined />
                </div>
                <div>Back</div>
              </div>
            </Button>

            <Button
              onClick={() => dispatch(increase())}
              style={{ marginLeft: "5px" }}
            >
              <div className="d-flex">
                <div style={{ marginTop: "-3px", marginRight: "3px" }}>
                  <StepForwardOutlined />
                </div>
                <div>Next</div>
              </div>
            </Button>
          </div>
        </>
      )}

      {/* to handle OTA upload */}
      {step === 3 && <Mqtt />}
    </div>
  );
}

export default Dashboard;
