import React from "react";
import { Navigation } from "../../components/navbar";
import { Container, Card } from "react-bootstrap";
import image from "../../images/168.jpg";

export const About: React.FC = () => {
    return (
        <>
            <Navigation></Navigation>
            <Container className="mt-3">
                <Card className="shadow" bg="primary">
                    <Card.Img variant="top" height={"100px"} src={image} />
                    <Card.ImgOverlay>
                        <Card.Header
                            className="p-0 text-center"
                            style={{ height: "82px" }}
                        >
                            <div
                                className="fw-light pt-3 mb-2"
                                style={{ color: "#fff" }}
                            ></div>
                        </Card.Header>
                    </Card.ImgOverlay>
                    <Card.Body className="text-left">
                        <div className="p-3">
                            Веб-сервис для получения информации по частицам
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};
