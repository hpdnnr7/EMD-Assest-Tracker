$('document').ready(() => {
	
	// Handler to Add New Asset
	const table = $("#formTable tbody");
	let count = 1;

	$('#add').click(() => {
		count++;
		const newRow = `
		<tr index="${count}">
					<td><input id='asset_tag_no${count}' type='text'/></td>
					<td><input id='manufacturer_serial_no${count}' type='text'/></td>
					<td><input id='description${count}' type='text'/></td>
                    <td><input id='cost${count}' type='text'/></td>
                    <td><input id='po_no${count}' type='text'/></td>
                    <td><input id='department_division_head${count}' type='text'/></td>
					<td><button type="button" index="${count}" class="btn btn-danger btn-remove">X</button></td>
				</tr>
		`;

		table.append(newRow);

		// Handler to Remove New Asset
		$('.btn-remove').click(function(){
			let index = $(this).attr('index');
			$(`tr[index='${index}'`).remove();
		});
	});

	
	// Handler to Submit Data
	$('#submit').click(() =>{

		//Format all Data into JSON for Submission
		let data = [];

		// Iterate over all rows and store data
		for (let i = 1; i <= count; i++){

			// Skip Row if it was Removed
			if (!$(`tr[index=${i}]`).length) continue;

			// Store all Info from this row
			let assetInfo = {
				asset_tag_no: $(`#asset_tag_no${i}`).val(),
				manufacturer: $(`#manufacturer_serial_no${i}`).val(),
				descriptions: $(`#description${i}`).val(),
				costs: $(`#cost${i}`).val(),
				po_no: $(`#p.o._no${i}`).val(),
				department_division_head: $(`#department_division_head${i}`).val(),
			}

			// TODO: Check for Empty Inputs and Enforce Users to Fill out Fields
            
			// Add Info to array
			data.push(assetInfo);
		}

		//TODO: Upload JSON to Database
		console.log(data);

	})




})