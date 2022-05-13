const getAssetInfo = (assetTag, index) => {
    // if (assetTag.length >= 4){

    // get the table row that this input is in
    $.get("http://localhost:3000/assets/" + assetTag , (data) => {
		
      // find the `.description` element and set it's value 
      if (data){
        $(`#manufacturer_serial_no${index}`).val(data.serial_no);
        $(`#description${index}`).val(data.description);

      }

      console.log(data)
    })
      
    .fail(() => {
        if (`#asset_tag_no` != assetTag ){
            console.log('Unable to locate ID in database');
        $(`#manufacturer_serial_no${index}`).val("");
        $(`#description${index}`).val("");
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
        $.get(`http://localhost:3000/disposals/${id}`)
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
			$('#date').val(data.date);
			$('#department').val(data.department);
			$('#location').val(data.location);
			$('#resp_ctr').val(data.resp_ctr);
    };

    const getInfo = () =>{
        let data = {
            date: $('#date').val(),
            department: $('#department').val(),
            location: $('#location').val(),
			resp_ctr:$('#resp_ctr').val(),
        };


        let assets = [];

        // Iterate over all rows and store data
        for (let i = 1; i <= count; i++){

            // Skip Row if it was Removed
            if (!$(`tr[index=${i}]`).length) continue;

            

            // Store all Info from this row
            let assetInfo = {
                asset_tag_no: $(`#asset_tag_no${i}`).val(),
            }

            if (assetInfo.asset_tag_no){  
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
                url: "http://localhost:3000/disposals",
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
                url: `http://localhost:3000/disposals/${CURRENT_ID}`,
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
    
        <td class="show"><input ${info ? 'value =' + info.asset_tag_no : ""}
        class="asset-tag" id='asset_tag_no${count}' type='text' 
        onkeyup = "getAssetInfo(this.value,${count})";
        bottom required /></td> 
                        <td class="show"><input id='manufacturer_serial_no${count}' type='text' bottom required/></td>
                        <td class="show"><textarea id='description${count}' type='text' description <textarea/></td>
                        <td class="show"><input id='cost${count}' type='value'/></td>
                        <td class="show"><input id='po_no${count}' type='text' /></td>
                        <td class="show"><input id='rc_to_credit${count}' type='text'/></td>
                        <td class="show"><textarea id='remark${count}' type='text' remark <textarea/></td>
                        <td class="show"><button type="button" index="${count}" class="btn btn-danger btn-remove">X</button></td>
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
        let data = getInfo();

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






















	
