export function setStyleConfig() {
  localStorage.setItem("memoStyleConfig",JSON.stringify(this.memoStyleConfig))
}

export function getStyleConfig() {
  this.memoStyleConfig = localStorage.getItem("memoStyleConfig")
}