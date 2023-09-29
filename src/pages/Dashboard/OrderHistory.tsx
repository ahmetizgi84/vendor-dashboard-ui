import { useState } from "react";
import { Card, Typography, Button, Timeline } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

const OrderHistory = () => {
  const { Title, Text } = Typography;
  const [reverse, setReverse] = useState(false);

  const timelineList = [
    {
      title: "$2,400 - Redesign store",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "New order #3654323",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Company server payments",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "New card added for order #4826321",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Unlock folders for development",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "New order #46282344",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  return (
    <Card bordered={false} className="criclebox h-full">
      <div className="timeline-box">
        <Title level={5}>Orders History</Title>
        <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
          this month <span className="bnb2">20%</span>
        </Paragraph>

        <Timeline pending="Recording..." className="timelinelist" reverse={reverse}>
          {timelineList.map((t, index) => (
            <Timeline.Item color={t.color} key={index}>
              <Title level={5}>{t.title}</Title>
              <Text>{t.time}</Text>
            </Timeline.Item>
          ))}
        </Timeline>
        <Button type="primary" className="width-100" onClick={() => setReverse(!reverse)}>
          {<MenuUnfoldOutlined />} REVERSE
        </Button>
      </div>
    </Card>
  );
};

export default OrderHistory;
