console.log("Hello from app.js");
let viz;

//select the HTML elements
const hideButton = document.getElementById("hideButton");
const showButton = document.getElementById("showButton");
const exportPDFButton = document.getElementById("exportPDF");
const exportImageButton = document.getElementById("exportImage");
const exportPPTButton = document.getElementById("exportPPT");
const applyFilter = document.getElementById("applyFilter");
const clearFilter = document.getElementById("clearFilter");
const vizContainer = document.getElementById("vizContainer"); // reference the div container from the html file

const url = "https://public.tableau.com/views/MM2020w20carinsurance/Dashboard";

const options = {
  device: "desktop",
  hideToolbar: true
};

function initViz() {
  console.log("My viz is loading ...");
  viz = new tableau.Viz(vizContainer, url, options);
}

function hideViz() {
  console.log("Hiding the viz...");
  viz.hide();
  console.log("Viz hidden!");
}

function showViz() {
  console.log("Showing the viz...");
  viz.show();
  console.log("Viz shown!");
}

function exportPDF() {
  console.log("Exporting to PDF...");
  viz.showExportPDFDialog();
}

function exportImage() {
  console.log("Exporting as image...");
  viz.showExportImageDialog();
}

function exportPPT() {
  console.log("Exporting to PPT...");
  viz.showExportPowerPointDialog();
}

function getRangeValues() {
  // 1. get the min and max values
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(
    `Your min value is ${minValue} and your max value is ${maxValue}`
  );
  // 2. get Workbook, get Active sheet, get all the sheets, get the sheet with the coverage bar chart
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[0]; // get the first sheet which is the one I want to filter
  //   you can also use getName() function to get the names of all sheets, loop through them and if the name matches the name of the sheet you want to filter, then save it as sheet to filter
  //   sheets.map(sheet => console.log(sheet)); // <- for loop

  // 3. Apply the range filter from 1 to the bar chart
  sheetToFilter
    .applyRangeFilterAsync("SUM(Full coverage)", {
      min: minValue,
      max: maxValue
    })
    .then(console.log("Your filter was applied!"));
  //then some error handling
}

function clearTheFilter() {
  // 1. Get the sheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[0];
  // 2. Clear the filter
  sheetToFilter
    .clearFilterAsync("SUM(Full coverage)")
    .then(console.log("Your filter was cleared!"));
}

hideButton.addEventListener("click", hideViz);
showButton.addEventListener("click", showViz);
exportPDFButton.addEventListener("click", exportPDF);
exportImageButton.addEventListener("click", exportImage);
exportPPTButton.addEventListener("click", exportPPT);
applyFilter.addEventListener("click", getRangeValues);
clearFilter.addEventListener("click", clearTheFilter);
document.addEventListener("DOMContentLoaded", initViz); //Andre puts it at the bottom of the js file
