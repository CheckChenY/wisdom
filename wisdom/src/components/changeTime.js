
import moment from 'moment';
export const changeTime = (time) => {
    if( !time){
        return ''
    }
    let nativeDate2 = new Date(time)
    let t = moment(nativeDate2).format('YYYY[-]MM[-]DD hh[:]mm[:]ss')
    return t;
}