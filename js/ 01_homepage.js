let navDiv = document.querySelector('nav')
let header = document.querySelector('header')

// 阻止浏览器默认拖动图片
header.addEventListener('dragstart',(event)=>{
    event.preventDefault()
})

 /* ********************************************************* */
//  轮播图。。。
const carouselImgArr = ['./img/carousel/01.jpeg', './img/carousel/02.png', './img/carousel/03.png', './img/carousel/04.png', './img/carousel/05.png']
let currentCarouselIndex = 0
let currentCarouselImg = document.querySelector('main .carousel .img-ul img')

const dots = document.querySelector('main .carousel .dot-ul')
// dot li节点数组
const dotsArr = [...dots.children]
// let currentDotIndex = 0
// 每个dot绑定事件
for(let i = 0; i< dots.children.length; i++){
        dotsArr[i].addEventListener('mouseover',function(){

        // 预先移除所有轮播条(点)的active样式
        dotsArr.forEach(item=>{
            item.classList.remove('active')
        })
        // 添加指向的样式
        this.classList.add('active')
        
        currentCarouselImg.src = carouselImgArr[i]
        currentCarouselIndex = i
    })
    
}

 /* ********************************************************* */
//  控制轮播图左右切换   无脑写法。。。
const leftSwtich = document.querySelector('main .carousel .switch .left-switch i')
const rightSwtich = document.querySelector('main .carousel .switch .right-switch i')
leftSwtich.addEventListener('click',function(){
    if(currentCarouselIndex === 0){
        currentCarouselIndex = 4
        currentCarouselImg.src = carouselImgArr[currentCarouselIndex]
    }else{
        currentCarouselImg.src = carouselImgArr[--currentCarouselIndex]
    }
})
rightSwtich.addEventListener('click',function(){
    if(currentCarouselIndex === 4){
        currentCarouselIndex = 0
        currentCarouselImg.src = carouselImgArr[currentCarouselIndex]
        
    }else{
        currentCarouselImg.src = carouselImgArr[++currentCarouselIndex]
        console.log(currentCarouselIndex)
    }
    
})

 /* ********************************************************* */
// 开启定时器
let timerId
startTimer()


 /* ********************************************************* */
// introduction显示
const introductionDiv = document.querySelector('main .carousel .introduction')
const timesCircle = document.querySelector('main .carousel .introduction i')
// const width = getElementStylePropertyValue(introductionDiv,'offsetWidth').split('px')[0]
const width = introductionDiv.offsetWidth
timesCircle.addEventListener('click',function(){
    introductionDiv.style.left = -width + 2 + 'px'
    
})

 /* ********************************************************* */
// 当鼠标移入到侧边，展开introduction
const introductioDivLeft = getElementStylePropertyValue(introductionDiv,'left')
window.addEventListener('mouseover',((event)=>{
    // 在鼠标移入到x坐标为0-30像素的时候 并且当前introductioDivLeft <3px
    if(event.clientX>=0 && event.clientX <30 && introductioDivLeft < '3px' ) {
        introductionDiv.style.left = '0px'   
    }
}))


 /* ********************************************************* */
//  控制switch hover显示
const switcher = document.querySelector('main .carousel .switch')
// 鼠标移入到switch switch可见
switcher.addEventListener('mouseover',()=>{
    switcher.style.opacity = 1
})
// 鼠标移入到录播图 switch可见
currentCarouselImg.addEventListener('mouseover',()=>{
    switcher.style.opacity = 1
    clearInterval(timerId)
})
// 鼠标移出录播图 switch隐藏
currentCarouselImg.addEventListener('mouseout',()=>{
    switcher.style.opacity = 0
    startTimer()
})



// 自动轮播定时器
function startTimer(){
    timerId = setInterval(()=>{
    // 无脑写法。。。。 顺便控制轮播条(点)的active样式
    if(currentCarouselIndex === 4){
        dotsArr[currentCarouselIndex].classList.remove('active')
        currentCarouselIndex = 0
        currentCarouselImg.src = carouselImgArr[currentCarouselIndex]
        dotsArr[currentCarouselIndex].classList.add('active')    
    }else{
        dotsArr[currentCarouselIndex].classList.remove('active')
        currentCarouselImg.src = carouselImgArr[++currentCarouselIndex]
        dotsArr[currentCarouselIndex].classList.add('active')
    }
},2000)
}

// 获取元素样式
function getElementStylePropertyValue(element,property){
    // 获取元素的计算样式
    const styles = window.getComputedStyle(element);
    // 获取元素的 margin-left 属性的值
    const value = styles.getPropertyValue(property);
    // 返回值带单位
    return value
}

// 节流函数
function throttle(fn){
    let timer = null
    return function(){
        if(timer) return
        timer = setTimeout(() => {
            fn.apply(this,arguments)
            timer = null
            // console.log('this',this)
        }, 200);
        
    }
}

