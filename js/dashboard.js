$('document').ready(() => {
	
	// Retrieve all User's Requests
	const openRequestsTable = $('#open-requests-table');
	$.get('http://localhost:3004/transfers')
	.done(data => {
		let rows = data.map(x=>{
			console.log(x);
			return `
				<tr>
					<td>Transfer</td>
					<td>${x.transfer_out_date}</td>
					<td class='request-status' data-status='${x.status}'>${x.status}</td>
					<td><a href='./transfer.html?id=${x.id}'><button class='btn btn-primary'>Open</button></a></td>
				</tr>
			`;
		});
		
		console.log(rows);
		rows.forEach(x => openRequestsTable.append(x));
		
	})
	.fail(() =>{
		console.log("Failed");
	});
	
	
});