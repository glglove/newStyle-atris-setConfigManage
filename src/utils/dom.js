// 找到最近的元素
export const findEventElement = function ($target, eventName) {
    if ($target.hasClass(eventName)) {
        return $target;
    }
    var ret = $target.parents("." + eventName + ":first");
    if (ret.length) {
        return ret;
    } else {
        return null;
    }
}

export const getCurrentHandlerDom = function (e) {
    let event = e || window.event
    event.preventDefault ? event.preventDefault() : (event.returnValue = false)
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true)
    // console.log("-----------event----------------------", event)    
    let target = event.target||event.srcElement   
    return target
}

export const setEventElementAttributes = function (isPage=false, str, targetCode, classNameArr, attributeObj={}) {
    // debugger
    let {
        border,
        display,
        height,
        width,
        background,
        padding,
        margin,
        position,
        fontSize,
        color
    } = attributeObj

    if($(`${str}${targetCode}`)){
        if(border){
            $(`${str}${targetCode}`).css({
                'border': border
            })
        }else if(classNameArr && classNameArr.length){
            // alert(666)
            classNameArr.forEach((item, key) => {
                console.log("--------", $(`${str}${targetCode}`))
                $(`${str}${targetCode}`).addClass(item)
            })
            // 当前如果有cmp-item-selected取消当前的hover
            if($(`${str}${targetCode}`).hasClass("cmp-item-selected")){
                $(`${str}${targetCode}`).removeClass('cmp-item-mouseover')
            }
        }
    }
}
/**
 * 
 * @param {*} arr 
 * @param {*} targetCode 
 * @param {*} param2 {'cancel': {'str': '.cmp-item-', 'attr': ['cmp-item-selected']},'hide': {'str': ['.cmp-item-handler-']},'show': {'str': []}}
 */
export const cancelElementAttribute = function (isPage=false, isClick, arr, targetCode, obj) {
    // debugger
    let {
        cancel = {},
        hide = {},
        show = {}
    } = obj

    let cancelStr = cancel.str
    let cancelClassNameArr = cancel.attr
    let hideStrArr = hide.str
    let showStrArr = show.str
    // 取消其他的 选中状态
    if(arr && arr.length){
        arr.forEach((item, key) => {
            if(item.minUnicode && (item.minUnicode != targetCode)) {
                // alert(`${str}${item.minUnicode}`)
                // console.log(str + `${item.minUnicode}`)
                if(cancelClassNameArr && cancelClassNameArr.length){
                    cancelClassNameArr.forEach((classNameItem, key) => {
                        // alert($(cancelStr + `${item.minUnicode}`).hasClass(classNameItem))                        
                        $(cancelStr + `${item.minUnicode}`).removeClass(`${classNameItem}`) 
                        // alert($(cancelStr + `${item.minUnicode}`).hasClass(classNameItem))  
                    }) 
                }
    
                if(hideStrArr && hideStrArr.length) {
                    hideStrArr.forEach((hideStrItem, index) => {
                        $(hideStrItem + `${item.minUnicode}`).hide()
                    })
                } 
                
                if(showStrArr && showStrArr.length) {
                    showStrArr.forEach((showStrItem, index) => {
                        $(showStrItem + `${item.minUnicode}`).show()
                    })
                }
            }
            if(item.childrenList && item.childrenList.length){
                cancelElementAttribute(isPage, isClick, item.childrenList, targetCode, obj)
            }
        })
    }
    if(!isPage){
        // 取消页面的选中和hover状态
        $(cancelStr + `pagecode`).removeClass(`cmp-item-mouseover`)  
        if(isClick){
            $(cancelStr + `pagecode`).removeClass(`cmp-item-selected`) 
            if(hideStrArr && hideStrArr.length) {
                hideStrArr.forEach((hideStrItem, index) => {
                    $(hideStrItem + `pagecode`).hide()
                })
            } 
        }
    }
}

export const getDataObj = function (arr, minUnicode, resObj, flag ) {
    console.log("00000",minUnicode, arr)
    // debugger
    if(arr && arr.length ){
        for(var i=0; i< arr.length; i++){
            var item = arr[i];
            // console.log(item);
            // console.log(i)
            // console.log(item.controlName);
            if(!item.minUnicode){
                return;
            }
            console.log("111111",item.minUnicode, minUnicode)
            if(item.minUnicode && item.minUnicode === minUnicode){
                flag = true
                resObj = JSON.parse(JSON.stringify(item))
                return resObj;
            }else {
                if(!flag){
                    if(item.childrenList && item.childrenList.length){
                        let res = getDataObj(item.childrenList, minUnicode, resObj, flag)
                        if(res && res.minUnicode) {
                            return res
                        }
                    }
                }
            }
        }
    } else {
        return null
    } 
}