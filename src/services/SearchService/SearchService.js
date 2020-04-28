import axios from 'axios'
const API_URL = 'http://localhost:3000'

export default {
  search (payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/search`, {params: payload})
        .then(response => { resolve(response.data) })
        .catch(error => { reject(error) })
    })
  },
}