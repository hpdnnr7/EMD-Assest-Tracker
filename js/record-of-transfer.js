// const getAssetInfo = id => {
// 	$.get( "http://localhost:3000/assets/" + id, function( data ) {
// 		console.log(data);	
// 	});
// }

const getAssetInfo = (assetTag, index) => {
	// get the table row that this input is in
	const row = $(`tr [index=${index}]`);
  
	$.get("http://localhost:3000/assets/" + assetTag, (data) => {
	  // find the `.description` element and set it's value 
	  if (data){
		$(`#description${index}`).val(data.description);
	  }
	  else{
		$(`#description${index}`).val();
	  }
	  console.log(data);
	  
  
	  // find the `.serial-no` element and set it's value 
  
	  // ... add more finders and setters based on whatever else you're getting back from the data.
	});
};

$('document').ready(() => {


	// Handler to Add New Asset
	const table = $("#formTable tbody");
	let count = 1;

	$('#add').click(() => {
		
		const newRow = `
						
					<tr index="${count}">
					<form>
					<td><input class="asset-tag" id='asset_tag_no${count}' type='text' onkeyup = "getAssetInfo(this.value,${count});" bottom required /></td>	
					<td><input  class="serial-no" id='manufacturer_serial_no${count}' type='text' bottom required/></td>
					<td><textarea class="description" id='description${count}' type='text' bottom required description></textarea></td>
                    <td><input id='cost${count}' type='value' bottom required/></td>
                    <td><input id='po_no${count}' type='text' bottom required/></td>
                    <td><textarea id='remarks${count}' type='text' bottom required remarks></textarea></td>
					<td><button type="button" index="${count}" class="btn btn-danger btn-remove">X</button></td>
					</form>
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
	
	$('form').on('submit', function(e){
		e.preventDefault();

	//Checks if all heading information is filled out
	const date_out = "#date_out";
	const department_out = "#department_out";
	const division_out = "#division_out";
	const resp_out = "#resp_out";
	const location_out = "#location_out";
	const prop_out = "#prop_out";
	const dhead_out = "#dhead_out";
	
	const date_in = "#date_in";
	const department_in = "#department_in";
	const division_in = "#division_in";
	const resp_in = "#resp_in";
	const location_in = "#location_in";
	const prop_in = "#prop_in";
	const dhead_in = "#dhead_in";

	//Format all Data into JSON for Submission
	let data = [];

	// Iterate over all rows and store data
	for (let i = 1; i <= count; i++){

		// Skip Row if it was Removed
		if (!$(`tr[index=${i}]`).length) continue;

		// Store all Info from this row
		let assetInfo = {

			date_out: $(date_out).val(),
			department_out: $(department_out).val(),
			division_out: $(division_out).val(),
			resp_out: $(resp_out).val(),
			location_out: $(location_out).val(),
			prop_out: $(prop_out).val(),
			dhead_out: $(dhead_out).val(),
			
			date_in: $(date_in).val(),
			department_in: $(department_in).val(),
			division_in: $(division_in).val(),
			resp_in: $(resp_in).val(),
			location_in: $(location_in).val(),
			prop_in: $(prop_in).val(),
			dhead_in: $(dhead_in).val(),

			asset_tag_no: $(`#asset_tag_no${i}`).val(),
			manufacturer: $(`#manufacturer_serial_no${i}`).val(),
			descriptions: $(`#description${i}`).val(),
			costs: $(`#cost${i}`).val(),
			po_no: $(`#po_no${i}`).val(),
			remarks: $(`#remarks${i}`).val(),

		}

	/*
	Handler Function on any Asset Tag No. input
	which will query http://localhost:3000/assets/[asset_tag_no]
	and return the data if it is found in the database
	and autofill the rest of the fields
	
	Handler function should trigger during event listener for "on value change"
	*/


	if (assetInfo.asset_tag_no && assetInfo.manufacturer && assetInfo.descriptions && assetInfo.costs && assetInfo.po_no && assetInfo.remarks  != ''){  
		// Add Info to array
		data.push(assetInfo);
		
			
	}	
	else{
		return;
	}

	}
	console.log(data);
	alert('Submission Accepted');
	});
	
	
})

