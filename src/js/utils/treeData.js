

const getTree = (deep = 0, pid=0) => {
    var tree = [];
    if(deep > 4) return tree;
    var length = 2;

    for(var i=0; i<length; i++){
        id = `${pid}-${i}`;

        tree[i] = {
            title: `section${id}`,
            id,
            children: getTree(deep + 1, id)
        }
    }

    return tree;
}

export default getTree();