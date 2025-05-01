import React from "react";
import { Card, Typography, Button } from "antd";
import { MailOutlined, PhoneOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 text-gray-900">
      <Card className="max-w-3xl mx-auto rounded-2xl shadow-lg p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <Title level={2} className="text-fuchsia-700 m-0">📞 Contact Us</Title>
          <Button
            icon={<ArrowLeftOutlined />}
            type="primary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Profile
          </Button>
        </div>

        <Paragraph className="text-lg text-gray-700 mb-6">
          If you have any questions, feedback, or issues, please don’t hesitate to reach out.
        </Paragraph>

        <div className="space-y-4 text-gray-800">
          <div className="flex items-center gap-3">
            <MailOutlined className="text-xl text-indigo-600" />
            <span><strong>Email:</strong> sstockflow@gmail.com</span>
          </div>

          <div className="flex items-center gap-3">
            <PhoneOutlined className="text-xl text-teal-600" />
            <span><strong>Phone:</strong> +91-9877753221</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactUs;
