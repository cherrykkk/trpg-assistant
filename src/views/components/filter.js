export {filteredSpell,filteredEquipment}
function filteredSpell(origin,type,title,searching) {

  let filtered = origin.filter(function(item){
    if( 
      (item['派系']&&item['派系']==searching) || 
      item[searching] ||
      item['法术名称'].toLowerCase().indexOf(searching)!=-1
    ){
      return item;
    }
  })
  //按环排
  filtered.sort(function(a,b){ 
    return a['等级']-b['等级'] 
  });
  return filtered;
}

function filteredEquipment(origin,type,title,searching) {
  let filtered
  if(title=="武器"){
    filtered = origin.weapon.filter(function(item){
      if(item['复杂度'] == searching){
        return item;
      }
    })
  }
  else{
    filtered = origin.armor.filter(function(item){
      if(item['护甲种类'] == searching){
        return item;
      }
    })
  }
  return filtered;
}