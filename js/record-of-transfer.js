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
};
	



$('document').ready(() => {
    let CURRENT_ID;
    let CURRENT_STATUS = 'In-Progress';

    // Handler to Add New Asset
    const table = $("#formTable tbody");
    let count = 1; 

    // TODO: Set variable values from dashboard screen
    const id = new URLSearchParams(window.location.search).get('id');
    // If we have ID in the URL
    if (id){
        $.get(`http://localhost:3000/transfers/${id}`)
        .done(data => {
            CURRENT_ID = id;
            CURRENT_STATUS = data.status;
            // Autofill Fields here
            setInitialFields(data);
            console.log(data.assets);
            setTableFields(data.assets);
        })
        .fail(() =>{
            console.log("Failed");
        });

    }
    //Query transfers/id to get the information to autofill

    const setTableFields = 
    assets =>{
        assets.forEach(x => {
            addRow(x);
            getAssetInfo(x.asset_tag_no, count-1);
        });
            //$(assets).val(data.asset_tag_no);
     
        }
   
    const setInitialFields = 
    data =>{
        $(transfer_out_date).val(data.transfer_out_date);
        $(transfer_out_department).val(data.transfer_out_department);
        $(transfer_out_division).val(data.transfer_out_division);
        $(transfer_out_resp_ctr).val(data.transfer_out_resp_ctr);
        $(transfer_out_location).val(data.transfer_out_location);
        $(transfer_out_property_control_office).val(data.transfer_out_property_control_office);
        $(transfer_out_dept_division_head).val(data.transfer_out_dept_division_head);

        
        $(transfer_in_date).val(data.transfer_in_date);
        $(transfer_in_department).val(data.transfer_in_department);
        $(transfer_in_division).val(data.transfer_in_division);
        $(transfer_in_resp_ctr).val(data.transfer_in_resp_ctr);
        $(transfer_in_location).val(data.transfer_in_location);
        $(transfer_in_property_control_office).val(data.transfer_in_property_control_office);
        $(transfer_in_dept_division_head).val(data.transfer_in_dept_division_head);
    };

    const getInfo = () =>{
        let data = {
            transfer_out_date: $(transfer_out_date).val(),
            transfer_out_department: $(transfer_out_department).val(),
            transfer_out_dept_division: $(transfer_out_dept_division).val(),
            transfer_out_resp_ctr: $(transfer_out_resp_ctr).val(),
            transfer_out_location: $(transfer_out_location).val(),
            transfer_out_property_control_office: $(transfer_out_property_control_office).val(),
            transfer_out_dept_division_head: $(transfer_out_dept_division_head).val(),

            
            transfer_in_date: $(transfer_in_date).val(),
            transfer_in_department: $(transfer_in_department).val(),
            transfer_in_dept_division: $(transfer_in_dept_division).val(),
            transfer_in_resp_ctr: $(transfer_in_resp_ctr).val(),
            transfer_in_location: $(transfer_in_location).val(),
            transfer_in_property_control_office: $(transfer_in_property_control_office).val(),
            transfer_in_dept_division_head: $(transfer_in_dept_division_head).val(),
        };


        let assets = [];

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

      
    const saveOrSubmit = info => {

        info["status"] = CURRENT_STATUS;

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
    }

    const addRow = info => {
        const newRow = `
        
        
                        
        <tr index="${count}">
        <form>
    

        <td><input ${info ? 'value =' + info.asset_tag_no : ""}
        class="asset-tag" id='asset_tag_no${count}' type='text' 
        
        onkeyup = "getAssetInfo(this.value,${count})";

        bottom required /></td> 
        <td><input class="serial-no" id='manufacturer_serial_no${count}' type='text' bottom required readonly/></td>
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

    }

    $('#add').click(() => {
        addRow();
        //oninvalid="this.setCustomValidity('Asset Tag Number is Invalid')"
        
    });

    
      // Handler to Save Data   
        $('#save').click(() => {
            let info = getInfo();
            console.log(info);

            // If there is no data to submit
            if (!info) return;

            // If we are saving for the first time, POST new data
            //FUNCTION STARTS HERE
            saveOrSubmit(info);
            // FUNCTION ENDS HERE

            
    })
    

    // Handler to Submit Data

    // NOTES
    // 1. Take POST and PATCH from Save Button out and put in its own function so you can call it here
    // 2. Be mindful of if CURRENT_ID is set already or not
    $('form').on('submit', function(e){

        // Set Status to "awaiting approval"
        CURRENT_STATUS = 'Awaiting Approval';

        e.preventDefault();

    if (data){
        saveOrSubmit(data);
    }
    
    console.log(data);
    alert('Submission Accepted');
    });

    
})