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
    console.log("-----------event----------------------", event)    
    let target = event.target||event.srcElement   
    return target
}

export const setEventElementAttributes = function (str, targetCode, classNameArr, attributeObj={} ) {
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
            classNameArr.forEach((item, key) => {
                console.log("--------", $(`${str}${targetCode}`))
                $(`${str}${targetCode}`).addClass(item)
            })
        }
    }
}
/**
 * 
 * @param {*} arr 
 * @param {*} targetCode 
 * @param {*} param2 {'cancel': {'str': '.cmp-item-', 'attr': ['cmp-item-selected']},'hide': {'str': ['.cmp-item-handler-']},'show': {'str': []}}
 */
export const cancelElementAttribute = function (arr, targetCode, obj) {
    let {
        cancel = {},
        hide = {},
        show = {}
    } = obj

    let cancelStr = cancel.str
    let cancelClassNameArr = cancel.attr
    let hideStrArr = hide.str
    let showStrArr = show.str
    if(arr && arr.length){
        arr.forEach((item, key) => {
            if(item.atrisCode && (item.atrisCode != targetCode)) {
                // alert(`${str}${item.atrisCode}`)
                // console.log(str + `${item.atrisCode}`)
                if(cancelClassNameArr && cancelClassNameArr.length){
                    cancelClassNameArr.forEach((classNameItem, key) => {
                        // alert($(cancelStr + `${item.atrisCode}`).hasClass(classNameItem))  
                        $(cancelStr + `${item.atrisCode}`).removeClass(`${classNameItem}`) 
                        // alert($(cancelStr + `${item.atrisCode}`).hasClass(classNameItem))  
                    }) 
                }
 
                if(hideStrArr && hideStrArr.length) {
                    hideStrArr.forEach((hideStrItem, index) => {
                        $(hideStrItem + `${item.atrisCode}`).hide()
                    })
                } 
                
                if(showStrArr && showStrArr.length) {
                    showStrArr.forEach((showStrItem, index) => {
                        $(showStrItem + `${item.atrisCode}`).show()
                    })
                }
            }
            if(item.atrisChildrenList && item.atrisChildrenList.length){
                cancelElementAttribute(item.atrisChildrenList, targetCode, obj)
            }
        })
    }
}

export const showElement = function () {

}