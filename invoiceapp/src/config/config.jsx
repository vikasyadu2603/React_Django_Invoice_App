import React from "react";

const baseURL = "http://127.0.0.1:8000"
//const baseURL = "/api"

const config = {

    apiBaseURL : `${baseURL}/api`,
    staticBaseURL : `${baseURL}`,
    apiTimeout: 500000
}
export default config;