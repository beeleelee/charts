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

PATH.arc = ({
  innerRadius,
  outerRadius,
  startAngle,
  endAngle
}) => {
  let angle2Degree = 180 / Math.PI
  let startPoint = { x: 0, y: 0 }
  let firstPoint = {
    x: outerRadius * Math.cos(startAngle),
    y: -outerRadius * Math.sin(startAngle)
  }
  let secondPoint = {
    x: outerRadius * Math.cos(startAngle + endAngle),
    y: -outerRadius * Math.sin(startAngle + endAngle)
  }
  let largeArc = (endAngle - startAngle) * angle2Degree > 180 ? 1 : 0

  return `M0,0L${firstPoint.x},${firstPoint.y}A${outerRadius},${outerRadius} 0 ${largeArc},0 ${secondPoint.x},${secondPoint.y}Z`
}