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

export const cancelElementAttribute = function (arr, targetCode, str, classNameArr) {
    if(arr && arr.length){
        arr.forEach((item, key) => {
            if(item.atrisCode && (item.atrisCode != targetCode)) {
                alert(`${str}${item.atrisCode}`)
                console.log(`${str}${item.atrisCode}`)
                classNameArr.forEach((item, key) => {
                    // if($(`${str}${item.atrisCode}`).is('.'+item)){
                        $(`${str}${item.atrisCode}`).removeClass(item) 
                        alert($(`${str}${item.atrisCode}`).is('.'+item))  
                    // }       
                })                
            }
            // if(item.atrisChildrenList && item.atrisChildrenList.length){
            //     cancelElementAttribute(item.atrisChildrenList, targetCode, str, className)
            // }
        })
    }
}