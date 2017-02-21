$(document).ready( () => {
    $.getJSON("js/class.json", (data) => {
        const keys = Object.keys(data);
        const keyLength = keys.length;

        function addClass(name = "", instructor = "", days = "", time ="") {
            const id = keyLength + 1;
            
            data.push(
                {class2: {"id": id}}
            )
        }
        console.log(data.class2);
        // ADD CLASS: Form submit
        $('.submit-addClass').submit( () => {
            addClass();
        });
    })
    
});