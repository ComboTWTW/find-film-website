export const runtimeCalc = (runtime:number | null):String | null => {
    if (runtime === null || runtime === undefined || runtime === 0) {
        return "";
    } else if (runtime / 60 < 1 ) {
        return `${runtime % 60} min`
    } else if (runtime % 60 < 1){
        return `${Math.floor(runtime /60)} hr`
    } else {
        return `${Math.floor(runtime /60)} hr ${runtime % 60} min`
    }
}