class User {
      constructor(username, password) {
            this.username = username;
            this.password = password;
      }
}

class Game {
      constructor() {
            this.users = [];
            this.choices = ['piedra', 'papel', 'tijera'];
            this.currentUser = null;
      }

      register(username, password) {
            const user = new User(username, password);
            localStorage.setItem(username, password);
            this.users.push(user);
            alert('Registro exitoso');
      }

      login(username, password) {
            if (localStorage.getItem(username) === password) {
                  this.currentUser = username;
                  alert('Inicio de sesión exitoso');
                  document.getElementById('game').style.display = 'block';
            } else {
                  alert('Usuario o contraseña incorrectos');
            }
      }

      play(userChoice) {
            let computerChoice = this.choices[Math.floor(Math.random() * 3)];
            let result = '';
            if (userChoice === computerChoice) {
                  result = 'Empate';
            } else if (
                  (userChoice === 'piedra' && computerChoice === 'tijera') ||
                  (userChoice === 'papel' && computerChoice === 'piedra') ||
                  (userChoice === 'tijera' && computerChoice === 'papel')
      ) {
            result = 'Ganaste';
            } else {
            result = 'Perdiste';
            }
            return `Elegiste ${userChoice}, la computadora eligió ${computerChoice}. ${result}!`;
      }
}

const game = new Game();

document.getElementById('login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;
      game.login(username, password);
});

document.getElementById('register-form').addEventListener('submit', function (e) {
      e.preventDefault();
      let newUsername = document.getElementById('new-username').value;
      let newPassword = document.getElementById('new-password').value;
      game.register(newUsername, newPassword);
});

let choices = document.querySelectorAll('.choice');
let resultDiv = document.getElementById('result');

choices.forEach(choice => {
      choice.addEventListener('click', function () {
            let userChoice = this.getAttribute('data-choice');
            let result = game.play(userChoice);
            resultDiv.innerHTML = result;
      });
});
