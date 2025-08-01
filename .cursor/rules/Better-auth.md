# integrations: NestJS Integration

URL: /docs/integrations/nestjs
Source: https://raw.githubusercontent.com/better-auth/better-auth/refs/heads/main/docs/content/docs/integrations/nestjs.mdx

Integrate Better Auth with NestJS.

---

title: NestJS Integration
description: Integrate Better Auth with NestJS.

---

This guide will show you how to integrate Better Auth with [NestJS](https://nestjs.com/).

Before you start, make sure you have a Better Auth instance configured. If you haven't done that yet, check out the [installation](/docs/installation).

<Callout type="info">
  The NestJS integration is **community maintained**. If you encounter any issues, please open them at [nestjs-better-auth](https://github.com/ThallesP/nestjs-better-auth).
</Callout>

## Installation

Install the NestJS integration library:

<Tabs items={}>
  <Tab value="npm">
    ```bash
    npm install @thallesp/nestjs-better-auth
    ```
  </Tab>

  <Tab value="pnpm">
    ```bash
    pnpm add @thallesp/nestjs-better-auth
    ```
  </Tab>

  <Tab value="yarn">
    ```bash
    yarn add @thallesp/nestjs-better-auth
    ```
  </Tab>

  <Tab value="bun">
    ```bash
    bun add @thallesp/nestjs-better-auth
    ```
  </Tab>
</Tabs>

## Basic Setup

<Callout type="warn">
  Currently, Better Auth's NestJS integration **only supports Express** and does not work with Fastify.
</Callout>

### 1. Disable Body Parser

Disable NestJS's built-in body parser to allow Better Auth to handle the raw request body:

```ts title="main.ts"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for Better Auth
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

### 2. Import AuthModule

Import the `AuthModule` in your root module:

```ts title="app.module.ts"
import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth'; // Your Better Auth instance

@Module({
  imports: [AuthModule.forRoot(auth)],
})
export class AppModule {}
```

### 3. Protect Routes

Use the `AuthGuard` to protect your routes:

```ts title="user.controller.ts"
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, Session, UserSession } from '@thallesp/nestjs-better-auth';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  @Get('me')
  async getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }
}
```

## Full Documentation

For comprehensive documentation including decorators, hooks, global guards, and advanced configuration, visit the [NestJS Better Auth repository](https://github.com/thallesp/nestjs-better-auth).
