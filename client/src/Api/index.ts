import axios, { type AxiosResponse } from 'axios'

const mainUrl = process.env.REACT_APP_MAIN_URL

export const apiGet = async <ResponseDataType> (url: string, query?: Record<string, any>): Promise<AxiosResponse<ResponseDataType, any>> =>
  await axios.get(`${mainUrl}${url}`, { params: query })

export const apiPost = async <ResponseDataType> (url: string, data?: any): Promise<AxiosResponse<ResponseDataType, any>> =>
  await axios.post(`${mainUrl}${url}`, data)

export const apiPut = async <ResponseDataType> (url: string, data: any): Promise<AxiosResponse<ResponseDataType, any>> =>
  await axios.put(`${mainUrl}${url}`, data)

export const apiPatch = async (url: string, data: any): Promise<AxiosResponse<any, any>> =>
  await axios.patch(`${mainUrl}${url}`, data)

export const apiDelete = async <ResponseDataType> (url: string, data: any): Promise<AxiosResponse<ResponseDataType, any>> =>
  await axios.delete(`${mainUrl}${url}`, { data })
