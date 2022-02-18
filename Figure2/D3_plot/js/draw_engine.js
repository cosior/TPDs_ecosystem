// Globals variables for the drawing engine
var minDegree = 10000000000;
var maxDegree = 0;
var nodescale;

var addedListeners = {};

// Reset canvas
function reset_drawing(){
    // Update GUI Info and Buttons
    $('#number_of_nodes').val('');
    $('#r_value').val('');
    $('#btn_reset').attr("disabled", true);
    $('#btn_update').attr("disabled", true);
    $('#chk_toggle').attr("disabled", true);

    //console.log("reset");
    d3.select("div.svg_container > *").remove();
    window.location.reload();
}

let newScale = function(degree) {
    return MAX_NODE_SIZE * (Math.log(degree + MIN_NODE_SIZE) + 1)
}

function new_drawing(){
    
    let data = JSON.parse(JSON.stringify(DATA));

    console.log("Value of new R:", R);
    console.log("Number of Nodes:", NUM_NODES);
    console.log("Minimum Node Degree:", MIN_NODE_DEGREE);

    var d_nodes = data.nodes.filter(function(d) {return d.degree >= MIN_NODE_DEGREE})
    console.log({d_nodes})

    NUM_NODES = d_nodes.length;

    var allIDs = [];
    for (var i = 0; i < d_nodes.length; i++) { 
        let id = d_nodes[i].id
        if (allIDs.indexOf(id) == -1){ allIDs.push(id); }
    }
    console.log({allIDs})

    var d_links = [];
    data.links.filter(function(l) {
        if ( allIDs.indexOf(l.source) > -1 && allIDs.indexOf(l.target) > -1) {
            if (d_links.indexOf(l) == -1){
                d_links.push(l);
            }
        }
    })
    console.log({d_links})
    
    // Update GUI Info
    $('#number_of_nodes').val(NUM_NODES);
    $('#r_value').val(R);

    // Create the svg element:
    svg = d3.select("div.svg_container")
        .append("svg")
            //Allow avg to be manipulated (zoom and move around with mouse)
            .call(d3.zoom().on("zoom", function (event) {
                svg.attr("transform", event.transform);
            }))
            .attr('class', "svg")
            .attr("width", W_WIDTH * 2 )
            .attr("height", W_HEIGHT * 2)
            // If we don't group all elements with "g" we have zooming problems
            .append("g");
            
    // Add the outline circle
    svg.append('circle')
        .attr('class', "outline")
        .attr('cx', W_WIDTH)
        .attr('cy', W_HEIGHT)
        .attr('r', R * ZOOM_R)
        .attr('stroke', 'black')
        .attr('stroke-width', '0.1px')
        .attr('fill', CIRCLE_COLOR);

    let links = svg
        .selectAll("line")
        .data(d_links)
        .enter()
        .append("line")
            .style("stroke", "#aaaaaa9c")
            .attr('stroke-width', '1.0px');
    
    // Add tooltip div
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#fffbdf")
        .text("a simple tooltip");
    
    // Add nodes
    let nodes = svg
        .selectAll("circle.node")
        .data(d_nodes)
        .enter()
        .append("circle")
        .attr('class', "node")
            .style("fill", function(d){
                if (d.Category){
                    return DATA.category_pal[d.Category];
                } else {
                    return "#69b3a2";
                }
            }) 
            .attr('stroke', 'gray')
            .attr('stroke-width', '1px')
            // Get min and max degree 
            .each(function(d) { 
                d.degree = links.filter(function(l) {
                    return l.source == d.id || l.target == d.id;
                }).size();
                if (d.degree < minDegree) minDegree = d.degree;
                if (d.degree > maxDegree) maxDegree = d.degree;
            })
            // Add tooltip text in innerHTML
            .text(function(d) { return d.name + ": " + d.degree + " - " + d.Category + " - " + d.Country; })
            // Add listener to show tooltip on hover
            .on("mouseover", function(d){ 
                let current_node = d3.select(this).data()[0];
                tooltip.text(d.target.innerHTML);  
                tooltip.style("visibility", "visible");
                links.style("stroke", function(l){
                    if (current_node === l.source ||current_node === l.target) { return "#000";} 
                    else { return "#8f8f8f10"; }
                });
                links.style("stroke-width", function(l){
                    if (current_node === l.source || current_node === l.target) { return '0.3px';} 
                    else { return '0.2px'; }
                });
            })
            // Set tooltip visible location
            .on("mousemove", function(d){return tooltip.style("top", (d.pageY-30)+"px").style("left", (d.pageX+10)+"px");})
            // Remove tooltip
            .on("mouseout", function(){
                links.style("stroke-width", function(l){ return '0.05px'; });
                links.style("stroke", function(l){ return "#aaaaaa9c"; });
                return tooltip.style("visibility", "hidden");
            });

    // Create nodescaler function to keep relevant ration based on degree
    nodescale = d3.scaleSqrt()
        .domain( [minDegree, maxDegree] )
        .range( [MIN_NODE_SIZE, MAX_NODE_SIZE] ); // The desired desired range

    // Set the node size based on degree
    nodes.attr("r", function(d) { return newScale(d.degree); });

    // Create a force simulation to join nodes and links
    var simulation = d3.forceSimulation(d_nodes) // Force algorithm is applied to data.nodes
    .force("link", d3.forceLink()                // This force provides links between nodes
            .id(function(d) { return d.id; })    // This provide  the id of a node
            .links(d_links)                      // and this the list of links
    );
    
    // Create the legend
    legend = svg.append("g")
            .attr('class', 'legend')
    
    //console.log(data.category_pal);

    let step = 0
    for (let [key, value] of Object.entries(data.category_pal)) {
        //console.log({key: value});
        legend.append("circle")
            //.data({"cx": -10 + W_WIDTH+R*ZOOM_R, "cy": R + step + W_HEIGHT}).enter()
            .attr('class', 'c_legend')
            .attr("cx", -10 + W_WIDTH+R*ZOOM_R)
            .attr("cy", R + step + W_HEIGHT)
            .attr("r", 5)
            .style("fill", value)
        legend.append("text")
            .attr('class', 't_legend')
            .attr("x",  W_WIDTH+R*ZOOM_R)
            .attr("y", 4 + R + step + W_HEIGHT)
            .text(ACRONYMS[key])
            .style("font-size", "15px")
            .attr("alignment-baseline","middle")
        step += 15;
    }
            
    // Update all visible elements positions
    redraw();
}


// Update drawing...
function redraw(){
    update_window_size();
    console.log("redrawing...", MIN_NODE_SIZE);

    var svg = d3.select("div.svg_container");

    svg.attr("width", W_WIDTH * 2 )
        .attr("height", W_HEIGHT * 2);

    svg.select('circle.outline')
        .attr('cx', W_WIDTH)
        .attr('cy', W_HEIGHT)
        .attr('r', R * ZOOM_R);

    // Add the circle center
    svg.select('circle.center')
        .attr('cx', W_WIDTH + 1)
        .attr('cy', W_HEIGHT + 1)
        .attr('r', 0.2 * ZOOM_R);

    let nodes = svg.selectAll("circle.node")
        .attr("cx", function (d) { return estimate_x(d); })
        .attr("cy", function(d) { return estimate_y(d); })

    // Create node scale based on degree
    var nodescale = d3.scaleSqrt()
        .domain( [minDegree, maxDegree] )
        .range( [MIN_NODE_SIZE, MAX_NODE_SIZE] ); // Change this to your desired range
    // Update the node radius based on the node degree    
    nodes
        .attr("r", function(d) { return newScale(d.degree); }); //Math.log(d.degree) + 1;

    let links = svg.selectAll("line")
        .attr('stroke-width', '0.3px')
        .style("stroke", "#8f8f8f10") 
        .attr("x1", function(d) { return estimate_x(d.source); })
        .attr("y1", function(d) { return estimate_y(d.source); })
        .attr("x2", function(d) { return estimate_x(d.target); })
        .attr("y2", function(d) { return estimate_y(d.target); });
}


function toggle_links(){
    $('line').css('display', $('line').css('display') == 'none' ? 'block' : 'none');
}