  
  export const search = (arr, x) => {
    let min  = 0;
    let max = arr.length - 1;
    while(min <= max){
        let mid = ~~((max + min) / 2);
        if(x === arr[mid]) return mid;
        else {
            if(x > arr[mid]) min = mid + 1;
            else max = mid - 1;
        }
    }
    return false;
  };
