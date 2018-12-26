function pathData(drawFunc, data) {
  Object.keys(data).forEach(key => {
    drawFunc[key] && drawFunc[key](data[key])
  })
  return drawFunc()
}