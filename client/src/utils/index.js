

export const getRating=function(ratingArray){
    const copyArray=ratingArray;
    const countTotal=copyArray.reduce((cTotal,rating)=>cTotal+rating.count,0)
    const sumRatings=ratingArray.reduce((rTotal,rating)=>rTotal+rating.count*rating.id,0)
    return sumRatings/countTotal
}

 export const isEmptyObj=function(object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

