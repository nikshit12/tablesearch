const tabledata = [
  {
    name: "George Clooney",
    keyUnit: "Clooney",
    unit2: "George",
    unit3: "",
  },
  {
    name: "George A. Clooney",
    keyUnit: "Clooney",
    unit2: "George",
    unit3: "A",
  },
  {
    name: "George Allan Clooney",
    keyUnit: "Clooney",
    unit2: "George",
    unit3: "Allan",
  },
  {
    name: "George Robert Clooney",
    keyUnit: "Clooney",
    unit2: "George",
    unit3: "Robert",
  },
  {
    name: "Simon Cowell",
    keyUnit: "Cowell",
    unit2: "Simon",
    unit3: "",
  },
];
const tableOptions = [
  {
    id: 0,
    option1: "George",
    option2: "Clooney",
    option3: "",
  },
  { id: 1, option1: "George", option2: "A", option3: "Clooney" },
  { id: 2, option1: "George", option2: "Allan", option3: "Clooney" },
  { id: 3, option1: "George", option2: "Robert", option3: "Clooney" },
  { id: 4, option1: "Simon", option2: "Cowell", option3: "" },
];
const answers = [
  "Clooney",
  "George",
  "empty",
  "Clooney",
  "George",
  "A",
  "Clooney",
  "George",
  "Allan",
  "Clooney",
  "George",
  "Robert",
  "Cowell",
  "Simon",
  "empty",
];
let headers = ["name", "key Unit", "unit2", "unit3"];
const generateTable = (tableID) => {
  let selectedTable = document.querySelector(`#${tableID}`);
  let table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("custom");
  let headerRow = document.createElement("tr");
  headers.forEach((headerText) => {
    let header = document.createElement("th");
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  tabledata.forEach((data) => {
    let row = document.createElement("tr");
    Object.values(data).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  selectedTable.appendChild(table);
};
// generateTable("table1");

const createTable = (tableID) => {
  const names = tabledata.map((data) => {
    return data.name;
  });
  let selectedTable = document.querySelector(`#${tableID}`);
  const createdTable = document.createElement("table");
  const tableHeader = document.createElement("thead");
  const tableBody = document.createElement("tbody");
  createdTable.classList.add("table");
  createdTable.classList.add("custom");
  headers.forEach((headerVal) => {
    const th = document.createElement("th");
    const thVal = document.createTextNode(headerVal);
    th.appendChild(thVal);
    tableHeader.appendChild(th);
  });
  names.forEach((name) => {
    const tr = document.createElement("tr");
    tr.classList.add("customRow");
    const td = document.createElement("td");
    const val = document.createTextNode(name);
    td.appendChild(val);
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });
  createdTable.appendChild(tableHeader);
  createdTable.appendChild(tableBody);
  selectedTable.appendChild(createdTable);
  const customRows = document.querySelectorAll(".customRow");
  const bringOptions = (i, row) => {
    tableOptions.forEach((option) => {
      if (option.id === i) {
        const td = document.createElement("td");
        const select = document.createElement("select");
        select.id = i;
        Object.values(option).forEach((vals) => {
          if (typeof vals != "number") {
            const option = document.createElement("option");
            const optionVal = document.createTextNode(vals);
            if (optionVal.data == "") {
              option.value = "empty";
            } else {
              option.value = optionVal.data;
            }
            option.appendChild(optionVal);
            select.append(option);
          }
          td.appendChild(select);
          row.appendChild(td);
        });
      }
    });
  };
  customRows.forEach((row, i) => row.classList.add(i));
  for (let i = 0; i < 3; i++) {
    customRows.forEach((row, i) => {
      bringOptions(i, row);
    });
  }
};

createTable("table1");
var selectedAnswer = [{}];
const checkButton = document.querySelector("#checkAnswer");
checkButton.addEventListener("click", (e) => {
  selectedAnswer = [];
  const targetTableId = checkButton.getAttribute("data-tragetable");
  const table = document.querySelector(`#${targetTableId}`);
  const selectedTableRow = document.querySelectorAll(
    `#${targetTableId} .customRow`
  );
  selectedTableRow.forEach((row) => {
    const selectGroup = row.querySelectorAll("select");
    selectGroup.forEach((select) => {
      selectedAnswer.push(select.value);
    });
  });
  if (JSON.stringify(selectedAnswer) === JSON.stringify(answers)) {
    alert("correct");
  } else {
    alert("try again!!");
  }
});

const showAnswerButton = document.querySelector("#showAnswer");
showAnswerButton.addEventListener("click", (e) => {
  const targetTableId = checkButton.getAttribute("data-tragetable");
  const table = document.querySelector(`#${targetTableId}`);
  const selectedTableRow = document.querySelectorAll(
    `#${targetTableId} .customRow`
  );
  const select = table.querySelectorAll("select");
  select.forEach((select, i) => {
    select.value = answers[i];
  });
});
