import { message } from 'antd'
import API from './API'


export const GetInvoice = async() => {

    // console.log("property services");
    const response = await API.get(`/invoice/`,
    {headers : {'Content-Type':'application/json'}}).catch(
        err => message.error('regisration failed.')
    )
    return response ? response.data: {}
}

export const InvoiceDeleteData = async (id) => {

    const response = await API.delete(`/invoice/${id}`,
        { headers: { 'Content-Type': 'application/json' } }).catch(
            err => message.error('Not delete')
        )
    return response ? response.data : {}
}
export const Empregister = async(formData) => {
    const response = await API.post(`/invoice/`,formData,
    {headers : {'Content-Type':'multipart/form-data'}}).catch(
        err => message.error('regisration failed.')
    )
    return response ? response.data: {}
}


export const updateInvoice = async (id, putData) => {
    const response = await API.put(`/invoice/${id}`, putData,
        { headers: { 'Content-Type': 'application/json' } }).catch(
            err => message.error('Not Fetch')
        )
    return response ? response.data : {}

}

export const GetInvoiceByName = async(formData) => {
    const response = await API.post(`/invoiceByname/`,formData,
    {headers : {'Content-Type':'application/json'}}).catch(
        err => message.error('regisration failed.')
    )
    return response ? response.data: {}
}

