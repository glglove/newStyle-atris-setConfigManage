export function debounce(callback,waitTime){
    var timer = null;
    return function(){
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(callback,waitTime);
    }
}
