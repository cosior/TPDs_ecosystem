// Global variable to handle sidebar drag functionality
let dragging = false;


// Get the windows size in cases when the user resize the window
function update_window_size(){
    let main = $('#main');
    //console.log(main.width(), main.height())
    W_WIDTH = main.width() / 2;
    W_HEIGHT = main.height() / 2;

    $('svg').css("width",$("#main").width());
    $('svg').css("height",$("#main").height());
}


function init_gui(){
    // Update global variables with drawing div size
    update_window_size();
    
    // Set the Sidebar width
    $('#sidebar').css("width",SIDEBAR_WIDTH);
    $('#main').css("left",SIDEBAR_WIDTH);

    // Set Sidebar drag handler
    $('#dragbar').mousedown(function(e){
        e.preventDefault();
        
        dragging = true;
        var main = $('#main');
        var ghostbar = $('<div>', {id:'ghostbar',
            css: {
                height: main.outerHeight(),
                top: main.offset().top,
                left: main.offset().left
            }
        }).appendTo('body');
        
        $(document).mousemove(function(e){
            ghostbar.css("left",e.pageX+2);
        });
    });

    // Apply the drag selection on mouse up
    $(document).mouseup(function(e){
        if (dragging) {
            SIDEBAR_WIDTH = e.pageX + 2;
            $('#sidebar').css("width",SIDEBAR_WIDTH);
            $('#main').css("left",SIDEBAR_WIDTH);
            $('#ghostbar').remove();
            $(document).unbind('mousemove');
            dragging = false;
            update_window_size();
        }
    });

    // Initialize the open status of the sidebar and the options button
    if ($('#sidebar').width() > 0) {
        $('#openbtn').css("display", "None");
    } else {
        $('#openbtn').css("display", "block");
    }

    // Set the width of the sidebar to 0 (hide it) 
    $('#closebtn').click(function(e) {
        $('#sidebar').css("width",0);
        $('#main').css("left",0);
        $('#openbtn').css("display", "block");
        update_window_size();
    });

    // Set the width of the sidebar to 200px (show it)
    $('#openbtn').click(function(e) {
        $('#sidebar').css("width", SIDEBAR_WIDTH);
        $('#main').css("left", SIDEBAR_WIDTH);
        $('#openbtn').css("display", "None");
        update_window_size();
    });

    // Handle window resize event to update the drawing
    window.onresize = function(e){
        console.log("Resizined");
        update_window_size();
        redraw();
    };

    // Input file handler
    $("#file_handler").on('change', handleFile);
}

//Export svg
// https://www.cssscript.com/save-svg-to-file/

// or https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
function download_svg(){
    const svg = document.querySelector('svg').cloneNode(true); // clone your original svg
  document.body.appendChild(svg); // append element to document
  const g = svg.querySelector('g') // select the parent g
  g.setAttribute('transform', '') // clean transform
  const svgAsXML = (new XMLSerializer).serializeToString(svg);
  const svgData = `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`
  const link = document.createElement("a");
  document.body.appendChild(link); 
  link.setAttribute("href", svgData);
  link.setAttribute("download", "image.svg");
  link.click();
}