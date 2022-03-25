import axios from 'axios'
import { ADMIN_URL } from './Url'

export function addcategory(data) {
    return axios.post(`${ADMIN_URL}category/addcategory`, data);
}
export function addsubcategory(data) {
    return axios.post(`${ADMIN_URL}category/addsubcategory`, data);
}
export function fetchcatsubcat(data) {
    return axios.get(`${ADMIN_URL}category/fetchcatsubcat`, data);
}
export function delsubcat(data) {
    return axios.post(`${ADMIN_URL}category/delsubcat`, data);
}
export function updatesubcat(data) {
    return axios.post(`${ADMIN_URL}category/updatesubcat`, data);
}
export function deletecat(data) {
    return axios.post(`${ADMIN_URL}category/deletecat`, data);
}
export function productdata(data) {
    return axios.post(`${ADMIN_URL}product/productdata`, data);
}
export function productmainimage(data) {
    return axios.post(`${ADMIN_URL}product/productmainimage`, data);
}
export function productsubimages(data) {
    return axios.post(`${ADMIN_URL}product/productsubimages`, data);
}
export function fetchproducts(data) {
    return axios.get(`${ADMIN_URL}product/fetchproducts`, data);
}
export function deleteproduct(data) {
    return axios.post(`${ADMIN_URL}product/deleteproduct`, data);
}
export function editproductinfo(data) {
    return axios.post(`${ADMIN_URL}product/editproductinfo`, data);
}
export function updateproductmainimage(data) {
    return axios.post(`${ADMIN_URL}product/updateproductmainimage`, data);
}
export function updatesubimage(data) {
    return axios.post(`${ADMIN_URL}product/updatesubimage`, data);
}