/**
 * Created by AlexLiu on 2015/9/19.
 */

const ex = (pre, next) => {
    for(var p in next){
        pre[p] = next[p];
    }
    return pre;
}

export default ex;