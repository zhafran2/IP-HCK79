

import axios from 'axios'

const instance= axios.create({
    // baseURL:"http://localhost:3000"
    baseURL:"https://web.zhafran.online/"
})

export default instance