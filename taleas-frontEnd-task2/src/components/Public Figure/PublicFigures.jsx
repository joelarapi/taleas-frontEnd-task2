import { useEffect, useState } from "react";
import api from "../../api/api";
import classes from "./PublicFigures.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import { useUser } from "../../context/UserContext";

const PublicFigures = () => {
  const [publicFigures, setPublicFigures] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { industryName } = useParams();
  const navigate = useNavigate();
  const {user} = useUser()

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    api
      .get("/publicFigures")
      .then((response) => {
        setPublicFigures(response.data);
      })
      .catch((error) => {
        console.log("Error fetching public figures", error);
      });

      api
      .get("/industries")
      .then((response) => {
        setIndustries(response.data);
      })
      .catch((error) => {
        console.log("Error fetching industries", error);
      });
  }, []);

  const handleAddPublicFigure = () => {
    navigate("/publicFigure/add");
  };

  const handleCardClick = (id) => {
    navigate(`/publicFigure/${id}`);
  };

  const filteredPublicFigures = industryName
    ? publicFigures.filter(
        (pf) =>
          pf.industries &&
          pf.industries.some(
            (industry) =>
              industry.name.toLowerCase() === industryName.toLowerCase()
          )
      )
    : publicFigures;

  const handleIndustryClick = (industryName) => {
    if (industryName === "all") {
      navigate(`/publicFigures`);
    } else {
      navigate(`/publicFigures/${industryName.toLowerCase()}`);
    }
  };

  const selectedIndustryName = industryName
    ? industries.find(
        (industry) => industry.name.toLowerCase() === industryName.toLowerCase()
      )?.name
    : null;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.main}>
          <aside className={classes.industryFilter}>
            <h2>Filter By Industry:</h2>
            <ul>
              <li
                className={!industryName ? classes.active : ""}
                onClick={() => handleIndustryClick("all")}
              >
                All Industries
              </li>
              {industries.map((industry) => (
                <li
                  key={industry._id}
                  className={
                    industryName === industry.name.toLowerCase()
                      ? classes.active
                      : ""
                  }
                  onClick={() =>
                    handleIndustryClick(industry.name.toLowerCase())
                  }
                >
                  {industry.name}
                </li>
              ))}
            </ul>
          </aside>

          <section className={classes.publicFigureSection}>
            <div className={classes.cardHeader}>
              <h1>
                {selectedIndustryName
                  ? `Public Figures in ${selectedIndustryName}`
                  : "All Public Figures"}
              </h1>
              {user && user.isAdmin && ( 
            <Button onClick={handleAddPublicFigure}> Add A Public Figure</Button>
          )}
            </div>

            <div className={classes.cardDisplay}>
              {filteredPublicFigures.map((publicFigure) => (
                <div key={publicFigure._id} className={classes.figureCard}>
                  <div
                    className={classes.redirectPart}
                    onClick={() => handleCardClick(publicFigure._id)}
                  >
                    <img src={publicFigure.imageUrl} alt={publicFigure.name} />
                    <h3>{publicFigure.name}</h3>
                    <div className={classes.industriesCell}>
                      <ul className={classes.industriesCell}>
                        {publicFigure.industries &&
                        publicFigure.industries.length > 0
                          ? publicFigure.industries.map((industry) => (
                              <li
                                key={industry._id}
                                className={classes.industries}
                              >
                                {industry.name}
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PublicFigures;
