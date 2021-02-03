import selector from "./lib/selector"
import on from "./lib/on"
import colors from "./lib/colors"
import heights from "./lib/heights"
const drawing = selector('#drawing')
const brush = selector('#brush')
const eraser = selector('#eraser')
const clear = selector('#clear')
const save = selector('#save')
const color = selector('#color')
const lines = selector('#lines')
const thick = selector('#thick')

let startPoint
let EraserOn = false
let painting = false
drawing.width = document.documentElement.clientWidth
drawing.height = document.documentElement.clientHeight

const removeClass = (string)=>string.classList.remove('active')
const addClass = (string)=>string.classList.add('active')
const openBrush = ()=>{
  EraserOn = false
  addClass(brush)
  removeClass(eraser)
}
const closeBrush = ()=>{
  EraserOn = true
  addClass(eraser)
  removeClass(brush)
}

if (drawing.getContext) {
  let ctx = drawing.getContext('2d')
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = 2
  ctx.strokeStyle = 'black'


  const lineNext = function (xStart, yStart, xEnd, yEnd) {
    ctx.beginPath()
    ctx.moveTo(xStart, yStart)
    ctx.lineTo(xEnd, yEnd)
    ctx.stroke()
  }
  const drawingMove = (x,y)=>{
    if (painting === true) {
      if (EraserOn === true) {
        ctx.clearRect(x - 20, y - 20, 40, 40)
      } else {
        addClass(brush)
        lineNext(startPoint[0], startPoint[1], x, y)
        startPoint = [x, y]
      }
    }
  }
  if ('ontouchstart' in document.documentElement) {
    drawing.ontouchstart = (e) => {
      removeClass(lines)
      startPoint = [e.touches[0].clientX, e.touches[0].clientY]
      painting = true
    }
    drawing.ontouchmove = (e) => {
      let [x, y] = [e.touches[0].clientX, e.touches[0].clientY]
      drawingMove(x,y)
    }
    drawing.ontouchend = () => {
      painting = false
    }
  } else {
    drawing.onmousedown = (e) => {
      removeClass(lines)
      startPoint = [e.offsetX, e.offsetY]
      painting = true
    }
    drawing.onmousemove = (e) => {
      let [x, y] = [e.offsetX, e.offsetY]
      drawingMove(x,y)
    }
    drawing.onmouseup = () => {
      painting = false
    }
  }

  thick.onclick = ()=>{
    if(lines.classList.length===0){
     addClass(lines)
    }else {
      removeClass(lines)
    }
  }

  brush.onclick = () => {
    openBrush()
  }

  eraser.onclick = () => {
    closeBrush()
  }

  clear.onclick = () => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, drawing.width, drawing.height)
  }

  on('click',color,colors,(t,key)=>{
    const n = document.getElementById(colors[key])
    if(t &&t.matches(key)){
      ctx.strokeStyle = colors[key]
      addClass(n)
      openBrush()
    }else {
      removeClass(n)
    }
  })
  on('click',lines,heights,(t,key)=>{
    if(t&&t.matches(key)){
      ctx.lineWidth = heights[key]
    }
  })

  save.onclick = () => {
    const imgURI = drawing.toDataURL('image/jpg')
    let img = document.createElement('a')
    document.body.appendChild(img)
    img.href = imgURI
    img.download = '草稿纸'
    img.target = '_blank'
    img.click()
  }
}






