import isFunctionalComponent from './isFunctionalComponent'
import mountNativeElement from './mountNativeElement'

export default function mountComponent(virtualDOM, container) {
  let nextVirtualDOM = null
  if (isFunctionalComponent(virtualDOM)) {
    nextVirtualDOM = bindFunctionComponent(virtualDOM)
  } else {
    nextVirtualDOM = bindClassComponent(virtualDOM)
  }
  console.log('nextVirtualDOM', nextVirtualDOM)

  if (isFunctionalComponent(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container)
  } else {
    mountNativeElement(nextVirtualDOM, container)
  }
}

function bindFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function bindClassComponent(virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {})
  const nextVirtualDOM = component.render()
  nextVirtualDOM.component = component
  return nextVirtualDOM
}