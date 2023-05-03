export const runtimeCalc = (runtime:number | null):String | null => {
    console.log(runtime)
    if (runtime === null || runtime === undefined) {
        return "";
    } else if (runtime / 60 < 1 ) {
        return `${runtime % 60} min`
    } else if (runtime % 60 < 1){
        return `${Math.floor(runtime /60)} hr`
    } else {
        return `${Math.floor(runtime /60)} hr ${runtime % 60} min`
    }
}