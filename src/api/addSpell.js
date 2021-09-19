import axios from 'axios';



const that = this
this.$axios.get('../api/spellDescription.json')
    .then(function (response) {
        that.originDictionary = response.data
    })
    .catch(function (error) {
        console.log(error);
    });