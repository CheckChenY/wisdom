export const search = (item) => {
    let arr = [];
    item.forEach((show,i)=>{
        if(show.status){
            arr.push(show)
        }
    })
    return arr;
}