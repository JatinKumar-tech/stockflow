import React from "react";
import { Card, Typography, Button } from "antd";
import { QuestionCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 text-gray-900">
      <Card className="max-w-4xl mx-auto rounded-2xl shadow-lg p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <QuestionCircleOutlined className="text-2xl text-indigo-600" />
            <Title level={2} className="!mb-0 text-indigo-800">Help & Support</Title>
          </div>
          <Button
            icon={<ArrowLeftOutlined />}
            type="primary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Profile
          </Button>
        </div>

        <Paragraph className="text-lg text-gray-700 mb-4">
          We're here to help! Below are answers to some common questions. If you need further support, feel free to reach out through the <a href="/contact" className="text-indigo-600 underline">Contact</a> page.
        </Paragraph>

        <div className="space-y-6">
          <div>
            <Title level={4} className="text-purple-700">💻 How do I manage my portfolio?</Title>
            <Paragraph>You can view your holdings, watchlist, and trade from the dashboard. Use the “Buy” or “Sell” options in the watchlist or navigate to “Holdings” for more detailed info.</Paragraph>
          </div>

          <div>
            <Title level={4} className="text-purple-700">🔐 Is my data secure?</Title>
            <Paragraph>Yes, your data is securely stored in local storage. However, always make sure you log out on shared devices.</Paragraph>
          </div>

          <div>
            <Title level={4} className="text-purple-700">🛠️ What should I do if I find a bug?</Title>
            <Paragraph>If something isn’t working right, visit the <a href="/contact" className="text-indigo-600 underline">Contact</a> page and describe the issue. We'll get back to you shortly!</Paragraph>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Help;
