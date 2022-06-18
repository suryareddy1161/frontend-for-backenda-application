import {  Space, Table, Tag ,Input} from 'antd';
import React,{useEffect,useState} from 'react';
import { Col, Row } from 'antd';
import { Button, Modal } from 'antd';

import axios from 'axios';
//import config from './config';



const Home = () => {
  const [data,setData]=useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [pageNumber,setpageNumber]=useState(0);
  const [limit,setLimit]=useState(2);
  const [recordsPerPage,setrecordsPerPage]=useState(2)
  const [totalcount,setTotalcount]=useState(0);



 
  const [editData,setEditData]=useState({
    name:"",
    email:"",
    _id:""

  })

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {

    // Making an axios call

    const headers = {
    
      'token': localStorage.getItem("token")
    }

    axios.put(`${config.URL}user/edit`,editData,{
      headers: headers
    }).then(response=>{
      setIsModalVisible(false);  // will hide the model

   

    }).catch(err=>{
      console.log(err);
    })
  
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const EditData=(data)=>{

    setEditData({
      name:data.name,
      email:data.email,
      _id:data._id
    })
    showModal();

  }

  const handleEditChange=(event)=>{
    setEditData({...editData,[event.target.name]:event.target.value});


   
  }

  const DeleteData=(id)=>{

    const headers = {
  
      'token': localStorage.getItem("token")
    }

    axios.delete(`${config.URL}user/delete/${id}`,{
      headers: headers
    }).then(response=>{
      setIsModalVisible2(!isModalVisible2);  // will hide the model

   

    }).catch(err=>{
      console.log(err);
    })

  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'age',
    },
  
  
    {
      title: 'Action',
      key: '_id',
      render: (row, record) => (
        <Space size="middle">
          
         <Button type='primary' onClick={()=>EditData(row)}>Edit </Button>
        </Space>
      ),
    },

    {
      title: 'Action',
      key: '_id',
      render: (row, record) => (
        <Space size="middle">
          
         <Button type='primary' onClick={()=>DeleteData(row._id)}>Delete </Button>
        </Space>
      ),
    },
  ];
  

const apiData=(pageNumber,limit,recordsPerPage)=>{
  const headers = {
    
    'token': localStorage.getItem("token")
  }

  axios.get(`http://localhost:8080/user/?pageNumber=${pageNumber}&limit=${limit}&recordsPerPage=${recordsPerPage}`,{
    headers: headers
  }).then(response=>{

  if(response["data"].data){
    setData(response["data"].data)
    setTotalcount(response["data"].totalcount)

  }

  }).catch(err=>{
    console.log(err);
  })
}


  useEffect(()=>{


    apiData(pageNumber,limit,recordsPerPage)
   
},[isModalVisible,isModalVisible2,pageNumber])

const ChangePage=(data)=>{

  debugger;


  setpageNumber(data.current-1)



}
  return(
    <Row style={{marginTop:"120px"}}>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p><Input placeholder="Name" name='name' value={editData.name}  onChange={handleEditChange} /></p>
        <p><Input placeholder="Email"   name='email' value={editData.email} onChange={handleEditChange} /></p>
      
      </Modal>
    
    <Col span={12} offset={6}>
      <h1>User Details</h1>
    <Table columns={columns} dataSource={data}  
    
    onChange={ChangePage}
    showSorterTooltip={true}	
    
    
    pagination={{ defaultPageSize: 2,  total:totalcount  ,showSizeChanger: true, pageSizeOptions: ['10', '20', '30']} }/>
    </Col>
  </Row>

  )
}



export default Home;