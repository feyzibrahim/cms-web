import React, { useState, useEffect } from "react";
import Loader from "../../../globalClasses/Loader";
import DepartmentTile from "./DepartmentTile";
import { useAuthContext } from "../../../Hook/contextHooks/useAuthContext";
import { Col, Row } from "antd";
import img from "../../../img/noCollegeData.png";
import DepartmentForm from "./DepartmentForm";
import { useDepartmentContext } from "../../../Hook/contextHooks/useDepartmentContext";

const Departments = () => {
  var today = new Date(),
    date = today.toTimeString();

  const { user } = useAuthContext();
  const { department, dispatch } = useDepartmentContext();
  const [isPending, setIsPending] = useState(true);
  const [isNotForm, setIsNotForm] = useState(true);

  const showForm = () => {
    setIsNotForm(!isNotForm);
  };

  useEffect(() => {
    const abortConst = new AbortController();
    const fetchData = async () => {
      const response = await fetch("/api/department", {
        signal: abortConst.signal,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        dispatch({ type: "SET_DEPARTMENT", payload: json });
        setIsPending(false);
      }
      if (!response.ok) {
        console.log(json.error);
      }
    };

    fetchData();
    return () => abortConst.abort();
  }, []);

  return (
    <div className="addSomeMargin">
      <div className="dHomeNav">
        <div className="dHomeNavLeft">
          <h1>Departments</h1>
          <p>{date}</p>
        </div>
        <div className="depHomeNavRight">
          <button
            className="fullColoredButton"
            onClick={() => {
              showForm();
            }}
          >
            {isNotForm ? "Add New Department" : "Go back"}
          </button>
          <span className="material-symbols-outlined">notifications</span>
        </div>
      </div>
      {isPending ? (
        <Loader />
      ) : isNotForm ? (
        department != null && department.length > 0 ? (
          <Row gutter={[24, 32]} className="departmentRow">
            {department &&
              department.map((department) => {
                return (
                  <Col lg={8} key={department._id}>
                    <DepartmentTile department={department} />
                  </Col>
                );
              })}
          </Row>
        ) : (
          <div className="collegeDataNotFound">
            <div className="collegeDataNotFoundContainer">
              <img src={img} alt="No data found" />
              <h2>Department Are Not Added</h2>
              <h5>Please update Department details by Clicking below button</h5>
              <button className="fullColoredButton" onClick={() => showForm()}>
                Click Here
              </button>
            </div>
          </div>
        )
      ) : (
        <DepartmentForm showForm={showForm} />
      )}
    </div>
  );
};

export default Departments;
