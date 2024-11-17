import { useState } from "react";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const { Title } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      if (values.username === "admin" && values.password === "password") {
        localStorage.setItem("isAuthenticated", "true");
        message.success("Login successful!");
        navigate("/");
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>
          Welcome Back!
        </Title>
        <p className={styles.subtitle}>
          Please log in to your account to continue.
        </p>
        <Form
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{ username: "", password: "" }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter your username" size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className={styles.loginButton}
            size="large"
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
