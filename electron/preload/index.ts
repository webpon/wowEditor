function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent = `
  .load-wrapper {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading {
    width: 30px;
    height: 30px;
    display: inline-block;
    border: 3px solid #eee;
    border-radius: 50%;
    border-top: 3px solid gray;
    /* 将上边框改成蓝色 */
}

/* 定义动画 */
@keyframes loadingAnimation {

    /* 动画开始旋转0度 */
    0% {
        transform: rotate(0deg);
    }

    /* 动画结束旋转360度 */
    100% {
        transform: rotate(360deg);
    }
}

/* 添加动画 */
.loading {
    animation: loadingAnimation .5s infinite linear;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'load-wrapper'
  oDiv.innerHTML = `<div class="${className}">
            <div class="loading"></div>
            <div>加载中...</div>
        </div>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------
// const { appendLoading, removeLoading } = useLoading()
// domReady().then(appendLoading)
// window.onmessage = (ev) => {
//   ev.data.payload === 'removeLoading' && removeLoading()
//   ev.data.payload === 'appendLoading' && appendLoading()
// }

// setTimeout(removeLoading, 11999)
