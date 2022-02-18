/** Constant Variables **/
// The circe R
let R = 100;

// The total number of nodes that we want to create
let NUM_NODES = 0;

// Define Global Variables to Hold The Center of the Browser Window
let W_WIDTH = 0;
let W_HEIGHT = 0;

// Global variable to hold nodes data
let NODES = [];

// Edge list
EDGES = null;

/* Control Variables */
let SHOW_LABELS = false;
let NODE_MIN_DEGREE = 1;
let DATA;


// Entry point of the main logic
window.onload = function() {
    // Initialize the gui related components
    // Also sets the file handler listener to start the drawing process.
    init_gui(); 
    console.log("Main window loaded...");
};


// Starts the graph drawing phase when a new file is loaded
function handleFile() {
    const file = this.files[0];
    console.log(file.name);
    const reader = new FileReader();
    reader.addEventListener('loadend', function(e) {
        const result = e.target.result;
        let data = JSON.parse(result)
        console.log({data});
        set_graph_globals(data.parameters) // Load the new graph parameters
        DATA = data;
        new_drawing(); // Draw the new graph
    });
    reader.readAsText(file);
    document.getElementById("download_svg").style.display = "block"
}


// Update global variables with graph properties
function set_graph_globals(params){
    R = params.radius_H2;
    NUM_NODES = params["nb. vertices"];
}