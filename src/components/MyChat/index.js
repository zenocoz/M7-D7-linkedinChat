import React, { Component } from "react"
// import { Chat, addResponseMessage } from "react-chat-popup"
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles.scss"
import io from "socket.io-client"
import { getLocalStorage } from "../../helpers/localStorage"
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap"

class MyChat extends Component {
  socket = null

  state = {
    message: "",
    messages: [],
    showModal: true,
    userName: getLocalStorage("user").username,
  }

  componentDidMount = () => {
    const connOpt = {
      transports: ["websocket", "polling"],
    }

    this.socket = io("https://striveschool-api.herokuapp.com", connOpt)

    this.socket.on("connect", () => {
      console.log("connected to socket")
    })
    this.socket.on("list", console.log)

    // this.socket.on("list", () => {
    //   "https://striveschool-api.herokuapp.com/messages/" + this.state.userName,
    //     connOpt
    // })
    // this.socket.on((msg) => {
    //   this.setState({ messages: this.state.messages.concat(msg) })
    // })
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value })
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  submitMessage = (e) => {
    e.preventDefault()
    if (this.state.messages !== "") {
      this.socket.emit("chatmessage", {
        userName: this.state.userName,
        message: this.state.message,
      })
      this.setState({ message: "" })
    }
  }

  render() {
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

        <form className="form" onSubmit={this.submitMessage}>
          <input
            autoComplete="off"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <Button type="submit" className="rounded-0">
            Send
          </Button>
        </form>
      </>
    )
  }
}

export default MyChat
