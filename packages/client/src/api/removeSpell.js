import axios from 'axios'

function removeSpell(playerName,spellIndex){
    const that = this
    axios.get(`../api/removeSpell.php?playerName=${playerName}&spellIndex=${spellIndex}`)
    .then(function (response) {
        console.log("removed")
    })
    .catch(function (error) {
        console.log(error);
    });
}

export {removeSpell}
