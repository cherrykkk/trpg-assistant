import axios from 'axios'

const getPlayers = () =>{
    const that = this
    axios.get('../api/spellDescription.json')
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    });  
}
console.log(getPlayers)

export default{
    getPlayers

}