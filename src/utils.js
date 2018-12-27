function pathData(drawFunc, data) {
  Object.keys(data).forEach(key => {
    drawFunc[key] && drawFunc[key](data[key])
  })
  return drawFunc()
}

var PATH = {}

PATH.line = (points) => {
  let len = points.length
  let data = []
  let index, point
  for (index = 0; index < len; index++) {
    point = points[index]
    data.push(`${point[0]},${point[1]}`)
  }
  return `M${data.join('L')}`
}