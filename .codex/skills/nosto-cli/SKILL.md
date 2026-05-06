---
name: nosto-cli
description: Use Nosto CLI for Nosto search-template workflows, including installing or checking `@nosto/nosto-cli`, logging in, creating `.nosto.json`, checking merchant status, pulling or pushing remote search templates, running `st build`, and using `st dev` for watch/build/upload loops. Use when Codex needs to operate or document `nosto` commands, Nosto merchant configuration, Nosto CLI environment variables, or Nosto search-template deployment behavior.
---

# Nosto CLI

## Overview

Use the Nosto CLI as the source of truth for search-template project synchronization with Nosto. Prefer checking local `nosto help` output when the command is installed, because CLI flags may move faster than this skill.

## First Checks

1. Confirm whether the CLI is available:

```bash
nosto help
```

2. If missing and the task requires running it, install or ask before installing:

```bash
npm i @nosto/nosto-cli -g
```

3. Use `nosto help`, `nosto setup`, or subcommand help for current options before giving exact flag advice.

## Authentication

Use browser login for normal interactive work:

```bash
nosto login
```

The command stores user credentials under `~/.nosto/.auth.json`. Do not print, copy, commit, or summarize secrets from that file. Use `nosto logout` when the user asks to clear stored credentials.

For automation or non-interactive environments, prefer a project or environment API key only when the user has provided one explicitly:

```bash
NOSTO_API_KEY=... nosto status
```

## Project Configuration

The recommended project configuration file is `.nosto.json` in the project root. It can contain sensitive merchant or API details, so keep it untracked. Environment variables take precedence over `.nosto.json`.

Common configuration keys:

- `merchant` / `NOSTO_MERCHANT`: required public merchant ID.
- `apiUrl` / `NOSTO_API_URL`: optional for production, required for staging or development targets.
- `apiKey` / `NOSTO_API_KEY`: optional private `API_APPS` token; when set, it is used instead of browser login credentials.

Known API URLs:

- Production: `https://api.nosto.com`
- Staging: `https://api.staging.nosto.com`
- Internal development: `https://my.dev.nos.to/api`

Use setup to print current configuration guidance and create a placeholder config when appropriate:

```bash
NOSTO_MERCHANT=merchant-id nosto setup
nosto setup /path/to/project
```

Recommended `.gitignore` entries:

```gitignore
build
.nosto.json
.nostocache
```

## Search-Template Commands

Use `nosto status [projectPath]` before pull, push, build, or dev actions when configuration or target merchant is uncertain.

Search-template commands are available under `st`, with `search-templates` as an alias:

```bash
nosto st pull [projectPath]
nosto st push [projectPath]
nosto st build [projectPath]
nosto st dev [projectPath]
```

Use `pull` to fetch the current remote state for the configured merchant. Treat it as potentially overwriting local files: inspect `git status` first and avoid running it when the worktree has uncommitted user changes unless the user explicitly accepts the risk.

Use `push` to upload local state to the configured merchant. Confirm the merchant/environment with `nosto status` and inspect the intended file changes first. If `nosto st push` reports no changes after `nosto st dev`, use `nosto st push -f` only when the user explicitly wants a forced upload.

Use `build` for local build verification. In modern search-template projects, it invokes `onBuild` from `nosto.config.ts`; in legacy projects, it mirrors the hosted VS Code Web build workflow.

Use `dev` for watch/build/upload loops. In modern projects, it invokes `onBuildWatch` from `nosto.config.ts`; in legacy projects, it watches with esbuild and uploads build artifacts rather than sources.

## File Selection Rules

Nosto CLI reads `.gitignore` when pushing files and skips matching files. It also implicitly skips files and folders whose names start with `.`, including `.nosto.json`.

The `/build` folder is special: it is never skipped during push, even when ignored by `.gitignore`, and it is always ignored during pull.

## Safety Rules

- Never commit `.nosto.json`, `.nostocache`, auth files, merchant secrets, or API keys.
- Never run `nosto st push` against an unknown merchant or environment; check status first.
- Never run `nosto st pull` over local uncommitted work without making the overwrite risk explicit.
- Prefer environment variables for one-off commands in CI or automation, but do not echo secret values.
- When documenting Nosto CLI behavior, cite the upstream repository or local `nosto help` output if precision matters.
