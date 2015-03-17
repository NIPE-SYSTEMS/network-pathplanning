var uuid = require("node-uuid").v4;

var nodes = [];

function networkSearchUUID(uuid)
{
	for(var i = 0; i < nodes.length; i++)
	{
		if(nodes[i].uuid == uuid)
		{
			return i;
		}
	}
	
	return -1;
}

function networkInsert()
{
	var newNode =
	{
		uuid: uuid(),
		connectedTo: []
	};
	
	nodes.push(newNode);
	
	return newNode.uuid;
}

function networkConnectBoth(uuid0, uuid1, price)
{
	var uuid0Index = networkSearchUUID(uuid0);
	var uuid1Index = networkSearchUUID(uuid1);
	
	// connect both nodes
	networkConnectSingleByIndex(uuid0Index, uuid1Index, price);
	networkConnectSingleByIndex(uuid1Index, uuid0Index, price);
}

function networkConnectSingle(uuidSource, uuidDestination, price)
{
	networkConnectSingleByIndex(networkSearchUUID(uuidSource), networkSearchUUID(uuidDestination), price);
}

function networkConnectSingleByIndex(indexSource, indexDestination, price)
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
}

var A = networkInsert();
var B = networkInsert();
var C = networkInsert();
var D = networkInsert();
var E = networkInsert();

networkConnectBoth(A, B, 1);
networkConnectBoth(A, C, 2);
networkConnectBoth(B, E, 2);
networkConnectBoth(C, D, 1);
networkConnectBoth(B, C, 1);
networkConnectBoth(E, D, 1);

console.log(JSON.stringify(nodes, null, "\t"));