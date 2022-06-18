import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
//import config from './config';


const Login = () => {
  

  const onFinish = (values) => {


    axios.post("http://localhost:8080/auth/login/",values,).then(result=>{

    console.log(result.values);

    
 
  

    }).catch(err=>{
      console.log(err);
    })


   
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <Row style={{marginTop:"120px"}}>
    
    <Col span={12} offset={6}>
    <h1>Login Here</h1>

    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </Col>
  </Row>
    
 
);
  
}

export default Login