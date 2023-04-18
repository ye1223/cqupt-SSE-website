// 固定更改主页导航的hover
const navLists = [...document.querySelector('nav ul').children]
// inner 为保存的导航栏a标签列表内容
const inner = []
 navLists.forEach(item=>{//  item为li标签 
    if(item.children[0].tagName === 'A') inner.push(item) //item.children[0] 就是a标签
})

inner.forEach(item=>{
    // 如果导航栏标签为document title，就给li元素加hover类
    if(item.children[0].innerText === document.title) item.classList.add('hover')
})


