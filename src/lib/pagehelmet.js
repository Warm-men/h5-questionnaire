import { useEffect } from 'react'

export default function PageHelmet(props) {
  useEffect(() => {
    document.title = props.title || '互联网金融消费知识小调研'
    const link = props.link || window.location.pathname
    const linkRel = 'canonical'
    const node = document.getElementsByTagName('link')
    let isHadLink = false
    for (let i = 0; i < node.length; i++) {
      // NOTE:有link直接修改即可
      if (node[i].rel === linkRel) {
        isHadLink = true
        node[i].href = link
        break
      }
    }
    if (!isHadLink) {
      const newLink = document.createElement('link')
      newLink.rel = linkRel
      newLink.href = link
      document.head.appendChild(newLink)
    }
  }, [props.title, props.link])

  return null
}
