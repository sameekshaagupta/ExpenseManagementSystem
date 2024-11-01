import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { DatePicker, Form, message, Modal, Select, Table } from 'antd'
import Input from 'antd/es/input/Input'
import axios from 'axios'
import { HashLoader } from 'react-spinners'
import moment from 'moment'
const {RangePicker} = DatePicker;
const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading,setLoading] = useState(false)
  const [allTransaction, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const columns = [
    {
      title:'Date',
      dataIndex: 'date',
      render: (text)=><span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title:'Amount',
      dataIndex: 'amount',
    },
    {
      title:'Category',
      dataIndex: 'category',
    },
    {
      title:'Reference',
      dataIndex: 'reference',
    },
    {
      title:'Actions',
    },
  ]

  
  useEffect(()=>{
    const getAllTransaction = async ()=>{
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post('/transactions/get-transactions', {
          userid: user._id,
          frequency,
          selectedDate,
          type
        })
        setLoading(false);
        setAllTransaction(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error("Issue with transaction")
      }
    }
    getAllTransaction();

  },[frequency, selectedDate, type])
  const handleSubmit= async (values)=>{
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      await axios.post('/transactions/add-transactions',  {...values, userid:user._id})
      setLoading(false)
      message.success("Transaction Added")
      setShowModal(false)
    } catch (error) {
      setLoading(false)
      message.error("Failed to add transaction")
    }
  }
  return (
    <Layout>
      {loading && <HashLoader/>}
        <div className="filters">
          <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(values)=>setFrequency(values)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values)=>{
              setSelectedDate(values)
            }}/>}
          </div>
          <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={(values)=>setType(values)}>
              <Select.Option value='all'>All Type</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
            {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values)=>{
              setSelectedDate(values)
            }}/>}
          </div>
          <div>
            <button className='buttonn nav-link active' onClick={()=>setShowModal(true)}>Add New</button>
          </div>
        </div>
        <div className='content'>
          <Table columns={columns} dataSource={allTransaction}/>
        </div>
        <Modal title="Add Transaction" 
        open={showModal} 
        onCancel={()=>setShowModal(false)}
        footer={false}
        >
          <Form layout='vertical' onFinish={handleSubmit}>
            <Form.Item label='Amount' name='amount' >
              <Input type='text'/>
            </Form.Item>
            <Form.Item label='Type' name='type'>
              <Select>
                <Select.Option value='income'>Income</Select.Option>
                <Select.Option value='expense'>Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Category' name='category'>
              <Select>
                <Select.Option value='salary'>Salary</Select.Option>
                <Select.Option value='tip'>Tip</Select.Option>
                <Select.Option value='food'>Food</Select.Option>
                <Select.Option value='movie'>Movie</Select.Option>
                <Select.Option value='bills'>Bills</Select.Option>
                <Select.Option value='rent'>Rent</Select.Option>
                <Select.Option value='medical'>Medical</Select.Option>
                <Select.Option value='fee'>Fees</Select.Option>
                <Select.Option value='other'>Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Date' name='date' >
              <Input type='date'/>
            </Form.Item>
            <Form.Item label='Reference' name='reference' >
              <Input type='text'/>
            </Form.Item>
            <Form.Item label='Description' name='description' >
              <Input type='text'/>
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <button className='buttonn nav-link active' type='submit'>{" "}Save</button>
            </div>
          </Form>
        </Modal>
    </Layout>
  )
}

export default HomePage