function on(eventType, element, obj, fn) {
  if (!(element instanceof Element)) {
    element = document.querySelector(element);
  }
  element.addEventListener('click',(e)=> {
      for(let key in obj){
        let t = e.target
        if(obj.hasOwnProperty(key)){
          while (!t.matches(key)){
            if(t ===element){
              t = null
              break
            }
            t = t.parentNode
          }
          fn(t,key)
        }
      }
  })
}
export default on