const mask = function (context = document) {
  const elements = Array.from(context.getElementsByTagName('body'))
  const maskContent = '<div style="font-size: 24px;color: white;">Loading...</div>'
  const maskContainer = document.createElement('div')

  maskContainer.style.cssText = 'position: fixed;  top: 0;  left: 0;  width: 100%;  height: 100%;  background-color: rgba(100, 100, 100, 0.7);  display: flex;  align-items: center;  justify-content: center;z-index: 1000;'
  maskContainer.className = 'maskContainer'
  maskContainer.innerHTML = maskContent

  return {
    elements,
    show() {
      this.elements.forEach(element => {
        element.prepend(maskContainer)
      })
      return this
    },
    hide() {
      this.elements.forEach(element => {
        Array.from(element.getElementsByClassName('maskContainer')).forEach(el => {
          el.remove()
        })
      })
      return this
    }
  }
}()