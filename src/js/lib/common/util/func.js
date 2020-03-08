/* eslint-disable no-param-reassign */
/* eslint-disable prefer-rest-params */
const debounce_func = function(fn, delay, scope){
    let timer = null;
    return function(){
        const context = scope || this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};

const throttle_func = function(fn, threshold, scope){
    let timer;
    let prev;
    if (!threshold) threshold = 100;
    return function(){
        const context = scope || this;
        const args = arguments;
        const now = Date.now();
        if (prev && now < prev + threshold) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                prev = now;
                fn.apply(context, args);
            }, threshold);
        } else {
            prev = now;
            fn.apply(context, args);
        }
    };
};

const main = {
    debounce: debounce_func,
    throttle: throttle_func,
};

export const debounce = debounce_func;
export const throttle = throttle_func;

export default main;