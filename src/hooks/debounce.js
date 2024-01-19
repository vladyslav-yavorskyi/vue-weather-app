export function debounce(fn, wait=300){
  let timer;
  return function(...args){
    if(timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    const context = this; // get the current context
    timer = setTimeout(async ()=>{
      await fn.apply(context, args); // call the function if time expires
    }, wait);
  }
}
