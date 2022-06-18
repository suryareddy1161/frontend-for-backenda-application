import React ,{useState}from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import { Alert } from 'antd';

import axios from 'axios';
//import config from './config';

const Signup = () => {
  const [success,setSuccess]=useState("");

  const onFinish = (values) => {
    axios.post("http://localhost:8080/auth/signup",values).then(result=>{
        
        if(result.data.message=="Successfully registered")
        {
          setSuccess("success");
        }
        else{
          setSuccess("failed");
        }
    
      //  }).catch(err=>{
        //  console.log(err);
        })
    
        
        console.log('Success:', values);
      };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <Row style={{marginTop:"120px"}}>
    
    <Col span={12} offset={6}>
      {
        success=="success"?    <Alert message="Signup Success" type="success" />:  "" 
        

      }
      {
        success=="failed"? <Alert message="Signup Failed" type="error" />:""

      }
    <h1>Signup Here</h1>

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
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input your Name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
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

export default Signup