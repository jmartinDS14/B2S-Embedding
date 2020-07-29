// Good for testing as it shows what line it's coming from
//can use alert instead of console.log to create pop up
console.log("Hello from DS14!");

let viz;

//Create a variable for URL
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

//Create a variable for Viz Container
const vizContainer = document.getElementById("vizContainer");
console.log(vizContainer);

//Create a variable for the viz optons
const options = {
  device: "desktop",
  hideTabs: true,
};

//bring elements together
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
  showButton.style.display = "none";
}

//Create a variable for hide button and connect it to clicking action
const hideButton = document.getElementById("hideButton");
hideButton.addEventListener("click", function () {
  viz.hide();
  showButton.style.display = "inline";
  hideButton.style.display = "none";
});

const showButton = document.getElementById("showButton");
showButton.addEventListener("click", function () {
  viz.show();
  showButton.style.display = "none";
  hideButton.style.display = "inline";
});

//export to PDF
const pdfButton = document.getElementById("pdfButton");
pdfButton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

const ppButton = document.getElementById("ppButton");
ppButton.addEventListener("click", function () {
  viz.showExportPowerPointDialog();
});

const dataButton = document.getElementById("dataButton");
dataButton.addEventListener("click", function () {
  viz.showExportCrossTabDialog();
});

function getRangeValues() {
  //get values from inputs
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;

  //get the workbook
  const workbook = viz.getWorkbook();

  //get active sheet (dashboard)
  const activesheet = workbook.getActiveSheet();

  //get all the sheets in the dashboard
  const sheets = activesheet.getWorksheets();

  //apply the filter to the sheet with the sames measure
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
}

document.getElementById("filterButton").addEventListener("click", function () {
  getRangeValues();
});

//whenever (entire) page loads execute function
document.addEventListener("DOMContentLoaded", initViz);
