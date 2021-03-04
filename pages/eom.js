import { Toolbar } from "../components/toolbar";
import styles from "../styles/EOM.module.css";

export const EOM = ({ employee }) => {
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Employee of the month</h1>
        <div className={styles.employeeofTheMonth}>
          <div>{employee.name}</div>
          <div>{employee.position}</div>
          {employee && (
            <img src={employee.image} alt={`${employee.position}`} />
          )}
          <div>{employee.description}</div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch(
    "https://my-json-server.typicode.com/portexe/next-news/employeeofTheMonth"
  );

  const employee = await apiResponse.json();

  return {
    props: {
      employee,
    },
  };
};

export default EOM;
