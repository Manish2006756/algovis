let array = [];

function generateArray(size = 40) {
  array = [];
  const container = document.getElementById("array-container");
  container.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 10;
    array.push(value);

    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}

async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      await new Promise(r => setTimeout(r, 50));

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";
    }
  }
}

async function quickSort() {
  async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    let bars = document.getElementsByClassName("bar");

    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        bars[i].style.height = `${arr[i]}px`;
        bars[j].style.height = `${arr[j]}px`;
        await new Promise(r => setTimeout(r, 100));
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = `${arr[i + 1]}px`;
    bars[high].style.height = `${arr[high]}px`;
    return i + 1;
  }

  async function qSort(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await qSort(arr, low, pi - 1);
      await qSort(arr, pi + 1, high);
    }
  }

  await qSort(array, 0, array.length - 1);
}

window.onload = generateArray;
