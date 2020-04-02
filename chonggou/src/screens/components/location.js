

let Geolocation = require('Geolocation');

export const getLocation = () => {
    
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            // console.log(location)
            location => {
                let txt = {}
                debugger;
                txt.latitude = location.coords.latitude;
                txt.longitude = location.coords.longitude;

                // txt = location.coords 
                // var result = "速度：" + location.coords.speed +
                //             "\n经度：" + location.coords.longitude +
                //             "\n纬度：" + location.coords.latitude +
                //             "\n准确度：" + location.coords.accuracy +
                //             "\n行进方向：" + location.coords.heading +
                //             "\n海拔：" + location.coords.altitude +
                //             "\n海拔准确度：" + location.coords.altitudeAccuracy +
                //             "\n时间戳：" + location.timestamp;
                // alert(result);
                resolve(txt)
            },
            error => {
                alert("获取位置失败："+ error)
            }
        );
    })
    
}