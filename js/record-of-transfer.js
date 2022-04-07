const getAssetInfo = (assetTag, index) => {
    // if (assetTag.length >= 4){

    // get the table row that this input is in
    $.get("http://localhost:3000/assets/" + assetTag , (data) => {
		
      // find the `.description` element and set it's value 
      if (data){
        $(`#manufacturer_serial_no${index}`).val(data.serial_no);
        $(`#description${index}`).val(data.description);
        $(`#cost${index}`).val(data.cost);
        $(`#po_no${index}`).val(data.po_no);
      }

      console.log(data)
    })
      
    .fail(() => {
        if (`#asset_tag_no` != assetTag ){
            console.log('Unable to locate ID in database');
        $(`#manufacturer_serial_no${index}`).val("");
        $(`#description${index}`).val("");
        $(`#cost${index}`).val("");
        $(`#po_no${index}`).val("");
        }
    });
// } else {
//  	console.log('not enough characters to call API endpoint');
// 	}
};
	
//   });
    



$('document').ready(() => {
    

    // Handler to Add New Asset
    const table = $("#formTable tbody");
    let count = 1; 
    let CURRENT_ID;

    const getInfo = () =>{
        let data = {
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
        };

        let assets = [];
        // Iterate over all rows and store data
        for (let i = 1; i <= count; i++){

            // Skip Row if it was Removed
            if (!$(`tr[index=${i}]`).length) continue;

            // Store all Info from this row
            let assetInfo = {

				// date_out: $(date_out).val(),
				// department_out: $(department_out).val(),
				// division_out: $(division_out).val(),
				// resp_out: $(resp_out).val(),
				// location_out: $(location_out).val(),
				// prop_out: $(prop_out).val(),
				// dhead_out: $(dhead_out).val(),
				
				// date_in: $(date_in).val(),
				// department_in: $(department_in).val(),
				// division_in: $(division_in).val(),
				// resp_in: $(resp_in).val(),
				// location_in: $(location_in).val(),
				// prop_in: $(prop_in).val(),
				// dhead_in: $(dhead_in).val(),

                asset_tag_no: $(`#asset_tag_no${i}`).val(),
                manufacturer: $(`#manufacturer_serial_no${i}`).val(),
                descriptions: $(`#description${i}`).val(),
                costs: $(`#cost${i}`).val(),
                po_no: $(`#po_no${i}`).val(),
                remarks: $(`#remarks${i}`).val(),

            }

            if (assetInfo.asset_tag_no && assetInfo.manufacturer && assetInfo.descriptions && assetInfo.costs && assetInfo.po_no  != ''){  
                // Add Info to array
                assets.push(assetInfo);
                    
            }   
            else{
                return;
            }

        }
        data.assets = assets;
        return data;
    }

      

    $('#add').click(() => {
        
        //oninvalid="this.setCustomValidity('Asset Tag Number is Invalid')"
        const newRow = `
        
        
                        
                    <tr index="${count}">
                    <form>
                    <td><input 
                    class="asset-tag" id='asset_tag_no${count}' type='text' 
					
                    onkeyup = "getAssetInfo(this.value,${count})";
        
                    bottom required /></td> 
                    
                    <td><input  class="serial-no" id='manufacturer_serial_no${count}' type='text' bottom required readonly/></td>
                    <td><textarea class="description" id='description${count}' type='text' bottom required readonly description></textarea></td>
                    <td><input id='cost${count}' type='value' bottom require readonly/></td>
                    <td><input id='po_no${count}' type='text' bottom require readonly/></td>
                    <td><textarea id='remarks${count}' type='text' bottom remarks></textarea></td>
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

    
      // Handler to Save Data   
        $('#save').click(() => {
            let info = getInfo();
            console.log(info);

            // If there is no data to submit
            if (!info) return;

            // If we are saving for the first time, POST new data
            if (!CURRENT_ID){
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/transfers",
                    data: JSON.stringify(info),
                    contentType: "application/json"
                })
                .done(function( data ){
                    CURRENT_ID = data.id;

                });
            }

            // If we already have an ID, then update the existing data
            else{
                $.ajax({
                    type: "PATCH",
                    url: `http://localhost:3000/transfers/${CURRENT_ID}`,
                    data: JSON.stringify(info),
                    contentType: "application/json"
                })
                .done(function( data ){
                    console.log(data);

                });


            }


            
    })
    

    // Handler to Submit Data
    $('form').on('submit', function(e){
        e.preventDefault();

		fetch('http://localhost:3000/transfers').then(res => console.log.json(res))
		var parsedData = JSON.parse('');
		console.log(parsedData.transfers[0].id)


	//Changing Status 

	$.ajax({ 
		type: "PATCH",
		url: `http://localhost:3000/transfers/`,
		status: JSON.stringify(data),
		
		
	});

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
    let data = getInfo();
/*
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

    if (assetInfo.asset_tag_no && assetInfo.manufacturer && assetInfo.descriptions && assetInfo.costs && assetInfo.po_no  != ''){  
        // Add Info to array
        data.push(assetInfo);
            
    }   
    else{
        return;
    }

}   */
    if (data) // Submit Data
    
    console.log(data);
    alert('Submission Accepted');
    });

    
})