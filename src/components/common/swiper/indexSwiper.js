export function _Swiper (oSwiper) {
    // var oSwiper = document.getElementById('swiper');
    // var oSwiper=oSwiper;
    var oPre = oSwiper.getElementsByClassName('pre')[0];
    var oNext = oSwiper.getElementsByClassName('next')[0];
    var oLeft = oSwiper.getElementsByClassName('left')[0];
    var oRight = oSwiper.getElementsByClassName('right')[0];
    var aLi = oSwiper.querySelectorAll('li');
    var aSpan = oSwiper.querySelectorAll('span');


    var aName = [];
    var currentIndex = 0;
    //  保存每个li的className
    for (let item of aLi) {
        aName.push(item.classList[0]);
    }
    
    switchTo();
    setCurrent();
    clearInterval(timer);
    var timer = setInterval(() => {
        nextPic();
    }, 3000)
    // 鼠标经过Swiper
    oSwiper.onmouseover = function () {
        clearInterval(timer);
        // 显示上下切换键
        oPre.style.display = 'block';
        oNext.style.display = 'block';
        oLeft.onclick = function () {
            prePic();
        }
        oRight.onclick = function () {
            nextPic();
        }
    }
    // 鼠标离开
    oSwiper.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(() => {
            nextPic();
        }, 6000);
        // 隐藏上下切换键
        oPre.style.display = 'none';
        oNext.style.display = 'none';
    }
    function nextPic() {
        switchNext();
        addClass();

        currentIndex++;
        if (currentIndex > 5) currentIndex = 0;

        setCurrent();
    }
    function prePic() {
        switchPre(); // [2 3 4 5 1]
        addClass(); // [2 3 4 5 1]
        currentIndex--; // 5
        if (currentIndex < 0) currentIndex = 5;
        setCurrent(); // 5
    }
    function setCurrent() {
        for (let i = 0, length = aSpan.length; i < length; i++) {
            aSpan[i].className = ''
        }
        aSpan[currentIndex].className = 'action'; // 0
    }
    // 底部导航条监听
    function switchTo() {
        for (let i = 0, length = aSpan.length; i < length; i++) {
            aSpan[i].index = i;
            aSpan[i].onclick = function () {
                for (let j = 0, length = aSpan.length; j < length; j++) {
                    aSpan[j].className = '';
                }
                this.className = 'action'; // 2
                if (this.index > currentIndex) {
                    for (let i = currentIndex, length = this.index; i < length; i++) {
                        switchNext(); // 两次 [4 5 1 2 3]
                    }
                    addClass(); // li[4 5 1 2 3]
                }
                else {
                    for (let i = this.index, length = currentIndex; i < length; i++) {
                        switchPre();
                    }
                    addClass();
                }
                currentIndex = this.index; // 2

            }
        }
    }
    function addClass() {
        for (let i = 0, length = aLi.length; i < length; i++) {
            aLi[i].setAttribute('class', aName[i]);
        }
    }
    function switchNext() {
        aName.unshift(aName[aName.length - 1]);
        aName.pop();
        // 末尾项调到首项
    }
    function switchPre() {
        aName.push(aName[0]);
        aName.shift();
    }
}