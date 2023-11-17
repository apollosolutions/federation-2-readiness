function hash() {
  return (Date.now() + Math.random().toString()).replaceAll('.', '');
}

/**
 * This code comes from the Studio-UI repo. We should talk with that team if we want a
 * sharable package
 *
 * https://github.com/mdg-private/studio-ui/blob/f4341fd691794e68901b5122403b038749d15a82/src/app/graph/explorerPage/resultsPane/queryPlan/queryPlanToMermaid.ts#L137
 * @param {import("@apollo/query-planner-1").PlanNode|import("@apollo/query-planner").PlanNode|import("@apollo/query-planner").SubscriptionNode} currentNode
 * @return {{nodeText: string, startHash: string, endHash: string}}
 */
function process(currentNode) {
  switch (currentNode.kind) {
    case 'Sequence': {
      const processedChildren = currentNode.nodes.map(process);
      return {
        // TODO: Remove non null assertion, added when turning on noUncheckedIndexedAccess
        startHash: processedChildren[0]?.startHash,
        // TODO: Remove non null assertion, added when turning on noUncheckedIndexedAccess
        endHash: processedChildren.slice(-1)[0]?.endHash,
        nodeText: processedChildren
          .map((processedChild, i) => {
            if (i === 0) return processedChild.nodeText;
            const link = `${processedChildren[i - 1]?.endHash} --> ${
              processedChild.startHash
            }`;
            return `
              ${link}
              ${processedChild.nodeText}
`;
          })
          .join(''),
      };
    }
    case 'Parallel': {
      const nodeHash = hash();
      const children = currentNode.nodes.map((childNode) => {
        const processedChild = process(childNode);
        return `
             ${nodeHash} --> ${processedChild.startHash}
             ${processedChild.nodeText}
`;
      });
      return {
        startHash: nodeHash,
        endHash: nodeHash,
        nodeText: `
          ${nodeHash}("Parallel")

          ${children.join('')}
        `,
      };
    }
    case 'Fetch': {
      // TODO (jason) get tooltips to work here, seems to not be creating the
      // node at all. Should create node with class .mermaidTooltip
      // const tooltip = currentNode.operation
      //   ? `${currentNodeHash}_operation["${print(
      //       parse(currentNode.operation),
      //     ).replaceAll('\n', '<br/>')}"] -...- ${currentNodeHash}`
      //   : 'click ${nodeHash} unDefinedCallback "TooltipContents"';
      const nodeHash = hash();
      return {
        startHash: nodeHash,
        endHash: nodeHash,
        nodeText: `${nodeHash}("Fetch (${currentNode.serviceName})")`,
      };
    }
    case 'Flatten': {
      const nodeHash = hash();
      const processedChild = process(currentNode.node);
      const nodePath = currentNode.path.join(',').replaceAll('@', '[]');

      return {
        startHash: processedChild.startHash,
        endHash: nodeHash,
        nodeText: `
          ${nodeHash}("Flatten (${nodePath})")

          ${processedChild.endHash} --> ${nodeHash}
          ${processedChild.nodeText}
`,
      };
    }
    case 'Condition': {
      const nodeHash = hash();
      return {
        startHash: nodeHash,
        endHash: nodeHash,
        nodeText: `${nodeHash}("Condition")`,
      };
    }
    case 'Defer': {
      const nodeHash = hash();
      return {
        startHash: nodeHash,
        endHash: nodeHash,
        nodeText: `${nodeHash}("Defer")`,
      };
    }
    case 'Subscription': {
      const nodeHash = hash();
      const processedPrimary = process(currentNode.primary);
      const processedRest = currentNode.rest ? process(currentNode.rest) : null;
      const restNodeText = processedRest
        ? `
          ${nodeHash} --> ("Rest ${processedRest.startHash}")
          ${processedRest.nodeText}
`
        : '';

      return {
        startHash: nodeHash,
        endHash: nodeHash,
        nodeText: `
          ${nodeHash}("Subscription")

          ${nodeHash} --> ("Primary ${processedPrimary.startHash}")
          ${processedPrimary.nodeText}
          ${restNodeText}
`,
      };
    }
    default:
      return currentNode;
  }
}

/**
 * @param {import("clipanion").BaseContext} context
 * @param {string} queryName
 * @param {import("@apollo/query-planner").QueryPlan|import("@apollo/query-planner-1").QueryPlan} queryPlan
 * @return {string}
 */
export function queryPlanToMermaid(context, queryName, queryPlan) {
  const queryPlanNode = queryPlan.node;
  if (!queryPlanNode) {
    context.stdout.write(
      `Invalid query plan for ${queryName}. Will not generate a visual diagram.\n`,
    );
    return '';
  }

  try {
    return `
    graph TD
      ${process(queryPlanNode).nodeText}
  `.trim();
  } catch (e) {
    context.stdout.write(
      `Error processing query plan for ${queryName}. Will not generate a visual diagram.\n`,
    );
    return '';
  }
}
