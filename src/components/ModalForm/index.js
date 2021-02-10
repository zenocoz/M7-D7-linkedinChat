import React from "react"
import { Modal, Form } from "react-bootstrap"
import "./styles.scss"
import { editCurrentUser } from "../../api/profile"
import { Container, Row, Col } from "react-bootstrap"
class ModalForm extends React.Component {
  state = {
    info: this.props.myProfile,
  }

  handleChange = (e) => {
    this.setState({
      info: {
        ...this.state.info,
        [e.target.id]: e.target.value,
      },
    })
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.changeInfo();
  // };

  changeInfo = async (e) => {
    e.preventDefault()
    const { name, surname, email, username, bio, title, area } = this.state.info

    const data = {
      name,
      surname,
      email,
      username,
      bio,
      title,
      area,
    }
    const response = await editCurrentUser(data)
    if (response.data) {
      this.props.submitCounter()
      this.props.hide()
    } else {
      const error = response
      console.log(error)
    }
  }

  render() {
    return (
      <>
        <Modal
          className="edit-profile-modal"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.show}
          onHide={() => this.props.hide()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Intro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-5">
              <Col md={12} className="images-container mb-5">
                <img
                  className="header-img"
                  src="https://coverfiles.alphacoders.com/372/37275.jpg"
                />
                <img
                  className="profile-img-modal"
                  src={this.state.info.image}
                />
              </Col>
            </Row>
            <div className="mb-5">
              <Container>
                <Form onSubmit={this.changeInfo}>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label htmlFor="name">First Name</Form.Label>
                        <Form.Control
                          id="name"
                          name="name"
                          placeholder="First name"
                          value={this.state.info.name}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label htmlFor="surname">Last Name</Form.Label>
                        <Form.Control
                          id="surname"
                          name="surname"
                          placeholder="Last name"
                          value={this.state.info.surname}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="form-disabled-info mt-5">
                    <h4>+ Record name pronunciation</h4>
                    <p>
                      Name pronunciation can only be added using our mobile app.
                    </p>
                  </div>

                  <Form.Group>
                    <Form.Label>Headline</Form.Label>
                    <Form.Control
                      id="title"
                      as="textarea"
                      value={this.state.info.title}
                      rows={2}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Country/Region</Form.Label>
                    <Form.Control
                      id="area"
                      placeholder="Area"
                      value={this.state.info.area}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Contact Info</Form.Label>
                    <Form.Control
                      id="email"
                      placeholder="Contact Info"
                      value={this.state.info.email}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </Form.Group>
                  <div className="submit-button float-right mr-3 ">
                    <button className="profile-save-btn" type="submit">
                      Save{" "}
                    </button>
                  </div>
                </Form>
              </Container>
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default ModalForm
