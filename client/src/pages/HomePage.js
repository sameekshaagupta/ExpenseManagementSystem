import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { DatePicker, Form, message, Modal, Select, Table } from 'antd'
import Input from 'antd/es/input/Input'
import axios from 'axios'
import { HashLoader } from 'react-spinners'
import moment from 'moment'
import {UnorderedListOutlined,AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Analytics from '../components/Analytics'
const {RangePicker} = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading,setLoading] = useState(false)
  const [allTransaction, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setviewData] = useState('table')
  const [editable, setEditable] = useState(null)
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
      render: (text, record) => (
        <div>
          <EditOutlined onClick={()=>{
            setEditable(record)
            setShowModal(true)
          }}/>
          <DeleteOutlined className='mx-2' onClick={()=>{handleDelete(record)}}/>
        </div>
      )
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

  const handleDelete = async (record) => {
    try {
        setLoading(true);
        await axios.post('/transactions/delete-transactions', { transactionId: record._id });
        
        // Update the state to remove the deleted transaction
        setAllTransaction(allTransaction.filter(item => item._id !== record._id));

        setLoading(false);
        message.success("Transaction Deleted Successfully");
    } catch (error) {
        setLoading(false);
        message.error("Failed to delete transaction");
    }
}
const fetchTransactions = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    const res = await axios.post('/transactions/get-transactions', {
      userid: user._id,
      frequency,
      selectedDate,
      type
    });
    setAllTransaction(res.data);
  } catch (error) {
    console.error(error);
    message.error("Issue with fetching transactions");
  }
};

const handleSubmit = async (values) => {
  setLoading(true); // Start loading state
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    let transaction;

    if (editable) {
      const response = await axios.post('/transactions/edit-transactions', {
        payload: {
          ...values,
          userId: user._id,
        },
        transactionId: editable._id,
      });
      transaction = response.data;
      message.success("Transaction Edited Successfully");
    } else {
      const response = await axios.post('/transactions/add-transactions', {
        ...values,
        userid: user._id,
      });
      transaction = response.data;
      message.success("Transaction Added Successfully");
    }

    // Fetch updated transactions
    await fetchTransactions(); // This will ensure the table updates with the latest data

    setShowModal(false);
    setEditable(null);
  } catch (error) {
    console.error("Error adding/editing transaction:", error);
    message.error("Failed to add transaction");
  } finally {
    setLoading(false); // End loading state
  }
};



  return (
    <Layout>
      {loading && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <HashLoader />
      </div>
    )}
        <div className="filters m-3">
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
          <div className='switchicon'>
              <div>
                <UnorderedListOutlined className={`mx-2 ${viewData==='table' ? 'active-icon':'inactive-icon'}`} onClick={()=> setviewData('table')}/>
                <AreaChartOutlined className={`mx-2 ${viewData==='analytics' ? 'active-icon':'inactive-icon'}`} onClick={()=> setviewData('analytics')}/>
              </div>
            </div>
          <div>
            <button className='buttonn nav-link active' onClick={()=>setShowModal(true)}>Add New</button>
          </div>
        </div>
        <div className='content m-5'>
          {viewData==='table'?(
          <Table columns={columns} dataSource={allTransaction}/>)
          :(
          <Analytics allTransaction={allTransaction }/>
          )}
        </div>
        <Modal
          title={editable ? "Edit Transaction" : "Add Transaction"}
          open={showModal}
          onCancel={() => {
            setShowModal(false);
            setEditable(null); // Reset editable on modal close
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable || {}} // Set initialValues to editable or an empty object for "Add" mode
            key={editable ? editable._id : 'new'} // Add key to force rerender when editable changes
          >
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="rent">Rent</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fees</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button className="buttonn nav-link active" type="submit">
                {" "}Save
              </button>
            </div>
          </Form>
        </Modal>

    </Layout>
  )
}

export default HomePage