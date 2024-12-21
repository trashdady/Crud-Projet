import "../styles/Page.css";
import { motion } from "framer-motion";
import Right from "./Right";
import { useState } from "react";

const Page = (props) => {
  const [istoggle, setistoggle] = useState(false);

  const handleMenu = () => {
    setistoggle((prev) => !prev);
  };

  
  const LogOut = () => {
    props.setisConnected(false);
  };

  return (
    <>
      <div className="container">
        <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        className="leftSideContainer">
          <div
            className={istoggle ? "none" : "leftSide"}
          >
            <motion.button
              whileHover={{
                scale: 1.2,
                x: 10,
              }}
              className="LogOut"
              onClick={LogOut}
            >
              Log Out
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
              </svg>
            </motion.button>
          </div>
          <div className="toggler">
            <button
              onClick={handleMenu}
              className={istoggle ? "left" : "right"}
            >
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="#000"
                  d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                />
              </svg>{" "}
            </button>
          </div>
        </motion.div>

        <Right />
      </div>
    </>
  );
};

export default Page;
