import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Modals = (props: any) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {" "}
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Внимание</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Данные не удалось загрузить! Ошибка: {props.error}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Выход
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
