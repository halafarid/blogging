import React from 'react';

import { Modal, Button, Form, Row, Col, Badge} from 'react-bootstrap';

import { AiOutlineVideoCamera, AiOutlineClose } from 'react-icons/ai';
import { IoMdPaperPlane } from 'react-icons/io';
import { BsPlusCircle } from 'react-icons/bs';
import { FiCamera } from 'react-icons/fi';

const BlogModal = props => {
    const { isShow, isValid, blog, handleModal, handleBlog, handleChange, handleAddTag, handleDeleteTag } = props;

    return ( 
        <React.Fragment>
            <Modal
                size="lg"
                show={isShow}
                onHide={() => handleModal(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Blog</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="modalTitle">
                            <Form.Label column sm="2" className="card__subtitle">Blog Title</Form.Label>
                            <Col sm="9">
                                <Form.Control placeholder="Enter title" autoComplete="off" name="title" value={blog.title} onChange={handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2" className="card__subtitle">Blog Tags</Form.Label>
                            <Col sm="8">
                                <Form.Control placeholder="Enter tag" autoComplete="off" name="tags" value={blog.tag} onKeyUp={handleChange} onChange={handleChange} />
                            </Col>
                            <Col sm="1" className="modal__icon modal__icon-add">
                                <BsPlusCircle onClick={handleAddTag} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="modalBody" as={Row}>
                            <Col sm="9">
                                <Form.Control as="textarea" rows="3" placeholder="What do you want to talk about?" name="body" value={blog.body} onChange={handleChange} />
                            </Col>
                            <Col sm="2" className="modal__tags">
                                <ol>
                                    {blog.tags?.map( (tag, i) => (
                                        <Badge key={i} pill variant="secondary" className="post__tag" data-id={i} onClick={handleDeleteTag}>
                                            {tag}
                                            <AiOutlineClose />
                                        </Badge>
                                    ))}
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
                    <Button className="btn btn--primary text--upper" onClick={() => handleBlog(blog)} disabled={!isValid}>Save</Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    );
}
 
export default BlogModal;
