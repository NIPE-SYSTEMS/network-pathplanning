var network = require("./network.js");

var planningGetLowestPrice = function(nodes)
{
	var price = Infinity;
	var index = 0;
	
	nodes.forEach(function(value, key, array)
	{
		if(value.price < price)
		{
			index = key;
		}
	});
	
	return index;
};

var planningPlan = function(nodes, sourceUUID, destinationUUID)
{
	var tempNodes = [];
	var choosenSourceNode = false;
	var currentNodeTempIndex = 0;
	var currentNodeIndex = 0;
	var newPrice = 0;
	var plannedPath = [];
	
	// initialization
	nodes.forEach(function(value, key, array)
	{
		if(value.uuid == sourceUUID)
		{
			value.nodePrice = 0;
			value.previous = null;
		}
		else
		{
			value.nodePrice = Infinity;
			value.previous = null;
		}
		
		tempNodes.push(value);
	});
	
	while(tempNodes.length > 0)
	{
		// calculate the node with the lowest price
		if(!choosenSourceNode) // first choose source node
		{
			currentNodeTempIndex = network.searchUUID(tempNodes, sourceUUID);
			choosenSourceNode = true;
		}
		else
		{
			currentNodeTempIndex = planningGetLowestPrice(tempNodes);
		}
		currentNodeIndex = network.searchUUID(nodes, tempNodes[currentNodeTempIndex].uuid);
		
		// removing found node from array
		tempNodes.splice(currentNodeTempIndex, 1);
		
		// generate prices for the neigbors
		nodes[currentNodeIndex].connectedTo.forEach(function(value, key, array)
		{
			newPrice = nodes[currentNodeIndex].nodePrice + value.price;
			if(newPrice < nodes[value.nodeIndex].nodePrice)
			{
				nodes[value.nodeIndex].nodePrice = newPrice;
				nodes[value.nodeIndex].previous = currentNodeIndex;
			}
		});
	}
	
	// calculate path
	currentNodeIndex = network.searchUUID(nodes, destinationUUID);
	while(nodes[currentNodeIndex] != null)
	{
		plannedPath.push(nodes[currentNodeIndex].uuid);
		currentNodeIndex = nodes[currentNodeIndex].previous;
	}
	
	return plannedPath.reverse();
};

module.exports.getLowestPrice = planningGetLowestPrice;
module.exports.plan = planningPlan;