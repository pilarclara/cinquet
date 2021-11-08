document.addEventListener('click',yourFunction )

const yourFunction = () => {
    alert('jioj');
    wait (5000);
    console.log("Waited 5s");
  
    wait(5000);
    console.log("Waited an additional 5s");
  };

  function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }