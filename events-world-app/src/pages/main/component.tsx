import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ChartMy, TableData, Navigation } from "../../components/";
import { Alert, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useGetCoorQuery } from "../../services/api-weather";
import { useGetQualityQuery } from "../../services/apiAirQuality";

interface ChartData {
    date: any;
    pm10: any;
    pm10Avg: any;
    pm2_5: any;
    pm2_5Avg: any;
    countRow: any;
}

export const Main: React.FC = () => {
    const [spinner, setSpinner] = useState(false);
    const [loc, setLoc] = useState("Omsk");
    const [coordinates, setCoordinates] = useState<any>([]);

    const [tableData, setTableData] = useState<any>([["1"], ["2"], ["3"]]);
    const [skip, setSkip] = useState(true);
    const [skip2, setSkip2] = useState(true);
    const {
        data: Coor,

        isSuccess: CoorSucess,
    } = useGetCoorQuery(loc, { skip });
    const {
        data: Quality,

        isSuccess: QualitySuccess,
    } = useGetQualityQuery(coordinates, { skip });

    const { i18n } = useTranslation();
    const [chartData, setChartData] = useState<ChartData[]>([
        {
            date: new Date(),
            pm10: 1,
            pm10Avg: 2,
            pm2_5: 3,
            pm2_5Avg: 4,
            countRow: 5,
        },
    ]);

    const locChange = (event: any) => {
        setLoc(event.target.value);
    };

    //  const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${loc}&format=json`;

    const getAvgValue = (data: any) => {
        let newArr = [];
        let firstRowValue = data[0][0][0].split("T")[0];
        var tempPm10 = 0;
        var tempPm2_5 = 0;
        var count = 0;

        for (let index = 0; index < data[0][0].length; index++) {
            let oneDate: ChartData = {
                date: new Date(),
                pm10: 0,
                pm10Avg: 0,
                pm2_5: 0,
                pm2_5Avg: 0,
                countRow: 0,
            };

            if (firstRowValue === data[0][0][index].split("T")[0]) {
                if (data[1][0][index] !== null) {
                    tempPm10 = +data[1][0][index];
                }

                if (data[2][0][index] !== null) {
                    tempPm2_5 = +data[2][0][index];
                }

                count++;
            } else {
                oneDate = {
                    date: new Date(firstRowValue),
                    pm10: tempPm10,
                    pm10Avg: tempPm10 / count,
                    pm2_5: tempPm2_5,
                    pm2_5Avg: tempPm2_5 / count,
                    countRow: count,
                };
                newArr.push(oneDate);
                firstRowValue = data[0][0][index].split("T")[0];
                tempPm10 = data[1][0][index];
                tempPm2_5 = data[2][0][index];
                count = 1;
            }

            if (index == data[0][0].length - 1) {
                oneDate = {
                    date: new Date(firstRowValue),
                    pm10: tempPm10,
                    pm10Avg: tempPm10 / count,
                    pm2_5: tempPm2_5,
                    pm2_5Avg: tempPm2_5 / count,
                    countRow: count,
                };
                newArr.push(oneDate);
            }
        }
        return newArr;
    };

    useEffect(() => {}, [loc]);

    const getWeather = (event: any) => {
        setSpinner(true);

        if (CoorSucess && Coor) {
            let pos =
                Coor.response.GeoObjectCollection.featureMember[0].GeoObject
                    .Point.pos;
            setCoordinates(pos.split(" "));
            console.log(coordinates);
            setSkip2(false);
            if (QualitySuccess && Quality) {
                let arr = [
                    [Quality.hourly.time],
                    [Quality.hourly.pm10],
                    [Quality.hourly.pm2_5],
                ];

                setTableData(arr);
                setChartData(getAvgValue(arr));
                setSpinner(false);
                setSkip2(true);
                setSkip(true);
            }
            // const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`;
            // fetch(API_OPEN_METEO)
            //     .then((resp) => resp.json())
            //     .then(function (data) {
            //         console.log("here");
            //         let arr = [
            //             [data.hourly.time],
            //             [data.hourly.pm10],
            //             [data.hourly.pm2_5],
            //         ];

            //         setTableData(arr);
            //         setChartData(getAvgValue(arr));
            //         setSpinner(false);
            //         setSkip(true);
            //     });
        }

        // })
        // .then(() => {
        //     setSpinner(false);
        // })

        // fetch(API_URL_GEO_DATA)
        //     .then((resp) => resp.json())
        //     .then(function (data) {
        //         let pos =
        //             data.response.GeoObjectCollection.featureMember[0].GeoObject
        //                 .Point.pos;
        //         let coordinates = pos.split(" ");

        // if (data) {
        //     const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`;
        //     fetch(API_OPEN_METEO)
        //         .then((resp) => resp.json())
        //         .then(function (data) {
        //             let arr = [
        //                 [data.hourly.time],
        //                 [data.hourly.pm10],
        //                 [data.hourly.pm2_5],
        //             ];

        //             setTableData(arr);
        //             setChartData(getAvgValue(arr));
        //         });
        // }
        // })
        // .then(() => {
        //     setSpinner(false);
        // })
        // .catch((error) => {});
        //}
    };

    return (
        <main>
            {/* {isLoading && "Загрузка......."}
            {isError && error.message}
            {isSuccess &&
                data &&
                data.map((user: any) => <h2 key={user.id}>{user.name}</h2>)} */}
            <Navigation></Navigation>
            <Container className="mt-3 myC">
                <InputGroup className="mb-3">
                    <Button
                        variant="outline-secondary"
                        id="button-addon1"
                        onClick={(event) => {
                            setSkip(false);
                            getWeather(event);
                        }}
                    >
                        {i18n.t("loadData")}
                    </Button>
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        onChange={(event) => locChange(event)}
                        placeholder="Введите наименование города и нажмите кнопку"
                    />
                </InputGroup>
            </Container>
            <Container>
                <Row>
                    <Col sm={4}>
                        {spinner && (
                            <Space
                                direction="vertical"
                                style={{ width: "100%" }}
                            >
                                <Spin tip="Загрузка" size="large">
                                    <div
                                        className="content"
                                        style={{ padding: "200px" }}
                                    />
                                </Spin>
                            </Space>
                        )}
                        {!spinner && <TableData props={tableData} />}
                    </Col>

                    <Col sm={8}>
                        {spinner && (
                            <Space
                                direction="vertical"
                                style={{ width: "100%" }}
                            >
                                <Spin tip="Загрузка" size="large">
                                    <div
                                        className="content"
                                        style={{ padding: "200px" }}
                                    />
                                </Spin>
                            </Space>
                        )}
                        {!spinner && <ChartMy props={chartData} />}
                    </Col>
                </Row>
            </Container>
        </main>
    );
};
