import axios from 'axios'


function SpellDictionary(){
    this.dictionary
    this.refresh = true
    this.init = ()=>{
        const that = this
        axios.get('../api/spellDescription.json')
        .then(function (response) {
            //console.log(response.data)
            that.dictionary = response.data
            this.refresh = !that.refresh
            console.log("got dictionary")
            // that.originDictionary = response.data
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    this.init()
}

let spellDictionary = new SpellDictionary()

export {spellDictionary}
