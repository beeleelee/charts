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
  let angle2Degree = Math.PI / 180
  startAngle -= 90 * angle2Degree
  endAngle -= 90 * angle2Degree
  let outerArcStart = {
    x: outerRadius * Math.cos(startAngle),
    y: outerRadius * Math.sin(startAngle)
  }
  let outerArcEnd = {
    x: outerRadius * Math.cos(endAngle),
    y: outerRadius * Math.sin(endAngle)
  }
  let largeArc = (endAngle - startAngle) / angle2Degree > 180 ? 1 : 0
  let innerArcStart, innerArcEnd
  if (innerRadius > 0) {
    innerArcStart = {
      x: innerRadius * Math.cos(startAngle),
      y: innerRadius * Math.sin(startAngle)
    }
    innerArcEnd = {
      x: innerRadius * Math.cos(endAngle),
      y: innerRadius * Math.sin(endAngle)
    }
    return `M${outerArcStart.x},${outerArcStart.y}A${outerRadius},${outerRadius} 0 ${largeArc},1 ${outerArcEnd.x},${outerArcEnd.y}L${innerArcEnd.x},${innerArcEnd.y}A${innerRadius},${innerRadius} 0 ${largeArc},0 ${innerArcStart.x},${innerArcStart.y}Z`
  }

  return `M0,0L${outerArcStart.x},${outerArcStart.y}A${outerRadius},${outerRadius} 0 ${largeArc},1 ${outerArcEnd.x},${outerArcEnd.y}Z`
}