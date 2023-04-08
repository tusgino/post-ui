import postAPI from "./api/postAPI";
import { getAllStudents, getStudentByID } from "./api/studentAPI"; './api/studentAPI';

console.log('Hello word')


async function main() {
  try {
    const queryparams = {
      _page: 1,
      _limit: 10,
    }
    const data = await postAPI.getAll(queryparams);
    console.log(data);
  } catch (error) {
    console.log('Get All Error ', error);
  }
}

main()