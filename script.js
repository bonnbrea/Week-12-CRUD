var crudApp = new function () {

    
// starting the table with some books already filled in. These can also be updated and deleted. 

    this.myBooks = [
        { ID: '1', Book_Title: 'It Ends With Us', Genre: 'Romance', Rating: 6 },
        { ID: '2', Book_Title: 'Dune', Genre: 'Fiction', Rating: 9 },
        { ID: '3', Book_Title: 'A Court of Thorns and Roses', Genre: 'Fiction', Rating: 8.5 }
    ]

    this.genre = ['Romance', 'Fiction', 'Non-Fiction', 'Horror'];
    this.col = [];


    // Create table function

    this.createTable = function () {

   // Extract value for table header.

        for (var i = 0; i < this.myBooks.length; i++) {
            for (var key in this.myBooks[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }


    // Start to create our table 
        var table = document.createElement('table');
        table.setAttribute('id', 'booksTable');     



    // create table row for the header
        var tr = table.insertRow(-1);               

        for (var h = 0; h < this.col.length; h++) {
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

    // Add table rows using JSON data.
        for (var i = 0; i < this.myBooks.length; i++) {


    // insert table row
            tr = table.insertRow(-1);          

            for (var j = 0; j < this.col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.myBooks[i][this.col[j]];
            }

    // create and add elements to table cells with events.

            this.td = document.createElement('td');



            // write cancel option
            tr.appendChild(this.td);
            var lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            lblCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancel');
            lblCancel.setAttribute('id', 'lbl' + i);
            this.td.appendChild(lblCancel);




            // write save option (attributes, events such as 'onclick')
            tr.appendChild(this.td);
            var btSave = document.createElement('input');

            btSave.setAttribute('type', 'button');      
            btSave.setAttribute('value', 'Save');
            btSave.setAttribute('id', 'Save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudApp.Save(this)');       
            this.td.appendChild(btSave);






            // write update option (attributes, events such as 'onclick')
            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');

            btUpdate.setAttribute('type', 'button');    
            btUpdate.setAttribute('value', 'Update');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#f0c882;');
            btUpdate.setAttribute('onclick', 'crudApp.Update(this)');   
            this.td.appendChild(btUpdate);








            // write delete option (attributes, events such as 'onclick')
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
            btDelete.setAttribute('value', 'Delete');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudApp.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btDelete);
        }









        //now I add in the blank table row to add in new books

        tr = table.insertRow(-1);           

        for (var j = 0; j < this.col.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {

                if (j == 2) {   

                    // add in a dropdown list for genre options

                    var select = document.createElement('select');      
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < this.genre.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + this.genre[k] + '">' + this.genre[k] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                else {

                    // add in a text box

                    var tBox = document.createElement('input');          
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        var btNew = document.createElement('input');

        btNew.setAttribute('type', 'button');      
        btNew.setAttribute('value', 'Create');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#74e0f6;');
        btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');       
        this.td.appendChild(btNew);

        var div = document.getElementById('container');
        div.innerHTML = '';
        // add in the table
        div.appendChild(table);    
    };

    // operations

    // cancel option
    this.Cancel = function (oButton) {

    
        oButton.setAttribute('style', 'display:none; float:none;');

        var activeRow = oButton.parentNode.parentNode.rowIndex;

        // hide the save button
        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        // show update button
        var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#f0c882;');

        var tab = document.getElementById('booksTable').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.myBooks[(activeRow - 1)][this.col[i]];
        }
    }


    // edit data
    this.Update = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('booksTable').rows[activeRow];

    // showing the dropdown menu for genre options
        for (i = 1; i < 4; i++) {
            if (i == 2) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');      // DROPDOWN LIST.
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.genre.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.genre[k] + '">' + this.genre[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');      // TEXTBOX.
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

    // hide the button
        oButton.setAttribute('style', 'display:none;');
    };


    // delete option
    this.Delete = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        //delete the currently active row
        this.myBooks.splice((activeRow - 1), 1);  
        // refresh the table
        this.createTable();                         
    };

    // save option
    this.Save = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('booksTable').rows[activeRow];

    // updating the array with values
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {  // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                this.myBooks[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;      // SAVE THE VALUE.
            }
        }
    //refresh the table
        this.createTable();     
    }

    // create option
    this.CreateNew = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('booksTable').rows[activeRow];
        var obj = {};

    // adding to the array
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {      // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                var txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                }
                else {
                    obj = '';
                    alert('all fields are compulsory');
                    break;
                }
            }
        }
        // new ID when adding a book
        obj[this.col[0]] = this.myBooks.length + 1;     

        if (Object.keys(obj).length > 0) {      // is the object empty?
            this.myBooks.push(obj);             // push data to the array
            this.createTable();                 // refresh our table
        }
    }

}

crudApp.createTable();