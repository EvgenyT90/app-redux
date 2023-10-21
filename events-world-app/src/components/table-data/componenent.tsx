import React from "react";
import { Container, Table } from "react-bootstrap";

export const TableData = ({ props }: { props: any }) => {
    let content: JSX.Element;

    content = (
        <div style={{ height: "77vh", overflowY: "auto" }}>
            <Table>
                <thead>
                    <tr>
                        <th>Время</th>
                        <th>Количество частиц pm10</th>
                        <th>Количество частиц pm2_5</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: props[0][0].length }).map(
                        (_, index) => (
                            <tr>
                                <td key={index}>{props[0][0][index]}</td>
                                <td key={index}>{props[1][0][index]}</td>
                                <td key={index}>{props[2][0][index]}</td>
                            </tr>
                        ),
                    )}
                </tbody>
            </Table>
        </div>
    );

    return (
        <Container className="shadow p-3 mb-5 bg-white rounded">
            {content}
        </Container>
    );
};
