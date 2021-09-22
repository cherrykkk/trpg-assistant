
import {equipmentDictionary} from "./getEquipmentDictionary.js";

function getEquipmentDescription(eqName){
    let filtered = equipmentDictionary;

    if(eqName){
        let searchString = eqName.trim().toLowerCase();
        filtered = filtered.filter(function(item){
            if(item['护甲名称'].toLowerCase().indexOf(searchString) !== -1){
                return item;
            }
        })
    }
    return filtered;
}

export {getEquipmentDescription}
