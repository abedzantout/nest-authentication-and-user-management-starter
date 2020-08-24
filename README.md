<p align="left">
  <a href="https://techhive.io/" target="blank"><img src="https://www.techhive.io/static/brand/logo-masterclass.svg" width="250" alt="Nest Logo" /></a>
</p>


# Nest Authentication and User Management Starter
![CodeQL](https://github.com/techhiveIO/nest-authentication-and-user-management-starter/workflows/CodeQL/badge.svg?branch=master)


by [@techhive.IO](https://www.techhive.io/)


## Description

[Nest Js Authentication and User Management Starter](https://github.com/techhiveIO/nest-authentication-and-user-management-starter)
is a starter pack for seamlessly kick-starting your API development with the industry's
and TechHive.IO's best practices and recommendations.

## Table of Content

- [Live Demo](https://techhive.io)
- [Getting Started](#setting-started)
- [Useful Commands](#useful-commands)
- [Goals](#goals)
- [Features](#features)
- [Learning Materials](#learning-materials)
- [Bugs](#bugs)
- [Contributors](#contributors)
- [License](#license)

## Getting Started

```bash
git clone --depth 1 https://github.com/techhiveIO/nest-authentication-and-user-management-starter
cd my-project
rm -r .git
cp .env.example .env
npm run dev
```

Make sure you enter the correct values in your `.env` file:

```
MONGODB_CONNECTION_STRING=<your mongodb uri>
MONGODB_CONNECTION_TEST_STRING=<test mongo uri>
NODEMAILER_EMAIL=<your email>
NODEMAILER_PASSWORD=<your email password/auth key>
HOST=<host> # defaults to http://localhost:3000/
PORT=<port> # defaults to 3000
JWT_KEY=<your secret key> # defaults to secretKey

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Useful Commands

- `start:dev` - start application in development mode
- `start:debug` - start application in development and debug mode
- `format` - runs prettier to format whole code base (`.ts` and `.css`)
- `lint` - lints project using eslint,
- `start` - Run Nest application
- `build` - Build application
- `start:prod` - Start application in production

## Goals

Developers often want a good starting point when implementing a new API.
Common tasks such as authentication and user management are re-implemented on a regualar
basis.
With this starter kit, the developer directly bootstrap the development of their new API,
or use it as a inspiration to build any powerful API server using Nest Js.

## Features

- JWT authentication with email verification out of the box
- Powerful Nest API out of the box
- Built-in powerful authentication and user management APIs
- User invitation
- MongoDB and Mongoose Integration
- Optimized for speed and scalability
- Postman file included for easy testing
- HMR integration
- Security integration out of the box

## Stack

- [Nest Js 7+](https://www.nestjs.com)
- Typescript
- Node JS
- MongoDB and [Mongoose](https://mongoosejs.com/)
- [Nodemailer](https://nodemailer.com/about/)

# Security
The project implements some of nodejs [security techniques](https://docs.nestjs.com/techniques/security) :
- [Helmet](https://github.com/helmetjs/helmet) : can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
- [Express Rate Limit](https://github.com/nfriedly/express-rate-limit): to protect your applications from brute-force attacks
  - In the main.ts you can set a limit of requests in a time window (default is 100 requests in 15 minutes for all endpoints, and 3 requests in a 1 hour for sign up endpoint)
  
## Learning Materials

## Bugs

Please make sure you fill in the appropriate fields when submitting an issue. Our team will
try to resolve it as soon as possible.

## Contributors

Want to start contributing to open source with the Nest Authentication and User Management Starter ?

Leave your mark and join the growing team of contributors!

Get started by checking out list of [open issues](https://github.com/techhiveIO/nest-authentication-and-user-management-starter/issues)
and reading [Contributor Guide](https://github.com/techhiveIO/nest-authentication-and-user-management-starter/blob/master/CONTRIBUTING.md)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/abedzantout"><img src="https://avatars3.githubusercontent.com/u/4046627?v=4" width="100px;" alt="Abdul Rahman Zantout"/><br /><sub><b>Abdul Rahman Zantout</b></sub></a><br /><a href="https://github.com/tomastrajan/angular-ngrx-material-starter/commits?author=abedzantout" title="Code">💻</a> <a href="https://github.com/tomastrajan/angular-ngrx-material-starter/commits?author=abedzantout" title="Documentation">📖</a> <a href="https://github.com/tomastrajan/angular-ngrx-material-starter/commits?author=abedzantout" title="Tests">⚠️</a> <a href="#design-abedzantout" title="Design">🎨</a> <a href="#blog-abedzantout" title="Blogposts">📝</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

Nest Js Authentication and User Management Starter Kit is © 2020 TechHive.IO LLC . It is distributed under the [Creative Commons
Attribution License](http://creativecommons.org/licenses/by/4.0/).

The names and logos for TechHive.IO LLC are trademarks of TechHive.IO LLC.
