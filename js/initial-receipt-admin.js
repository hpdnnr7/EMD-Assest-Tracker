// Write a function that takes an id number (example EMD-5002)
// and returns only the number part in integer form
// so myFunc("EMD-5002") returns 5002 (as an integer)

const getNumber = id => {
  var num = id.replace(/[^0-9]/g,'');
  console.log(num())

}
console.log(getNumber('EMD-5002'));
$('document').ready(() => {
    $.get("http://localhost:3000/assets/", (data) => {
		
      // find the `.description` element and set it's value 
      if (data){
        console.log(data.sort((a,b) => getNumber(a.id) < getNumber(b.id) ? -1 : 1)[data.length-1].id);
      }

      //console.log(data)
    })

    console.log(num(getNumber('EMD-5002')));

    
    //   // Handler to Save Data   
    //     $('#save').click(() => {
    //         let info = getInfo();
    //         console.log(info);

    //         // If there is no data to submit
    //         if (!info) return;

    //         // If we are saving for the first time, POST new data
    //         //FUNCTION STARTS HERE
    //         saveOrSubmit(info);
    //         // FUNCTION ENDS HERE

            
    // })
    
    
})
