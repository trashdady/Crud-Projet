import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/Page.css";
import Loading from "./Loading";
import axios from "axios";
const Right = () => {
  const myToken = localStorage.getItem("token");

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [notes, setnotes] = useState([]);
  const [isupdating, setisupdating] = useState(false);
  const [currid, setcurrid] = useState();
  const [isloading, setisloading] = useState(true);
  const [uptitle, setuptitle] = useState("");
  const [upcontent, setUpcontent] = useState("");
  const [loadingUpdate, setloadingUpdate] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      axios
        .delete(`https://notes.devlop.tech/api/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        })
        .then(() => {
          getNotes();
        })
        .catch((err) => console.error("Error deleting note:", err));
    }
  };

  const handleTitle = (e) => {
    settitle(e.target.value);
  };

  const handleDesc = (e) => {
    setdesc(e.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleUpdate = (id) => {
    setisupdating(true);
    setloadingUpdate(true);
    setcurrid(id);
    axios
      .get(`https://notes.devlop.tech/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        setuptitle(res.data.title);
        setUpcontent(res.data.content);
        setloadingUpdate(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          alert(err);
          window.location.reload();
        }
      });
  };

  const [titlee, settitlee] = useState("");
  const [descr, setdescr] = useState("");

  const settofalse = () => {
    setisupdating(false);
  };

  useEffect(() => {
    if (currid && myToken) {
      axios
        .get(`https://notes.devlop.tech/api/notes/${currid}`, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        })
        .then((res) => console.log(res));
    }
  }, [currid, myToken]);

  const handletitlee = (e) => {
    settitlee(e.target.value);
  };

  const handleContent = (e) => {
    setdescr(e.target.value);
  };

  const handleUpdatee = () => {
    axios
      .put(
        `https://notes.devlop.tech/api/notes/${currid}`,
        {
          title: titlee,
          content: descr,
        },
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      .then(() => {
        getNotes();
        setisupdating(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          alert(err);
          window.location.reload();
        }
      });
  };

  const handleAdd = () => {
    if (title && desc) {
      axios
        .post(
          "https://notes.devlop.tech/api/notes",
          {
            title: title,
            content: desc,
          },
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            getNotes();
            setShowModal(false);
          }
        })
        .catch((err) => {
          alert(err);
          window.location.reload();
        });
    }
  };

  const classup = isupdating ? "willupadte" : "willnotupdate";

  const getNotes = () => {
    setisloading(true);

    axios
      .get("https://notes.devlop.tech/api/notes", {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      .then((res) => {
        setnotes(res.data);
        setisloading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNotes();
  }, [myToken]);

  return (
    <>
      <div className="rightSide">
        <div className="NotesList">
          <h2
            style={{
              color: "#fff",
              fontSize: "30px",
            }}
          >
            Hello {localStorage.getItem("firstName")} 👋
          </h2>
          <div className="btns">
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              style={{
                backgroundColor: '#ddcb89',
                color : '#000',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center'
              }}
              className="add"
              onClick={toggleModal}
            >
              Add Note
            </motion.button>
          </div>
        </div>
        {showModal && (
          <div className="modal-overlay">
            <motion.div
              initial={{
                y: 50,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="modal"
            >
              <button className="close-btn" onClick={toggleModal}>
                <motion.svg
                  whileHover={{
                    rotate: 180,
                  }}
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#000"
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </motion.svg>
              </button>
              <div className="formm">
                <label>Title :</label>
                <input
                  type="text"
                  className="upd"
                  onChange={handleTitle}
                  placeholder="title"
                />
              </div>
              <div className="formm">
                <label>Content :</label>
                <input
                  type="text"
                  className="upd"
                  onChange={handleDesc}
                  placeholder="description"
                />
              </div>
              <motion.button
              style={{
                backgroundColor: '#ddcb89',
                color : '#000',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center'
              }}
                className="add"
                onClick={handleAdd}
                whileHover={{
                  scale: 1.1,
                }}
              >
                Add New Note
              </motion.button>
            </motion.div>
          </div>
        )}
        <div className="Notes">
          {notes.map((note) => (
            <div className="tbody">
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                className="Delete"
                onClick={(e) => handleDelete(note.id, e)}
              >
                <svg
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </motion.button>
              <div className="nextTbody" onClick={() => handleUpdate(note.id)}>
                <span className="datee">{note.date.slice(0, 10)}</span>
                <h2 className="titlee">{note.title}</h2>
                <div className="hr"></div>
                <span className="contenttt" style={{ padding: "20px 0" }}>
                  {note.content}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={isloading ? "loader" : ""}>
          {isloading && <Loading />}
        </div>
      </div>
      {isloading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="update-container">
          <motion.div className={classup}>
            <div className="headBody">
              <div className="title-button">
                <button className="add" onClick={settofalse}>
                  <motion.svg
                    whileHover={{
                      rotate: 180,
                    }}
                    style={{
                      filter: "invert(1)",
                      width: "100%",
                      height: "100%",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path fill="#fff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </motion.svg>
                </button>
              </div>
              <div className="formUpdate">
                {loadingUpdate ? (
                  <div className="animationLoading">
                    <Loading />
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      className="upd"
                      onChange={handletitlee}
                      defaultValue={uptitle}
                    />

                    <input
                      type="text"
                      className="upd"
                      onChange={handleContent}
                      defaultValue={upcontent}
                    />
                  </>
                )}

                <motion.button
                  style={{ padding: "5px 20px" }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  onClick={handleUpdatee}
                  className="Update"
                >
                  Update
                </motion.button>
              </div>
            </div>
            <div className="currid">
              <p>Current ID: {currid}</p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Right;
