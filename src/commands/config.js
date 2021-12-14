import { Command, Option } from 'clipanion';
import { getConfig } from '../config/index.js';
import { getClient } from '../studio/index.js';
import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';
import { dump } from 'js-yaml';

export default class ConfigCommand extends Command {
  static paths = [['config', 'init']];

  static usage = Command.Usage({
    category: 'Config',
    description: 'Generate a supergraph config from a graph in Apollo Studio.',
    details: `
      Generates a supergraph config from a graph in Apollo Studio. If the
      \`--graphref\` option is left off, it will prompt you to select the graph
      and variant from the available data in Studio.
    `,
    examples: [
      ['Output to stdout', '$0'],
      ['Output to a file', '$0 --out supergraph.yaml'],
      ['Specify the graphref', '$0 --graphref mygraph@current'],
    ],
  });

  accountId = Option.String('--account', { required: false });

  graphRef = Option.String('--graphref', { required: false });

  key = Option.String('--key', { required: false });

  out = Option.String('--out', { required: false });

  async execute() {
    const client = await getClient(this.key, {
      useSudo: this.accountId != null,
    });

    const config = await getConfig(
      client,
      undefined,
      this.graphRef,
      this.accountId,
    );

    const yaml = dump(config);

    if (this.out) {
      await mkdir(dirname(this.out), { recursive: true });
      await writeFile(this.out, yaml, 'utf-8');
    } else {
      this.context.stdout.write(yaml);
      this.context.stdout.write('\n');
    }
  }
}
