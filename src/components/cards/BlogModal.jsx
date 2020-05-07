import React, { Component } from 'react';

import { Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { FiCamera } from 'react-icons/fi';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { IoMdPaperPlane } from 'react-icons/io';
import { BsPlusCircle } from 'react-icons/bs';


class BlogModal extends Component {
    state = { 
        blog: {
            title: '',
            body: '',
            tag: '',
            tags: []
        },
        isValid: false
    }

    handleChange = ({ target }) => {
        const blog = { ...this.state.blog };
        let { tag, isValid } = this.state;

        if (Array.isArray(blog[target.name])) {
            blog['tag'] = target.value;
            tag = target.value;
        } 
        else {
            blog[target.name] = target.value;
        }

        if (blog.title === '' || blog.body === '')
            isValid = false;
        else 
            isValid = true;
    
        this.setState({ blog, tag, isValid });
    }

    handleAddTag = () => {
        const blog = { ...this.state.blog };
        if (blog.tag !== '')
            blog['tags'].push(blog.tag);

        blog.tag = '';
        this.setState({ blog });
    }

    handleDeleteTag = ({ target }) => {
        const blog = {...this.state.blog };
        const id = target.dataset.id;
        blog.tags.splice(id, 1);
        console.log(blog);
        this.setState({ blog });
    }

    render() { 
        const { blog, isValid } = this.state;
        const { isShow, handleModal } = this.props;

        return ( 
            <React.Fragment>
                <Modal
                    size="lg"
                    show={isShow}
                    onHide={() => handleModal(false)}
                    // aria-labelledby="example-modal-sizes-title-lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Create a Blog</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="modalTitle">
                                <Form.Label column sm="2" className="card__subtitle">Blog Title</Form.Label>
                                <Col sm="9">
                                    <Form.Control placeholder="Enter title" autoComplete="off" name="title" value={blog.title} onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2" className="card__subtitle">Blog Tags</Form.Label>
                                <Col sm="8">
                                    <Form.Control placeholder="Enter tag" autoComplete="off" name="tags" value={blog.tag} onChange={this.handleChange} />
                                </Col>
                                <Col sm="1" className="modal__icon modal__icon-add">
                                    <BsPlusCircle onClick={this.handleAddTag} />
                                </Col>
                            </Form.Group>

                            <Form.Group controlId="modalBody" as={Row}>
                                <Col sm="9">
                                    <Form.Control as="textarea" rows="3" placeholder="What do you want to talk about?" name="body" value={blog.body} onChange={this.handleChange} />
                                </Col>
                                <Col sm="2" className="modal__tags">
                                    <ol>
                                        {blog.tags.map( (tag, i) => <li key={i} data-id={i} onClick={this.handleDeleteTag}>{tag}</li>)}
                                    </ol>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <div>
                            <span className="modal__icon modal__icon-connection"> <FiCamera /> </span>
                            <span className="modal__icon modal__icon-connection"> <AiOutlineVideoCamera /> </span>
                            <span className="modal__icon modal__icon-connection"> <IoMdPaperPlane /> </span>
                        </div>
                        <Button className="btn btn--primary text--upper" onClick={() => this.props.createBlog(blog)} disabled={!isValid}>Post</Button>
                    </Modal.Footer>
                </Modal>

            </React.Fragment>
         );
    }
}
 
export default BlogModal;
