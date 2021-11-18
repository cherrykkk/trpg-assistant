
let spellKey = [
  {
    title: "名称",
    type: "text-input"
  },{
    title: "学派",
    type: "radio",
    data: ["防护","咒法","预言","附魔","塑能","幻术","死灵","变化"]
  },{
    title: "职业",
    type: "radio",
    data: ['圣武士','德鲁伊','邪术士','术士','法师','游侠','牧师','诗人']
  }
]

let equipmentKey = [
  {
    title: "武器",
    type: "radio",
    data: ["简易","军用"]
  },{
    title: "护甲",
    type: "radio",
    data: ["轻甲","中甲","重甲"]
  }
]
export default {"法术":spellKey,"装备":equipmentKey}