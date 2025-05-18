const nama = document.getElementById('tugas');
const tombol = document.getElementById('tambah');
const list = document.getElementById('daftar');
const table = document.getElementById('table')
const tbody = document.getElementById('isiList');
const mencari = document.getElementById('gocari')
const filter = document.getElementById('filter');

let data = JSON.parse(localStorage.getItem('tugas'))||[];

mencari.addEventListener('click',function(e){
    e.preventDefault();
    tbody.innerHTML = ''
    const cari = document.getElementById('cari');
    const pencarian = cari.value;
    let hasil =data.filter(function(nama){
    if(nama.namaTugas.toLowerCase().includes(pencarian.toLowerCase())){
        return true;
        }else{
            return false;
        } 
    })
    render(hasil)
    
})


function render(data){
    tbody.innerHTML = ''
    data.forEach(function(nama,index){
    const row = document.createElement('tr');
        const tugas = document.createElement('td');
        const no = document.createElement('td');
        const stat = document.createElement('td');
        const action = document.createElement('td');
        const inputBaru = document.createElement('input');

        tugas.textContent = nama.namaTugas;
        no.textContent = index+1;
        const opt = document.createElement('select');
        const opt1 = document.createElement('option');
        opt1.textContent = 'On Progress';
        const opt2 = document.createElement('option');
        opt2.textContent = 'Done';
        
        opt.appendChild(opt1);
        opt.appendChild(opt2);
        opt.selectedIndex = nama.stats;

        stat.appendChild(opt);
        row.appendChild(no);
        row.appendChild(tugas);
        row.appendChild(stat);

        const hapus = document.createElement('button');
        hapus.innerHTML = '<i class="fa-solid fa-trash"></i>'
        action.appendChild(hapus);

        const edit = document.createElement('button');
        edit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
        action.appendChild(edit);

        const simpan = document.createElement('button');
        simpan.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>'
        action.appendChild(simpan);

        row.appendChild(action);
        tbody.appendChild(row);
        
        hapus.addEventListener('click', function(){
            data.splice(index,1);
            localStorage.setItem('tugas',JSON.stringify(data));
            render(data);
        });

        edit.addEventListener('click', function(){
            inputBaru.placeholder = 'Masukkan Nama';

            tugas.innerHTML = '';
            tugas.appendChild(inputBaru);
            
        })
        simpan.addEventListener('click',function(){
            if (inputBaru.value) {
            data[index].namaTugas = inputBaru.value;
            }
                data[index].stats = opt.selectedIndex;
                localStorage.setItem('tugas',JSON.stringify(data));
                inputBaru.replaceWith(nama.namaTugas)
                render(data);
            }) 
    })
    }
//Push Elemen Input Baru
tombol.addEventListener('click',function(e){
    e.preventDefault();
    const info ={
        namaTugas: nama.value,
        stats :0
    } 
    if((info.namaTugas != '')){
        data.push(info);        
        localStorage.setItem('tugas',JSON.stringify(data));
        render(data);
        nama.value =''
    }
})
render(data);
