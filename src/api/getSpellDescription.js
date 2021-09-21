
import {spellDictionary} from "./getSpellDictionary";

function getSpellDescription(spellName){
    let filtered = spellDictionary.dictionary;

    if(spellName){
        let searchString = spellName.trim().toLowerCase();
        filtered = filtered.filter(function(item){
            if(item['法术名称'].toLowerCase().indexOf(searchString) !== -1){
                return item;
            }
        })
    }
    return filtered;
}
console.log("in")


export {getSpellDescription}
