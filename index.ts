/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import {
  cyan, green, magenta, red, yellow,
} from 'chalk';
import { draw } from 'terminal-img';
import { prompt } from 'inquirer';

console.clear();

const replies: string[] = [
  green.bold('Yes'),
  red.bold('No.'),
  magenta.bold('Hohoho'),
  yellow.bold('Bleugh'),
];

const sleep = (ms: number = 2000) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log('\n'.repeat(100));
  await draw('ben.png', { width: 40, height: 40 });

  await prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [
      '[1] Poke Ben',
      '[2] Talk to Ben',
      '[3] Call Ben',
      '[4] Tickle Feet',
      '[5] Apple Juice',
      '[6] Feed Ben Beans',
      '[7] Burp',
      '[8] Credits',
      '[9] Quit',
    ],
  }).then((answers: any) => {
    switch (answers.choice) {
      case '[1] Poke Ben': {
        poke();
        break;
      }
      case '[2] Talk to Ben': {
        talk();
        break;
      }
      case '[3] Call Ben': {
        call();
        break;
      }
      case '[4] Tickle Feet': {
        tickle();
        break;
      }
      case '[5] Apple Juice': {
        appleJuice();
        break;
      }
      case '[6] Feed Ben Beans': {
        beans();
        break;
      }
      case '[7] Burp': {
        burp();
        break;
      }
      case '[8] Credits': {
        credits();
        break;
      }
      case '[9] Quit': {
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

async function poke() {
  if (Math.floor(Math.random() * 20) !== 1) {
    console.log(red.bold('*Ben is disappointed.*'));
    await sleep();
    return main();
  }
  console.log(red.bold('*Ben is almost dead, you poked him too hard.*'));
  await sleep();
  return main();
}

async function talk() {
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

async function call() {
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

async function tickle() {
  console.log(`${green.bold('Ben:')} ${replies[2]}`);
  await sleep(3000);
  return main();
}

async function appleJuice() {
  console.log(`${green.bold('Ben:')} *Glug, glug, glug*`);
  console.log(`\n${green.bold('*Ben loved the apple juice!*')}`);
  await sleep();
  return main();
}

async function beans() {
  console.log(`${green.bold('Ben:')} *Glug, glug, glug*`);
  console.log(`\n${green.bold('*Ben chugs the beans!*')}`);
  await sleep();
  return main();
}

async function burp() {
  console.log(`${green.bold('Ben:')} ${green.bold('*Burp*')}`);
  await sleep();
  return main();
}

async function credits() {
  console.log(`
${magenta.bold('┏━━━━━━━━━━━━━━┓')}
${magenta.bold('┃')} Made with ${red.bold('❤️')}  ${magenta.bold('┃')}
${magenta.bold('┃')}   By Duro    ${magenta.bold('┃')}
${magenta.bold('┗━━━━━━━━━━━━━━┛')}
`);
  await sleep();
  return main();
}

async function quit() {
  console.log(cyan.bold('👋 See you soon!'));
  process.exit();
}

async function boss() {
  console.clear();
  await sleep(1000);
  console.log(`${yellow.bold('You:')} ${cyan('Do you believe in god?')}`);
  console.log(`${green.bold('Ben:')} ${replies[2]}`);

  await sleep(2000);
  console.clear();
  console.log(`${green.bold('You:')} ${cyan('Do you believe in god.....?')}`);
  console.log(`${red.bold('Ben:')} ${replies[1]}`);
}

main();
