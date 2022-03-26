/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
import * as readline from 'readline';
import {
  cyan,
  green,
  magenta,
  red,
  yellow,
} from 'chalk';
import { prompt } from 'inquirer';
import { draw } from 'terminal-img';
import { sleep } from './index';

const replies: string[] = [
  green.bold('Yes'),
  red.bold('No.'),
  magenta.bold('Hohoho'),
  yellow.bold('Bleugh'),
];

export async function poke() {
  if (Math.floor(Math.random() * 20) !== 1) {
    console.log(red.bold('*Ben is disappointed.*'));
    await sleep();
    return main();
  }
  console.log(red.bold('*Ben is almost dead, you poked him too hard.*'));
  await sleep();
  return main();
}

export async function talk() {
  await prompt({
    type: 'input',
    name: 'talking',
    message: 'Ben is listening...',
    validate(value) {
      const valid: boolean = value.length > 0;
      return valid || 'Ben has nothing to repeat. Please enter something.';
    },
  }).then((answers: any) => console.log(`${green.bold('Ben:')} ${answers.talking}`));
  await sleep();
  return main();
}

export async function call() {
  let calling: boolean = true;
  await prompt({
    type: 'input',
    name: 'talking',
    message: 'Question for Ben:',
    validate(value: any) {
      const valid: boolean = value.length > 0;
      return valid || 'Ben has nothing to answer. Please enter something.';
    },
  }).then(async (answers: any) => {
    if (Math.floor(Math.random() * 14) === 0) calling = false;
    if (calling && answers.talking.toLowerCase() !== 'hang up') {
      console.log(
        `${green.bold('Ben:')} ${replies[Math.floor(Math.random() * replies.length)]}\n`,
      );
      await sleep();
      return call();
    }
    if (!calling) {
      console.log(red.bold('*Ben slams the phone down.*'));
      await sleep();
      return main();
    }
    if (answers.talking.toLowerCase() === 'hang up') {
      console.log(magenta.bold('*Newspaper sounds.*'));
      await sleep();
      return main();
    }
  });
  await sleep(4000);
  return main();
}

export async function tickle() {
  console.log(`${green.bold('Ben:')} ${replies[2]}`);
  await sleep(3000);
  return main();
}

export async function appleJuice() {
  console.log(`${green.bold('Ben:')} *Glug, glug, glug*`);
  console.log(`\n${green.bold('*Ben loved the apple juice!*')}`);
  await sleep();
  return main();
}

export async function beans() {
  console.log(`${green.bold('Ben:')} *Glug, glug, glug*`);
  console.log(`\n${green.bold('*Ben chugs the beans!*')}`);
  await sleep();
  return main();
}

export async function burp() {
  console.log(`${green.bold('Ben:')} ${green.bold('*Burp*')}`);
  await sleep();
  return main();
}

export async function credits() {
  console.log(`
${magenta.bold('┏━━━━━━━━━━━━━━┓')}
${magenta.bold('┃')} Made with ${red.bold('❤️')}  ${magenta.bold('┃')}
${magenta.bold('┃')}   By Duro    ${magenta.bold('┃')}
${magenta.bold('┗━━━━━━━━━━━━━━┛')}
`);
  await sleep();
  return main();
}

export function quit() {
  console.log(cyan.bold('👋 See you soon!'));
  process.exit();
}

export async function boss() {
  await sleep(100);
  function health(current: number, max: number) {
    check();
    return `${green.bold(current)}/${red.bold(max)}`;
  }

  const healthAttributes: [string, number][] = [
    [green('(+10% Health)'), 1.10],
    [red('(-10% Health)'), 0.9],
  ];

  const attackAttributes: [string, number][] = [
    [green('(+10% Damage)'), 1.1],
    [red('(-10% Damage)'), 0.9],
  ];

  const multipliers: number[] = [
    Math.floor(Math.random() * healthAttributes.length),
    Math.floor(Math.random() * attackAttributes.length),
  ];

  let playerHealth: number = 100;
  const playerMaxHealth: number = 100;
  const playerAttack: number = 30;

  let bossHealth: number = Math.floor(150 * healthAttributes[multipliers[0]][1]);
  const bossMaxHealth: number = Math.floor(150 * healthAttributes[multipliers[0]][1]);
  const bossAttack: number = Math.floor(25 * attackAttributes[multipliers[1]][1]);

  function showStats() {
    process.stdin.resume();
    console.clear();
    console.log(`
${magenta.bold('Your Stats:')}  
${cyan.bold('❤️ Health:')} ${health(playerHealth, playerMaxHealth)}
${cyan.bold('🗡 Attack:')} ${yellow.bold(playerAttack)}

${magenta.bold('Ben\'s Stats:')}
${cyan.bold('❤️ Health:')} ${health(bossHealth, bossMaxHealth)} ${healthAttributes[multipliers[0]][0]}
${cyan.bold('🗡 Attack:')} ${yellow.bold(bossAttack)} ${attackAttributes[multipliers[1]][0]}
`);
  }
  function check() {
    if (bossHealth <= 0) {
      console.clear();
      console.log(green.bold('You Win! 🎉'));
      process.exit();
    }
    if (playerHealth <= 0) {
      console.clear();
      console.log(red.bold('You Lose! 😭'));
      process.exit(1);
    }
  }
  async function benAttack() {
    if (playerHealth >= 0) {
      console.log(red.bold('*Ben slashes you in the face*'));
      await sleep(2000);
      playerHealth -= bossAttack;
      return showStats();
    }
  }
  async function benHeal() {
    const amount = Math.floor(Math.random() * (bossMaxHealth / 2));
    bossHealth += amount;
    console.log(red.bold(`*Ben heals himself for ${amount} health*`));
    await sleep(2000);
  }
  async function benMove() {
    if (bossHealth <= bossMaxHealth / 2) {
      if (Math.floor(Math.random() * 2) === 1) {
        benHeal();
        await sleep(2000);
      }
    }
    benAttack();
    await sleep(2000);
  }
  async function attack() {
    bossHealth -= playerAttack;
    console.log(green.bold('*You punch Ben in the head!*'));
    benMove();
    await sleep(2000);
    showStats();
  }
  async function heal() {
    let amount = Math.floor(Math.random() * (playerMaxHealth / 2));
    playerHealth += amount;
    if (playerHealth > playerMaxHealth) {
      amount = -1;
      playerHealth = playerMaxHealth;
    }
    console.log(green.bold(amount === -1 ? green.bold(`*You heal ${amount} health!*`) : green.bold('*You are already at full health!*')));
    benMove();
    await sleep(2000);
    showStats();
  }

  showStats();
  console.log(`
${magenta.bold('Controls:')}
${cyan.bold('🗡 Attack:')} ${red.bold('F')}
${cyan.bold('❤️ Heal:')} ${red.bold('H')}
`);

  process.stdin.resume();
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (_str, key) => {
    if (key.ctrl && key.name === 'c') {
      return process.exit(1);
    }
    switch (key.name) {
      case 'f':
        check();
        attack();
        break;
      case 'h':
        check();
        heal();
        break;
      default:
        break;
    }
  });
}

export async function main() {
  console.log('\n'.repeat(100));
  await draw('ben.png', { width: 40, height: 40 });

  await prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [
      '[🥴] Burp',
      '[👈] Poke Ben',
      '[📞] Call Ben',
      '[🦶] Tickle Ben',
      '[✋] Talk to Ben',
      '[🥫] Feed Ben Beans',
      '[🍎] Give Apple Juice',
      '[🤬] Challenge Ben',
      '[💻] Credits',
      '[👋] Quit',
    ],
  }).then(async (answers: any) => {
    switch (answers.choice) {
      case '[👈] Poke Ben': {
        await poke();
        break;
      }
      case '[✋] Talk to Ben': {
        await talk();
        break;
      }
      case '[📞] Call Ben': {
        await call();
        break;
      }
      case '[🦶] Tickle Ben': {
        await tickle();
        break;
      }
      case '[🍎] Give Apple Juice': {
        await appleJuice();
        break;
      }
      case '[🥫] Feed Ben Beans': {
        await beans();
        break;
      }
      case '[🥴] Burp': {
        await burp();
        break;
      }
      case '[💻] Credits': {
        await credits();
        break;
      }
      case '[🤬] Challenge Ben': {
        await boss();
        break;
      }
      case '[👋] Quit': {
        quit();
        break;
      }
      default: {
        console.error(red.bold('*Ben is confused.*'));
        process.exit(1);
      }
    }
  });
}
