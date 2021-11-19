import axios, { AxiosResponse, AxiosError } from "axios";

type ApiResponse = {
    code: number;
    data: any;
};

const API_URL = (process.env.REACT_APP_API_SERVER_URL || 'http://localhost:9898')

async function getVersion(){
    console.log(API_URL)
    console.log(process.env)
    console.log(process.env.REACT_APP_API_SERVER_URL)
    const result: ApiResponse = { code: 0, data: {} };
    const subPath ='/api/version';
    const uri = API_URL + subPath;
    await axios.get(uri).then((res: AxiosResponse) => {
        result.code = res.status;
        result.data = res.data;
    }).catch((err) => {
        result.code = err.response.status;
        result.data = err.response.data;
    });
    return result;
}

async function getRepositories(){
    const result: ApiResponse = { code: 0, data: {} };
    const subPath ='/api/quality/repositories';
    const uri = API_URL + subPath;
    await axios.get(uri).then((res: AxiosResponse) => {
        result.code = res.status;
        result.data = res.data;
    }).catch((err) => {
        result.code = err.response.status;
        result.data = err.response.data;
    });
    return result;
}

export { getVersion, getRepositories }
