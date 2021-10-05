
import weaponDictionary from './json/weapon.json'
import armorDictionary from './json/armor.json'

const equipmentDictionary = [...weaponDictionary,...armorDictionary]

function getEquipmentDescription(eqName){

    let searchString = eqName.trim().toLowerCase();
    let weaponFiltered = equipmentDictionary.filter(function(item){
        if(item['武器名称'] && item['武器名称'].toLowerCase().indexOf(searchString) !== -1){
            return item;
        }
        else if(item['护甲名称'] && item['护甲名称'].toLowerCase().indexOf(searchString) !== -1){
            return item;
        }
    })
    
    return weaponFiltered || false
}

export {getEquipmentDescription}
