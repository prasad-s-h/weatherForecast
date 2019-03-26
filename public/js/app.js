console.log('loaded js file')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#one');
const msg2 = document.querySelector('#two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msg1.textContent = 'Loading...';
    msg2.textContent = '';

    fetch(`/weather?address=${search.value}`).then( (response) => {
        response.json().then( (data)=>{
            if(data.error) {
                msg1.textContent = data.error;
                msg2.textContent = 'Please Search again';
            }else {
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        })
    });

});
