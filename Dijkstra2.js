///////////////////////////////////////////////////////////////////////////////
//
// Dijkstra's Algorithm in JavaScript
//
// By: Nathan Sherburn
// Date: 23/12/2014
//
///////////////////////////////////////////////////////////////////////////////

// Inputs
///////////////////////////////////////////////////////////////////////////////

// Define the graph
var graph = {
	"A": {
		"B": 11,
		"C": 4
	},
	"B": {
		"D": 2,
		"A": 11
	},
	"C": {
		"D": 3
	},
	"D": {
		"B": 2,
		"C": 3
	}
};

// Starting node
var sourceNode = "C";

// Helper functions
///////////////////////////////////////////////////////////////////////////////

// Find the node in the Q with minimum distance
var minDistNode = function (queue, distances) {
	var node; // current node
	var index; // index of node with minimum distance
	var min = Infinity; // minimum distance

	for (i in queue) { // loop through each node in queue
		node = queue[i]
		if (distances[node] < min) { // update min and index if new min found
			index = i;
			min = distances[node];
		}
	}
	return queue[index]; // return name of node with min distance
};

// Main function
///////////////////////////////////////////////////////////////////////////////

// Return distances and shortest path to each node
var dijkstra = function (graph, source) {
	var nodeNames = Object.keys( graph ); // eg. [A, B, C ... ]
	var distance = {}; // shortest dist to each - eg. {A: 10, B: 20, C: 45 ... }
	var previous = {}; // shortest path - eg. {A: undef, B: A, C: B ... }
	var Q = []; // nodes left to check - eg. [A, B, C ... ]

	// initialize distance, previous and Q
	for (var i in nodeNames) {
		var nodeName = nodeNames[i];
		distance[nodeName] = Infinity; // initially all distances = inf
		previous[nodeName] = undefined; // shortest path to each node is not known
		Q.push(nodeName); // add  all nodes to the queue
	};

	distance[source] = 0; // source -> source = 0
	
	while ( Object.keys( Q ).length > 0 ) { // analyse all nodes in queue
		var u = minDistNode(Q, distance); // find the node with the min dist in Q

		Q.splice(Q.indexOf(u), 1); // remove node with shortest distance from Q

		for (neighbour in graph[u]) { // look at every neighbour of closest node
			var alternative = distance[u] + graph[u][neighbour];	// find dist to
																														// neighbour from
																														// current node
			if (alternative < distance[neighbour]) { // alt dist < current dist?
				distance[neighbour] = alternative;
				previous[neighbour] = u;	// set current node as prev step in shortest path
			 														// to neighbour
			};
		};
	};

	// log results to console
	console.log("Distances:");
	console.log(distance);
	console.log("Path:");
	console.log(previous);
};

// Run
///////////////////////////////////////////////////////////////////////////////

dijkstra(graph, sourceNode);

