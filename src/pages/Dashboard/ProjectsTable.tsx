import { Card, Upload, Button, Radio, Typography, RadioChangeEvent, Progress, Tooltip, message } from "antd";
import { ToTopOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

const ProjectsTable = () => {
  const { Title } = Typography;

  const onChange = (e: RadioChangeEvent) => console.log(`radio checked:${e.target.value}`);

  const list = [
    {
      img: "images/logo-shopify.svg",
      Title: "Soft UI Shopify Version",
      bud: "$14,000",
      progress: <Progress percent={60} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={"images/team-1.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={"images/team-2.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={"images/team-3.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={"images/team-4.jpg"} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: "images/logo-atlassian.svg",
      Title: "Progress Track",
      bud: "$3,000",
      progress: <Progress percent={10} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={"images/team-1.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={"images/team-2.jpg"} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: "images/logo-slack.svg",
      Title: "Fix Platform Errors",
      bud: "Not Set",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={"images/team-1.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={"images/team-1.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={"images/team-3.jpg"} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: "images/logo-spotify.svg",
      Title: "Launch new Mobile App",
      bud: "$20,600",
      progress: <Progress percent={100} size="small" status="active" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={"images/team-1.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={"images/team-2.jpg"} alt="" />
          </Tooltip>
        </div>
      ),
    },
    {
      img: "images/logo-jira.svg",
      Title: "Add the New Landing Page",
      bud: "$4,000",
      progress: <Progress percent={80} size="small" />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={"images/team-1.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={"images/team-2.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Alexander Smith">
            <img className="tootip-img" src={"images/team-3.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Jessica Doe">
            <img className="tootip-img" src={"images/team-4.jpg"} alt="" />
          </Tooltip>
        </div>
      ),
    },

    {
      img: "images/logo-invision.svg",
      Title: "Redesign Online Store",
      bud: "$2,000",
      progress: <Progress percent={100} size="small" status="exception" format={() => "Cancel"} />,
      member: (
        <div className="avatar-group mt-2">
          <Tooltip placement="bottom" title="Ryan Tompson">
            <img className="tootip-img" src={"images/team-1.jpg"} alt="" />
          </Tooltip>
          <Tooltip placement="bottom" title="Romina Hadid">
            <img className="tootip-img" src={"images/team-2.jpg"} alt="" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Card bordered={false} className="criclebox cardbody h-full">
      <div className="project-ant">
        <div>
          <Title level={5}>Projects</Title>
          <Paragraph className="lastweek">
            done this month<span className="blue">40%</span>
          </Paragraph>
        </div>
        <div className="ant-filtertabs">
          <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
            <Radio.Group onChange={onChange} defaultValue="a">
              <Radio.Button value="a">ALL</Radio.Button>
              <Radio.Button value="b">ONLINE</Radio.Button>
              <Radio.Button value="c">STORES</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className="ant-list-box table-responsive">
        <table className="width-100">
          <thead>
            <tr>
              <th>COMPANIES</th>
              <th>MEMBERS</th>
              <th>BUDGET</th>
              <th>COMPLETION</th>
            </tr>
          </thead>
          <tbody>
            {list.map((d, index) => (
              <tr key={index}>
                <td>
                  <h6>
                    <img src={d.img} alt="" className="avatar-sm mr-10" /> {d.Title}
                  </h6>
                </td>
                <td>{d.member}</td>
                <td>
                  <span className="text-xs font-weight-bold">{d.bud} </span>
                </td>
                <td>
                  <div className="percent-progress">{d.progress}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="uploadfile shadow-none">
        <Upload {...uploadProps}>
          <Button type="dashed" className="ant-full-box" icon={<ToTopOutlined />}>
            <span className="click">Click to Upload</span>
          </Button>
        </Upload>
      </div>
    </Card>
  );
};

export default ProjectsTable;
