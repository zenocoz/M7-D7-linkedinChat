import React, { Component } from "react"
// import { Chat, addResponseMessage } from "react-chat-popup"
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles.scss"
import io from "socket.io-client"
import { getLocalStorage } from "../../helpers/localStorage"
import { useState, useEffect } from "react"
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap"

const connOpt = {
  transports: ["websocket", "polling"],
}

let socket = io("https://striveschool-api.herokuapp.com", connOpt)

let userName = getLocalStorage("user").username

const MyChat = () => {
  // socket = null

  // state = {
  //   message: "",
  //   messages: [],
  //   showModal: true,
  //   userName: getLocalStorage("user").username,
  // }

  const [message, setMessage] = useState("")
  const [showModal, setShowModal] = useState(true)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to socket")
    })
    socket.on("list", console.log)
  }, [])
  // componentDidMount = () => {

  //   this.socket.on("connect", () => {
  //     console.log("connected to socket")
  //   })
  //   this.socket.on("list", console.log)

  //   // this.socket.on("list", () => {
  //   //   "https://striveschool-api.herokuapp.com/messages/" + this.state.userName,
  //   //     connOpt
  //   // })
  //   // this.socket.on((msg) => {
  //   //   this.setState({ messages: this.state.messages.concat(msg) })
  //   // })
  // }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const submitMessage = (e) => {
    e.preventDefault()
    if (message !== "") {
      socket.emit("chatmessage", {
        userName,
        message,
      })
      setMessage("")
    }
  }

  return (
    <>
      {/* <div className="App">
          <ul id="messages">
            {messages.map((msg, i) => (
              <li
                key={i}
                className={msg.user === username ? "ownMessage" : "message"}
              >
                <strong>{msg.user}</strong> {msg.message}
              </li>
            ))}
          </ul>
          <form id="chat" onSubmit={sendMessage}>
            <input
              autoComplete="off"
              value={message}
              onChange={handleMessage}
            />
            <Button type="submit" className="rounded-0">
              Send
            </Button>
          </form>
        </div> */}
      {/* <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.showModal}
          onHide={this.toggleModal}
        >
          <Modal.Header>
            <Modal.Title>Set username</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
              // onChange={(e) => setUsername(e.currentTarget.value)}
              ></FormControl>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleModal}>Submit</Button>
          </Modal.Footer>
        </Modal> */}

      <form className="form" onSubmit={submitMessage}>
        <input autoComplete="off" value={message} onChange={handleChange} />
        <Button type="submit" className="rounded-0">
          Send
        </Button>
      </form>
    </>
  )
}

export default MyChat
