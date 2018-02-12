// Description:
//   Juega cachipún (piedra|papel|tijera) contra tu hubot
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot cachipun piedra|papel|tijera
//
// Author:
//   @jorgeepunan

const tipos = {
  'piedra': {
    'papel': 'Papel envuelve piedra. *Perdiste*, LOSER.',
    'tijera': 'Piedra rompe tijera. *Ganaste* :wink:'
  },
  'papel': {
    'piedra': 'Papel envuelve piedra. *Weeeena* :wink:',
    'tijera': 'Tijera corta papel. *Chuuuuuuu*'
  },
  'tijera': {
    'papel': 'Tijeras cortan papel. *¡Súper!* :wink:',
    'piedra': 'Piedra rompe tijera. *¡Amermelao!*'
  }
};

const respuestas = function(msg, userChoice, robot) {
  let resultado;
  const choices = ['piedra','papel','tijera'];
  const i = Math.floor(Math.random() * choices.length);
  const choice = choices[i];
  const seleccion = tipos[userChoice];

  if (seleccion[choice] != null) { // user wins
    resultado = tipos[userChoice][choice];
  } else { // hubot wins
    resultado = tipos[choice][userChoice];
  }

  if (!resultado) { resultado = "*¡Empate!*"; }

  msg.send(`${robot.name} escoge ${choice}`);
  
  return msg.send(resultado);
};

module.exports = robot =>
  robot.respond(/cachip[uú]n (piedra|papel|tijera)/i, function(msg) {
    const userChoice = msg.match[1].toLowerCase();
    return respuestas(msg, userChoice, robot);
  })
;
