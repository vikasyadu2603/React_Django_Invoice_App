import {  DeleteOutlined, EditOutlined, } from '@ant-design/icons';
import { Button, Input, Space, Table, message, Popconfirm, Form, Row,Select, Col, Modal, Card } from 'antd';
import { useState, useEffect } from 'react';
import { InvoiceDeleteData, GetInvoice, Empregister, updateInvoice,GetInvoiceByName } from '../api/Services'

const InvoiceTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [Invoice, setInvoice] = useState([])
  const [form] = Form.useForm();
  const { Option } = Select;

  
  const showModal = (id) => {

    setIsModalOpen(true);
    const filterData = Invoice.find(item => item.id == id)
    form.setFieldsValue({
      customer_name: filterData.customer_name,
      product_name: filterData.product_name,
      product_price: filterData.product_price,
    })

  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Bill Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'age',

    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',

    },
    {
      title: 'Product Price',
      dataIndex: 'product_price',
      key: 'product_price',

    },
    {
      dataIndex: 'id',
      title: 'Action',
      key: 'id',
      render: (_, record) => (

        <Space size="middle">

          <Popconfirm title="Sure to delete?" onConfirm={() => InvoiceDelete(record.id)}>

            <Button style={{ backgroundColor: "red", color: "white" }}>   <DeleteOutlined /> </Button>
          </Popconfirm>
          <Button type='primary' onClick={() => showModal(record.id)}><EditOutlined /> </Button>
        </Space>

      )

    },
  ];

  useEffect(() => {
    getInvoice()
  },[]);
  const getInvoice = async () => {
    const response = await GetInvoice()
    setInvoice(response)
  }
 
  const InvoiceDelete = async (id) => {
    const response = await InvoiceDeleteData(id)
    console.log(response)
    try {
      if (response) {
        let msg = 'data delete'
        message.info(msg)
      }
      else {
        message.error('not delete')
      }
    }
    catch (err) {
      message.error('not delete')
      return []
    }
    getInvoice()
  }
  const saveData = async (values) => {
  

    const reg_data = {
      customer_name: values.customer_name,
      product_name: values.product_name,
      product_price: values.product_price,
    }
    const response = await Empregister(reg_data)
    try {
      if (response) {
        let msg = 'Register got Success'
        message.info(msg)

      }
      else {
        message.error('Register is not successfull')

      }
    }
    catch (err) {
      message.error('Register is not successfull')
      return []
    }
    getInvoice()

  };

  const updateData = async (values) => {
    console.log('Success:', values);

    const reg_data = {
      customer_name: values.customer_name,
      product_name: values.product_name,
      product_price: values.product_price,
    }
    const response = await updateInvoice(reg_data)
    try {
      if (response) {
        let msg = 'Update got Success'
        message.info(msg)

      }
      else {
        message.error('Update is not successfull')

      }
    }
    catch (err) {
      message.error('Update is not successfull')
      return []
    }
    getInvoice()

  };

  const getInvoiceByName = async (values) => {
    const productdata = {
      customer_name: values
    }
    const product = await GetInvoiceByName(productdata)
    if (product) {
      console.log(Invoice)
        setInvoice(product)
        console.log(Invoice)
    }
}

  return (
    <>
      <Modal title="Update Invoice Data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Row>

          <Form
            onFinish={updateData}
            form={form}
          >
            <Col >
              <Form.Item
                label="Cutomer Name"
                name="customer_name"
                rules={[{ required: true, message: 'Please input your cumtomer name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Product Name"
                name="product_name"
                rules={[{ required: true, message: 'Please input your product name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="Product Price"
                name="product_price"
                rules={[{ required: true, message: 'Please input your product price!' }]}
              >
                <Input />
              </Form.Item>

            </Col>
            <Col>
              <Form.Item>
                <Button type='primary' htmlType='submit' style={{ marginLeft: "100px" }}>Submit</Button>
              </Form.Item>

            </Col>
          </Form>
        </Row>
      </Modal>
      <Row style={{ marginTop: "50px" }}>

        <Col style={{ marginLeft: "60px" }}>
          <Card>
            <h2 style={{ textAlign: "center" }}>Create new Data</h2>
            <Row>

              <Form
                onFinish={saveData}
              >
                <Col >
                  <Form.Item
                    label="Cutomer Name"
                    name="customer_name"
                    rules={[{ required: true, message: 'Please input your cumtomer name!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Product Name"
                    name="product_name"
                    rules={[{ required: true, message: 'Please input your product name!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Product Price"
                    name="product_price"
                    rules={[{ required: true, message: 'Please input your product price!' }]}
                  >
                    <Input />
                  </Form.Item>

                </Col>
                <Col>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' style={{ marginLeft: "100px" }}>Submit</Button>
                  </Form.Item>

                </Col>
              </Form>
            </Row>
          </Card>

        </Col>

        <Col style={{ marginLeft: "60px" }}>
          <Card>
          <h2 style={{ textAlign: "center" }}>All Invoice Data</h2>
            <label >Filter By Cumtomer Name:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <Select
              showSearch
              style={{
                width: 150,
              }}
              onChange={getInvoiceByName}
              placeholder="Search to Select"
              optionFilterProp="children"
            >
              {Invoice.map((items) => (
                <Option value={items.customer_name}>{items.customer_name}</Option>
              ))}
            </Select>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={getInvoice()} type="primary">Reset</Button>
           <br/>  <br/>
            <Table columns={columns} dataSource={Invoice} style={{ width: 750, marginLeft: "auto", marginRight: "auto" }} />
          </Card>
        </Col>


      </Row>
    </>

  )
};
export default InvoiceTable;
