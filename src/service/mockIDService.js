const id={};

id.current=1;

function getID(){
    const res = {userid:id.current}
    id.current = res%3+1;
    return res;
}

module.exports={
    getID : getID
};