import { cyan, green, magenta, red, yellow } from 'chalk';
import { draw } from 'terminal-img';
import { prompt } from 'inquirer';

console.clear();

const replies = [green.bold('Yes'), red.bold('No.'), magenta.bold('Hohoho'), yellow.bold('Bleugh')];
main();

const sleep = (ms: number = 2000) => new Promise(r => setTimeout(r, ms));

async function main() {

    console.log('\n'.repeat(100));
    await draw('ben.png', { width: 40, height: 40 });

    await prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['Poke Ben', 'Talk to Ben', 'Call Ben', 'Tickle Feet', 'Apple Juice', 'Feed Ben Beans', 'Burp', 'Credits', 'Quit']
    }).then(answers => {
        switch (answers.choice) {
            case 'Poke Ben': {
                poke();
                break;
            }
            case 'Talk to Ben': {
                talk();
                break;
            }
            case 'Call Ben': {
                call();
                break;
            }
            case 'Tickle Feet': {
                tickle();
                break;
            }
            case 'Apple Juice': {
                appleJuice();
                break;
            }
            case 'Feed Ben Beans': {
                beans();
                break;
            }
            case 'Burp': {
                burp();
                break;
            }
            case 'Credits': {
                credits();
                break;
            }
            case 'Quit': {
                quit();
                break;
            }
        }
    });
}

async function poke() {
    if (~~(Math.random() * 20) !== 1) {
        console.log(red.bold('*Ben is disappointed.*'));
        await sleep();
        return main();
    }
    console.log(red.bold('*Ben is almost dead, you poked him too hard.*'));
    await sleep();
    main();
}

async function talk() {
    await await prompt({
        type: 'input',
        name: 'talking',
        message: 'Ben is listening...',
        validate(value) {
            const valid = value.length > 0;
            return valid || `Ben has nothing to repeat. Please enter something.`;
        }
    }).then(answers => console.log(`${green.bold('Ben:')} ${answers.talking}`));
    await sleep();
    main();
}

async function call() {
    let calling = true;
    await prompt({
        type: 'input',
        name: 'talking',
        message: 'Question for Ben:',
        validate(value) {
            const valid = value.length > 0;
            return valid || `Ben has nothing to answer. Please enter something.`;
        }
    }).then(async answers => {
        if (~~(Math.random() * 14) === 0) calling = false;
        if (calling && answers.talking.toLowerCase() !== 'hang up') {
            console.log(`${green.bold('Ben:')} ${replies[~~(Math.random() * replies.length)]}\n`);
            return call();
        }
        if (!calling) {
            console.log(red.bold('*Ben slams the phone down.*'));
            await sleep();
            main();
        }
        if (answers.talking.toLowerCase() === 'hang up') {
            console.log(magenta.bold('*Newspaper sounds.*'));
            await sleep();
            main();
        }
    });
    await sleep(4000);
    main();
}

async function tickle() {
    console.log(`${green.bold('Ben:')} ${magenta.bold('Hohoho')}`);
    await sleep(3000);
    main();
}

async function appleJuice() {
    console.log(`${green.bold('Ben:')} *Glug, glug, glug*`);
    console.log(`\n${green.bold('*Ben loved the apple juice!*')}`);
    await sleep();
    main();
}

async function beans() {
    console.log(`${green.bold('Ben:')} *Glug, glug, glug*`);
    console.log(`\n${green.bold('*Ben chugs the beans!*')}`);
    await sleep();
    main();
}

async function burp() {
    console.log(`${green.bold('Ben:')} ${green.bold('*Burp*')}`);
    await sleep();
    main();
}

async function credits() {
    console.log(`
${magenta.bold('┏━━━━━━━━━━━━━━┓')}
${magenta.bold('┃')} Made with ${red.bold('')}  ${magenta.bold('┃')}
${magenta.bold('┃')}   By Duro    ${magenta.bold('┃')}
${magenta.bold('┗━━━━━━━━━━━━━━┛')}
`);
    await sleep();
    main();
}

async function quit() {
    console.log(cyan.bold('👋 See you soon!'));
    process.exit();
}