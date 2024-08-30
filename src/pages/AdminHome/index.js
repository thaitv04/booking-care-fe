import React, { useEffect, useState } from "react";
import { Pie, Column } from "@ant-design/plots";
import { format } from "fecha";
import { Card, Col, Row, Space, Statistic } from "antd";
import { getAllBookings } from "../../services/BookingServices";
import { getAllUsers } from "../../services/UserServices";
import { getAllMajors } from "../../services/MajorServices";

export default function AdminHome() {
  const [dataDoctor, setDataDoctor] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [dataBooking, setDataBooking] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllUsers({});
      if (Array.isArray(result.data)) {
        setDataDoctor(result.data);
      } else {
        setDataDoctor([]);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllMajors({});
      if (Array.isArray(result.data)) {
        setDataMajor(result.data);
      } else {
        setDataMajor([]);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllBookings({});
      if (Array.isArray(result.data)) {
        setDataBooking(result.data);
        console.log(result.data)
      } else {
        setDataBooking([]);
      }
    };
    fetchApi();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };  

const sortedDataBooking = [...dataBooking].sort((a, b) => 
  new Date(formatDate(a.createdDate)) - new Date(formatDate(b.createdDate))
);

// Tạo đối tượng để đếm số lượng booking theo ngày và trạng thái
const countByDateAndStatus = sortedDataBooking.reduce((acc, booking) => {
  const { createdDate, status } = booking;
  const formattedDate = formatDate(createdDate);

  if (!acc[formattedDate]) {
      acc[formattedDate] = {};
  }
  if (acc[formattedDate][status]) {
      acc[formattedDate][status] += 1;
  } else {
      acc[formattedDate][status] = 1;
  }
  return acc;
}, {});

const dataDateBooking = Object.keys(countByDateAndStatus).map(date => ({
  date,
  close: Object.values(countByDateAndStatus[date]).reduce((sum, count) => sum + count, 0)
}));

console.log(dataDateBooking)

  // Tạo đối tượng để đếm số lượng booking cho từng trạng thái
  const countByStatus = dataBooking.reduce((acc, booking) => {
    const status = booking.status;
    if (acc[status]) {
      acc[status] += 1;
    } else {
      acc[status] = 1;
    }
    return acc;
  }, {});

  const dataStatus = Object.keys(countByStatus).map((status) => ({
    type: status,
    value: countByStatus[status],
  }));

  console.log(dataStatus)

  // Tạo đối tượng để đếm số lượng booking cho từng khung giờ
  const countByTime = dataBooking.reduce((acc, booking) => {
    const time = booking.timeBooking;
    if (acc[time]) {
      acc[time] += 1;
    } else {
      acc[time] = 1;
    }
    return acc;
  }, {});

  const dataTime = Object.keys(countByTime).map((time) => ({
    type: time,
    value: countByTime[time],
  }));

  console.log(dataTime)

  const config = {
    data: dataDateBooking,
    xField: 'date',
    yField: 'close',
    xAxis: {
      label: {
        formatter: (value) => {
          return format(new Date(value), 'DD/MM/YY');
        },
      },
      title: true,
    },
    yAxis: {
      title: false,
    },
    slider: { x: true },
  };

  console.log(config)

  const config2 = {
    data: dataStatus,
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 3,
      },
    },
    scale: {
      color: {
        palette: ['#FF6600', '#FFFF00', '#2F9A00', '#1677FF', '#660066', '#CD0000'],
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };

  const config3 = {
    data: dataTime,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    scale: {
      color: {
        palette: ['#660066', '#9A0066', '#CD0000', '#FF3000', '#FF6600', '#FF9A00', '#FFFF00', '#66CD00', '#2F9A00', '#006666', '#1677FF', '#00309A', '#000066'],
        offset: (t) => t * 0.8 + 0.1,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Tâm Anh\nHospital",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Row gutter={[60, 60]}>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="Bác sĩ" value={dataDoctor.length} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="Chuyên khoa" value={dataMajor.length} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="Lịch khám" value={dataBooking.length} />
            </Card>
          </Col>

          <Col span={12}>
            <h1 style={{textAlign: "center", marginBottom: "10px"}}>Số lượng lịch khám</h1>
            <Column {...config} />
          </Col>

          <Col span={12}>
            <h1 style={{textAlign: "center",  marginBottom: "10px"}}>Tỷ lệ trạng thái lịch khám</h1>
            <Pie {...config2} />
          </Col>

          <Col span={12}>
            <h1 style={{textAlign: "center",  marginBottom: "10px"}}>Tỷ lệ lịch khám theo khung giờ</h1>
            <Pie {...config3} />
          </Col>
        </Row>
      </Space>
    </>
  );
}
