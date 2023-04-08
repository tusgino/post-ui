import axiosClient from "./axiosClient";


export const getAllStudents = (params) => {
  const url = '/students';
  return axiosClient.get(url, { params });
};

export const getStudentByID = (id) => {
  const url = `/students/${id}`;
  return axiosClient.get(url);
};


export default {}



// const postAPI = {
//   create(data) {
//     const url = '/students';
//     return axiosClient.post(url, data);
//   },
//   update(data) {
//     const url = `/students/${data.id}`;
//     return axiosClient.patch(url, data);
//   },
//   remove(id) {
//     const url = `/students/${id}`;
//     return axiosClient.delete(url);
//   },
// }

// export default postAPI