$('document').ready(() => {
	
	// Handler to Add New Asset
	const table = $("#formTable tbody");
	const firsttable = $("#firstTable");
	let count = 1;
	

	$('#add').click(() => {
		
		const newRow = `
					<tr index="${count}">
					<td><input id='asset_tag_no${count}' type='text'/></td>
					<td><input id='manufacturer_serial_no${count}' type='text'/></td>
					<td><input id='description${count}' type='text'/></td>
                    <td><input id='cost${count}' type='text'/></td>
                    <td><input id='po_no${count}' type='text'/></td>
                    <td><input id='remarks${count}' type='text'/></td>
					<td><button type="button" index="${count}" class="btn btn-danger btn-remove">X</button></td>



					
				</tr>
		`;

		table.append(newRow);
		

		// Handler to Remove New Asset
		$('.btn-remove').click(function(){
			let index = $(this).attr('index');
			$(`tr[index='${index}'`).remove();
		});

		count++;
	});

	

	// Handler to Submit Data
	$('#submit').click(() =>{
		//Checks if all heading information is filled out
		const date = document.getElementById('date_out').value;
		const department = document.getElementById('department_out').value;
		const division = document.getElementById('division_out').value;
		const resp_ctr = document.getElementById('resp_out').value;
		const prop_ctr = document.getElementById('prop_out').value;
		const dep_head = document.getElementById('dhead_out').value;
		
		if (date == '') {
			alert('The Date section can not be left blank');
		}
		
		if (department == '') {
			alert('Department section can not be left blank');
		}
		if (division == '') {
			alert('Division section can not be left blank');
		}
		
		if (resp_ctr == '') {
			alert('Resp. Ctr section can not be left blank');
		}

		if (prop_ctr == '') {
			alert('Property Control Office section can not be left blank');
		}

		if (dep_head == '') {
			alert('Department/Division Head section can not be left blank');
		}

		//Format all Data into JSON for Submission
		let data = [];

		// Iterate over all rows and store data
		for (let i = 1; i <= count; i++){

			// Skip Row if it was Removed
			if (!$(`tr[index=${i}]`).length) continue;

			// Store all Info from this row
			let assetInfo = {
				x: $(`department${i}`).val(),
				asset_tag_no: $(`#asset_tag_no${i}`).val(),
				manufacturer: $(`#manufacturer_serial_no${i}`).val(),
				descriptions: $(`#description${i}`).val(),
				costs: $(`#cost${i}`).val(),
				po_no: $(`#po_no${i}`).val(),
				remarks: $(`#remarks${i}`).val(),


				// date:$(`#date${i}`).val(),
				// department: $(`#department${i}`).val(),
				// division: $(`#division${i}`).val(),
				// resp_ctr: $(`#resp_ctr${i}`).val(),
				// property_control: $(`#property_control${i}`).val(),
				// department_division: $(`#department_division${i}`).val(),

				

			}


			// TODO: Check for Empty Inputs and Enforce Users to Fill out Fields
					
					if (assetInfo.asset_tag_no == '') {
						console.log(assetInfo.asset_tag_no);
						alert('Asset Tag Number can not be left blank');
					}
					if (assetInfo.manufacturer == ''){  
						alert('Manufacturer Serial Number can not be left blank');
					}
					if (assetInfo.descriptions == ''){  
						alert('The Description can not be left blank');
					}
					if (assetInfo.costs == ''){  
						alert('The Cost can not be left blank');
					}  
					if (assetInfo.po_no == ''){  
						alert('The P.O Number/ Document Number can not be left blank');
					}   
					if (assetInfo.remarks == ''){  
						alert('The Remarks can not be left blank');
					}
					if (assetInfo.asset_tag_no && assetInfo.manufacturer && assetInfo.descriptions && assetInfo.costs && assetInfo.po_no && assetInfo.department_division_head != ''){  
						alert('Submission Accepted');
					
			// Add Info to array
				data.push(assetInfo);
					}
				}	

		//TODO: Upload JSON to Database
		console.log(data);

	})




})