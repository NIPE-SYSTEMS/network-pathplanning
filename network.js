var uuid = require("node-uuid").v4;

var nodes = [];

var networkSearchUUID = function(nodes, uuid)
{
	for(var i = 0; i < nodes.length; i++)
	{
		if(nodes[i].uuid == uuid)
		{
			return i;
		}
	}
	
	return -1;
};

var networkInsert = function()
{
	var newNode =
	{
		uuid: uuid(),
		connectedTo: [],
		nodePrice: 0,
		previous: 0
	};
	
	nodes.push(newNode);
	
	return newNode.uuid;
};

var networkConnectBoth = function(uuid0, uuid1, price)
{
	var uuid0Index = networkSearchUUID(nodes, uuid0);
	var uuid1Index = networkSearchUUID(nodes, uuid1);
	
	// connect both nodes
	networkConnectSingleByIndex(uuid0Index, uuid1Index, price);
	networkConnectSingleByIndex(uuid1Index, uuid0Index, price);
};

var networkConnectSingle = function(uuidSource, uuidDestination, price)
{
	networkConnectSingleByIndex(networkSearchUUID(nodes, uuidSource), networkSearchUUID(nodes, uuidDestination), price);
};

var networkConnectSingleByIndex = function(indexSource, indexDestination, price)
{
	if(indexSource == -1 || indexDestination == -1 || !nodes[indexSource] || !nodes[indexDestination])
	{
		// indices are invalid
		return;
	}
	
	for(var i = 0; i < nodes[indexSource].connectedTo.length; i++)
	{
		if(nodes[indexSource].connectedTo[i].nodeIndex == indexDestination)
		{
			// connection exists already and will be skipped
			return;
		}
	}
	
	// connect source node with destination node
	nodes[indexSource].connectedTo.push({ nodeIndex: indexDestination, price: price });
};

var networkPrint = function()
{
	console.log(JSON.stringify(nodes, null, "\t"));
};

var networkGetNodes = function()
{
	return nodes;
};

module.exports.searchUUID = networkSearchUUID;
module.exports.insert = networkInsert;
module.exports.connectBoth = networkConnectBoth;
module.exports.connectSingle = networkConnectSingle;
module.exports.connectSingleByIndex = networkConnectSingleByIndex;
module.exports.print = networkPrint;
module.exports.getNodes = networkGetNodes;