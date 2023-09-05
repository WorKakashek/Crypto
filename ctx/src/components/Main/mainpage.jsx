import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./main.scss";
import { Link } from "react-router-dom";
import GraficPage from "../Grafics/grafic";

function MainPage() {
  const [symbol, setSymbol] = useState([]);
  const [crypto, setCrypto] = useState("");
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [inputValue, setInputValue] = useState("");
  //------------------------
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  //------------------------
  async function getSymbols() {
    await axios
      .get("https://api.api-ninjas.com/v1/cryptosymbols", {
        headers: { "X-Api-Key": "Ua2fxXybbRgVxJudxRfdHw==9FmWol4OpVRAlYnj" },
      })
      .then((res) => {
        setSymbol(res.data.symbols);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //------------------------
  async function pushCrypto(crypto) {
    await axios
      .post("http://localhost:5000/push", {
        cryptoName: crypto,
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //------------------------
  useEffect(() => {
    getSymbols();
  }, []);

  const handleCryptoClick = (crypto) => {
    setCrypto(crypto);
    pushCrypto(crypto);
  };
  const filteredCrypto = symbol.filter((crypto) => {
    return crypto.includes(value.toUpperCase());
  });
  return (
    <Container className="container" fluid>
      <Row className="row">
        <Col className="regularColumn" xxl={4} xl={4} lg={4} md={4}>
          <div className="inputContainer">
            {inputError && <p className="error-message">{inputError}</p>}
            <input
              placeholder="Search in the crypto"
              type="text"
              value={inputValue}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (inputValue.length > 30) {
                  setInputError("Input exceeds 30 characters");
                } else {
                  setInputError("");
                  setValue(inputValue);
                }
                if (inputValue.length <= 30) {
                  setInputValue(inputValue);
                }
              }}
            />
          </div>

          <div className="cryptoCol">
            {value ? (
              filteredCrypto.map((crypto, index) => {
                return (
                  <Link
                    onClick={() => handleCryptoClick(crypto)}
                    key={index}
                    className="cryptoBtn"
                    // to={"/more"}
                  >
                    {crypto}
                  </Link>
                );
              })
            ) : (
              <p>
                To see a list of cryptocurrencies, please enter a name (BTCUSD)
              </p>
            )}
          </div>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={8}>
          <GraficPage crypto={crypto} />
        </Col>
        <Col className={isMenuOpen ? "open" : ""}>
          <button className="menu-toggle-button" onClick={toggleMenu}>
            ☰
          </button>
          <div className={isMenuOpen ? "menuopen" : "menu"}>
            {
              <>
                <div className="inputContainerMedia">
                  {inputError && <p className="error-message">{inputError}</p>}
                  <input
                    placeholder="Search in the crypto"
                    type="text"
                    value={inputValue}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      if (inputValue.length > 30) {
                        setInputError("Input exceeds 30 characters");
                      } else {
                        setInputError("");
                        setValue(inputValue);
                      }
                      if (inputValue.length <= 30) {
                        setInputValue(inputValue);
                      }
                    }}
                  />
                </div>

                <div className="cryptoCol">
                  {value ? (
                    filteredCrypto.map((crypto, index) => {
                      return (
                        <Link
                          onClick={() => {
                            handleCryptoClick(crypto);
                            toggleMenu();
                          }}
                          key={index}
                          className="cryptoBtn"
                          // to={"/more"}
                        >
                          {crypto}
                        </Link>
                      );
                    })
                  ) : (
                    <p>
                      To see a list of cryptocurrencies, please enter a name
                      (BTCUSD)
                    </p>
                  )}
                </div>
              </>
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default MainPage;
