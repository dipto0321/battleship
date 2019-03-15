const createGrid = () => {
  const grid = document.createElement('div');
  grid.setAttribute('class', 'col-md-6 grid');

  for (let i = 0; i < 10; i++) {
    grid.appendChild(createRow(10));
  }

  return grid;
}


const createRow = (num) => {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  for (let i = 0; i < num; i++) {
    const box = document.createElement('div');
    box.setAttribute('class', 'col box');
    box.innerText = '-';
    row.appendChild(box);
  }
  return row;
}

export default createGrid;