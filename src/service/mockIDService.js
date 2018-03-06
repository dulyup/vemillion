let id;
const active= new Set();

id.current=1;

function getID(){
    const res = {userid:id};
    active.add(id);
    id= res%3+1;    
    return res;
}

module.exports={
    getID : getID,
    activeUsers : active
};