

function login() {
    var username = document.getElementsByName('uname')[0].value;
    var password = document.getElementsByName('psw')[0].value;

    var users = JSON.parse(localStorage.getItem('users')) || {};

    if (users.hasOwnProperty(username)) {
        if (users[username] === password) {
            alert('Login successful! Welcome ' + username);
            if (username.startsWith('admin')) {
                window.location.href = 'admin-home.html';
            } else {
                window.location.href = 'user-home.html?username=' + encodeURIComponent(username);
            }
            return false; 
        } else {
            alert('Incorrect password');
        }
    } else {
        alert('User not found');
    }

    return false; 
}

function signup() {
    var username = document.getElementsByName('Username')[0].value;
    var email = document.getElementsByName('email')[0].value;
    var password = document.getElementsByName('psw')[0].value;

    if (!username || !email || !password) {
        alert('Please fill in all fields.');
        return false; 
    }

    var users = JSON.parse(localStorage.getItem('users')) || {};
    if (users.hasOwnProperty(username)) {
        alert('Username already exists. Please choose a different one.');
        return false;
    }

    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign up successful! Please log in.');
    return false; 
}
function populateUserTable() {
    var users = JSON.parse(localStorage.getItem('users')) || {};

    var userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    for (var username in users) {
        var password = users[username];

        var row = document.createElement('tr');
        row.innerHTML = '<td>' + username + '</td>' +
                        '<td>' + password + '</td>' +
                        '<td><a class="edit-btn" href="#" onclick="openPopup(\'' + username + '\', \'' + password + '\')">Edit</a></td>';

        userTableBody.appendChild(row);
    }
}

populateUserTable();

function openPopup(username, password) {
    document.getElementById('edit-username').value = username;
    document.getElementById('edit-password').value = password;
    document.querySelector('.popup').style.display = 'block';
}

function closePopup() {
    document.querySelector('.popup').style.display = 'none';
}
function saveChanges() {
    var editedUsername = document.getElementById('edit-username').value;
    var newPassword = document.getElementById('edit-password').value;

    var tableRows = document.getElementById('userTableBody').rows;
    for (var i = 0; i < tableRows.length; i++) {
        if (tableRows[i].cells[0].innerHTML === editedUsername) {
            tableRows[i].cells[1].innerHTML = newPassword;
            break;
        }
    }

    var users = JSON.parse(localStorage.getItem('users')) || {};
    if (users.hasOwnProperty(editedUsername)) {
        users[editedUsername] = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
    }

    closePopup();
}

populateUserTable();

    
