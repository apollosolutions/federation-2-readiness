#!/usr/bin/env node
import { Builtins, Cli } from 'clipanion';

import {
  AuditCommand,
  ConfigCommand,
  ExtractSubgraphCommand,
} from '../src/index.js';

const [_, __, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: 'Federation 2 Readiness',
  binaryName: 'npx github:@apollosolutions/federation-2-readiness',
  binaryVersion: '1.0.0',
});

cli.register(AuditCommand);
cli.register(ConfigCommand);
cli.register(ExtractSubgraphCommand);
cli.register(Builtins.HelpCommand);
cli.runExit(args);
