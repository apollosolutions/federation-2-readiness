import inquirer from 'inquirer';
import autocomplete from 'inquirer-autocomplete-prompt';

inquirer.registerPrompt('autocomplete', autocomplete);

export { default as AuditCommand } from './commands/audit.js';
export { default as ConfigCommand } from './commands/config.js';
export { default as ExtractSubgraphCommand } from './commands/extract-subgraph.js';
