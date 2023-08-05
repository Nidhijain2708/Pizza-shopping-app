import url from '../utils/constants.js';

async function makeNetworkCall(){
    const response=await fetch(url);
    // console.log(response);
    const data=await response.json();
    // console.log(data);
    return data;
}

export default makeNetworkCall;