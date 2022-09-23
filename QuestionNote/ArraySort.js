// 数组冒泡排序
function bubbleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if(arr[j] > arr[j + 1]) {
        const item = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = item
      }
    }
  }
  return arr
}

const arr = [2, 3, 1, 5, 4]
console.log(bubbleSort(arr));
