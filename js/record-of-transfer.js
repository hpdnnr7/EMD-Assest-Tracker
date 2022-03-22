$('document').ready(() => {


	
	// Handler to Add New Asset
	const table = $("#formTable tbody");

	let count = 1;
	

	$('#add').click(() => {
		
		const newRow = `
					<tr index="${count}">
					<td><input id='asset_tag_no${count}' type='text'/></td>
					<td><input id='manufacturer_serial_no${count}' type='text'/></td>
					<td><input id='description${count}' type='text'</input></td>
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
		$('form').on('submit', function(e){
			e.preventDefault();

		//Checks if all heading information is filled out
		const date_out = document.getElementById('date_out').value;
		const department_out = document.getElementById('department_out').value;
		const division_out = document.getElementById('division_out').value;
		const resp_out = document.getElementById('resp_out').value;
		const prop_out = document.getElementById('prop_out').value;
		const dhead_out = document.getElementById('dhead_out').value;
		
		const date_in = document.getElementById('date_in').value;
		const department_in = document.getElementById('department_in').value;
		const division_in = document.getElementById('division_in').value;
		const resp_in = document.getElementById('resp_in').value;
		const prop_in = document.getElementById('prop_in').value;
		const dhead_in = document.getElementById('dhead_in').value;

		
/*
		let errorMessage = '';
		$('#errorDiv').html(errorMessage);

		if ((date_out == '') || (date_in == '')) {
			errorMessage += '<p>The Date section can not be left blank</p>';
			//alert('The Date section can not be left blank');
		}

		if ((department_out == '') || (department_in == '')) {
			//alert('The Department section can not be left blank');
		}
		if ((division_out == '') || (division_in == '')) {
			//alert('The Division section can not be left blank');
		}
		
		if ((resp_out == '') || (resp_in == '')) {
			//alert('Resp. Ctr section can not be left blank');
		}

		if ((prop_out == '') || (prop_in == '')) {
			//alert('Property Control Office section can not be left blank');
		}

		if ((dhead_out == '') || (dhead_in == '')) {
			//alert('Department/Division Head section can not be left blank');
		}
*/
		//Format all Data into JSON for Submission
		let data = [];

		// Iterate over all rows and store data
		for (let i = 1; i <= count; i++){

			// Skip Row if it was Removed
			if (!$(`tr[index=${i}]`).length) continue;

			// Store all Info from this row
			let assetInfo = {

				date_out: $(`#date_out${i}`).val(),
				department_out: $(`#department_out${i}`).val(),
				division_out: $(`#divison_out${i}`).val(),
				resp_out: $(`#resp_out${i}`).val(),
				prop_out: $(`#prop_out${i}`).val(),
				dhead_out: $(`#dhead_out${i}`).val(),
				
				date_in: $(`#date_in${i}`).val(),
                department_in: $(`#department_in${i}`).val(),
                division_in: $(`#divison_in${i}`).val(),
                resp_in: $(`#resp_in${i}`).val(),
                prop_in: $(`#prop_in${i}`).val(),
                dhead_in: $(`#dhead_in${i}`).val(),

				asset_tag_no: $(`#asset_tag_no${i}`).val(),
				manufacturer: $(`#manufacturer_serial_no${i}`).val(),
				descriptions: $(`#description${i}`).val(),
				costs: $(`#cost${i}`).val(),
				po_no: $(`#po_no${i}`).val(),
				remarks: $(`#remarks${i}`).val(),

			}


			// TODO: Check for Empty Inputs and Enforce Users to Fill out Fields
			/*
			if (assetInfo.asset_tag_no == '') {
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
			*/
			

		/*
			if (errorMessage != ''){
				$('#errorDiv').html(errorMessage);
				// Code to display error message on page
			}
			else{
				// Submit and show success message
			}
		*/
			
		if (assetInfo.asset_tag_no && assetInfo.manufacturer && assetInfo.descriptions && assetInfo.costs && assetInfo.po_no && assetInfo.remarks  != ''){  
			data.push(assetInfo);
			// alert('Submission Accepted');
			
			// Add Info to array
			
		}
	
		
			
		}
	
		
	//TODO: Upload JSON to Database
			
			console.log(data);
		});
	});
})

