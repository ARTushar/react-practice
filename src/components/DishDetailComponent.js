import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';


function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>
                    {dish.name}
                </CardTitle>
                <CardText>
                    {dish.description}
                </CardText>
            </CardBody>
        </Card>
    );
}

function formatDate(dateStr) {
    let date = new Date(dateStr)
    let options = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString("en-US", options)
}

function RenderComments({ comments, addComment, dishId}) {
    if (comments != null) {
        const comment = comments.map((comment) => {
            // let date = this.formatDate(comment.date);
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            );
        });
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comment}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        );
    } else {
        return <div></div>
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
                    </div>
                </div>
            </div>

        );
    } else {
        return <div></div>
    }
}

const required = (val) => val && val.length
const minLength = (len) => (val) => !val || val.length >= len
const maxLength = (len) => (val) => !val || val.length <= len

class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(values) {
        this.toggleModal();
        console.log('hola')
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleLogin(values)} >
                            <Row className="form-group">
                                <Label md={12} htmlFor="rating">Rating</Label>
                                <Col>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control " defaultValue="1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="author">Your Name</Label>
                                <Col>
                                    <Control.text model=".author" id="author" name="author" className="form-control"
                                        validators={{
                                            required, minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="comment">Comment</Label>
                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
            </React.Fragment>
        );
    }
}

export default DishDetail;